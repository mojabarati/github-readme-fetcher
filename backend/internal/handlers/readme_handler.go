package handlers

import (
	"encoding/json"
	"net/http"
	"regexp"

    "github.com/yourusername/github-readme-fetcher/internal/crawler"
    "github.com/yourusername/github-readme-fetcher/internal/models"
)

func ReadmeHandler(w http.ResponseWriter, r *http.Request) {
	var requestBody struct {
		URL string `json:"url"`
	}

	if err := json.NewDecoder(r.Body).Decode(&requestBody); err != nil {
		writeJSONError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if !isValidGitHubURL(requestBody.URL) {
		writeJSONError(w, "Invalid GitHub repository URL", http.StatusBadRequest)
		return
	}

	content, err := crawler.FetchReadmeFromGitHub(requestBody.URL)
	if err != nil {
		writeJSONError(w, err.Error(), http.StatusNotFound)
		return
	}

	response := models.Readme{Content: content}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func writeJSONError(w http.ResponseWriter, message string, status int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(map[string]string{"message": message})
}

func isValidGitHubURL(url string) bool {
	re := regexp.MustCompile(`^(https?://)?(www\.)?(github\.com)/([^/]+)/([^/]+)$`)
	return re.MatchString(url)
}