const API_URL = process.env.API_URL_PEOPLE;
const API_TOKEN = process.env.API_TOKEN;

export const fetchPeople = async () => {
  try {
    const url = `${API_URL}?language=pt-BR`;
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
    return data;
  } catch (error) {
    console.error("Error fetching people:", error);
    throw error;
  }
};
