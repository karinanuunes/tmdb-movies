const API_URL = "https://api.themoviedb.org/3/movie/popular?language=pt-BR";
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTJkOWNiNGU4OTE4NTA1ODM5NTk4OTNiOGMyZDdiNCIsInN1YiI6IjY2NjFjMzQ3OTAyNjQ3ODNhZDA3ODE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FYXORp3xT7CwOcpJ8CCKOM4wWsEf8N3BszO4pItdp0s",
  },
};

export const fetchMovies = async (page = 1, genres: number[] = []) => {
  const genreQuery =
    genres.length > 0 ? `&with_genres=${genres.join(",")}` : "";
  const url = `${API_URL}?language=pt-BR&page=${page}${genreQuery}`;

  try {
    const response = await fetch(url, API_OPTIONS);
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
