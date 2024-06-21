const API_URL = process.env.API_URL_GENRES;
const API_TOKEN = process.env.API_TOKEN;

export const fetchGenres = async () => {
  try {
    const response = await fetch(`${API_URL}?language=pt-BR`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};
