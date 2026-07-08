package crawler

import (
    "errors"
    "fmt"
    "io"
    "net/http"
    "net/url"
    "strings"
)

var errReadmeNotFound = errors.New("README not found")

// FetchReadmeFromGitHub fetches the README file content from a given GitHub repository URL.
func FetchReadmeFromGitHub(repoURL string) (string, error) {
    owner, repo, err := extractOwnerAndRepo(repoURL)
    if err != nil {
        return "", err
    }

    for _, branch := range []string{"main", "master"} {
        content, err := fetchContent(constructReadmeURL(owner, repo, branch))
        if err == nil {
            return content, nil
        }
        if !errors.Is(err, errReadmeNotFound) {
            return "", err
        }
    }

    return fetchReadmeViaGitHubAPI(owner, repo)
}

func parseGitHubURL(repoURL string) (*url.URL, error) {
    repoURL = strings.TrimSpace(repoURL)
    if repoURL == "" {
        return nil, errors.New("invalid GitHub repository URL")
    }

    if !strings.HasPrefix(repoURL, "http://") && !strings.HasPrefix(repoURL, "https://") {
        repoURL = "https://" + repoURL
    }

    return url.Parse(repoURL)
}

// extractOwnerAndRepo extracts the owner and repository name from the GitHub URL.
func extractOwnerAndRepo(repoURL string) (string, string, error) {
    parsedURL, err := parseGitHubURL(repoURL)
    if err != nil {
        return "", "", errors.New("could not parse GitHub URL")
    }

    if parsedURL.Host != "github.com" {
        return "", "", errors.New("invalid GitHub repository host")
    }

    parts := strings.Split(strings.Trim(parsedURL.Path, "/"), "/")
    if len(parts) < 2 {
        return "", "", errors.New("could not extract owner and repository from URL")
    }

    return parts[0], parts[1], nil
}

// constructReadmeURL constructs the raw README file URL for the given owner, repository, and branch.
func constructReadmeURL(owner, repo, branch string) string {
    return fmt.Sprintf("https://raw.githubusercontent.com/%s/%s/%s/README.md", owner, repo, branch)
}

// fetchContent fetches the content from the given URL.
func fetchContent(url string) (string, error) {
    resp, err := http.Get(url)
    if err != nil {
        return "", err
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        if resp.StatusCode == http.StatusNotFound {
            return "", errReadmeNotFound
        }
        return "", fmt.Errorf("failed to fetch README file: %s", resp.Status)
    }

    body, err := io.ReadAll(resp.Body)
    if err != nil {
        return "", err
    }

    return string(body), nil
}

func fetchReadmeViaGitHubAPI(owner, repo string) (string, error) {
    url := fmt.Sprintf("https://api.github.com/repos/%s/%s/readme", owner, repo)
    req, err := http.NewRequest(http.MethodGet, url, nil)
    if err != nil {
        return "", err
    }
    req.Header.Set("Accept", "application/vnd.github.v3.raw")
    req.Header.Set("User-Agent", "github-readme-fetcher")

    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        return "", err
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        if resp.StatusCode == http.StatusNotFound {
            return "", errReadmeNotFound
        }
        return "", fmt.Errorf("failed to fetch README file: %s", resp.Status)
    }

    body, err := io.ReadAll(resp.Body)
    if err != nil {
        return "", err
    }

    return string(body), nil
}
