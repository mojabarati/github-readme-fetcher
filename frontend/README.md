# Frontend README

# GitHub README Fetcher - Frontend

This is the frontend part of the GitHub README Fetcher application built with React. It allows users to enter a GitHub repository URL and fetch the README file content.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Running the Application

To start the React application, run the following command:

```bash
npm run dev
```

This will start the development server on [http://localhost:5173](http://localhost:5173).

### API Endpoint

The frontend communicates with the backend API running on [http://localhost:8080/api/readme](http://localhost:8080/api/readme) to fetch the README content.

### Usage

1. Open your browser and go to [http://localhost:5173](http://localhost:5173).
2. Enter a valid GitHub repository URL in the input field.
3. Click the "Fetch README" button to retrieve the README content.
4. The fetched content will be displayed in the textarea below, preserving the raw Markdown formatting.

### Error Handling

The application will display clear error messages for the following scenarios:

- Invalid URL format
- Repository does not exist
- README.md or readme.md file cannot be found

## Project Structure

The frontend project structure is as follows:

```
frontend/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── components/
    │   └── ReadmeFetcher.jsx
    └── services/
        └── api.js
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.