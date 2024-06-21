const API_URL = process.env.API_URL_MOVIES;
const API_TOKEN = process.env.API_TOKEN;

export const fetchMovies = async (page = 1, genres: number[] = []) => {
  const genreQuery =
    genres.length > 0 ? `&with_genres=${genres.join(",")}` : "";
  const url = `${API_URL}?language=pt-BR&page=${page}${genreQuery}`;

  try {
    const response = await fetch(url, {
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
    return data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};
