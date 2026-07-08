const API_URL = "/api/readme";

export const fetchReadme = async (repoURL) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: repoURL }),
  });

  if (!response.ok) {
    let errorMessage = "Failed to fetch README";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (parseError) {
      const text = await response.text();
      errorMessage = text || errorMessage;
    }
    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data.content;
};
