# GitHub README Fetcher

This project is a full-stack application that allows users to fetch and display the README file content from any public GitHub repository. The application consists of a Go backend and a React frontend.

## Project Structure

```
github-readme-fetcher/
├── backend/
│   ├── cmd/
│   │   └── server/
│   │       └── main.go
│   ├── internal/
│   │   ├── crawler/
│   │   │   └── github_readme_crawler.go
│   │   ├── handlers/
│   │   │   └── readme_handler.go
│   │   └── models/
│   │       └── readme.go
│   ├── go.mod
│   └── README.md
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   └── ReadmeFetcher.jsx
│   │   └── services/
│   │       └── api.js
│   └── README.md
└── README.md
```

## Getting Started

### Prerequisites

- Go (version 1.16 or higher)
- Node.js (version 14 or higher)
- npm (Node package manager)

### Running the Backend

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   go mod tidy
   ```

3. Run the Go server:
   ```
   go run cmd/server/main.go
   ```

   The backend will start on port **8080**.

### Running the Frontend

1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React application:
   ```
   npm run dev
   ```

   The frontend will start on port **5173**.

### API Endpoint

The frontend communicates with the backend at the following endpoint:
```
http://localhost:8080/api/readme
```

### Usage

1. Open your browser and navigate to `http://localhost:5173`.
2. Enter a valid GitHub repository URL (e.g., `https://github.com/facebook/react`).
3. Click the "Fetch README" button.
4. The README content will be displayed in a textarea, preserving the raw Markdown formatting.

### Error Handling

The application provides clear error messages for the following scenarios:
- Invalid GitHub URL
- Repository does not exist
- README.md or readme.md file cannot be found

## License

This project is licensed under the MIT License. See the LICENSE file for more details.