package main

import (
	"log"
	"net/http"

	handlerspkg "github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/yourusername/github-readme-fetcher/internal/handlers"
)

func main() {
	r := mux.NewRouter()

	// Define the API endpoint
	r.HandleFunc("/api/readme", handlers.ReadmeHandler).Methods("POST")

	// Enable CORS for API requests
	corsHandler := handlerspkg.CORS(
		handlerspkg.AllowedOrigins([]string{"*"}),
		handlerspkg.AllowedMethods([]string{"POST", "OPTIONS"}),
		handlerspkg.AllowedHeaders([]string{"Content-Type"}),
	)(r)

	// Start the server
	port := "8080"
	log.Printf("Server is running on http://localhost:%s\n", port)
	if err := http.ListenAndServe(":"+port, corsHandler); err != nil {
		log.Fatalf("Could not start server: %s\n", err)
	}
}