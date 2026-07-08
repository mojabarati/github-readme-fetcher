# GitHub README Fetcher Backend

This project is a simple full-stack application that allows users to fetch the README file content from a specified GitHub repository. The application consists of a Go backend and a React frontend.

## Backend Setup

1. **Install Go**: Ensure you have Go installed on your machine. You can download it from [golang.org](https://golang.org/dl/).

2. **Clone the Repository**: Clone this repository to your local machine.

   ```bash
   git clone https://github.com/yourusername/github-readme-fetcher.git
   cd github-readme-fetcher/backend
   ```

3. **Install Dependencies**: Navigate to the backend directory and run the following command to initialize the Go module and install any dependencies.

   ```bash
   go mod tidy
   ```

4. **Run the Server**: Start the Go HTTP server by running:

   ```bash
   go run cmd/server/main.go
   ```

   The server will start on port **8080**.

## API Endpoint

- **POST /api/readme**: This endpoint accepts a JSON body containing a GitHub repository URL and returns the content of the README file.

### Request Body Example

```json
{
  "url": "https://github.com/owner/repository"
}
```

### Response Body Example

```json
{
  "content": "# Project Title\n\nREADME content here..."
}
```

## CORS Support

The backend is configured to allow CORS requests from the frontend, enabling seamless communication between the two.

## Error Handling

The backend provides useful HTTP status codes and JSON error responses for various scenarios, including:

- Invalid URL format
- Repository not found
- README file not found

## Frontend Communication

The frontend will communicate with the backend at the following URL:

```
http://localhost:8080/api/readme
```

Make sure the backend is running before starting the frontend application.

## Conclusion

This backend is designed to be clean, scalable, and easy to maintain. The crawler logic is isolated in a separate package, allowing for easy extraction and reuse in other projects.