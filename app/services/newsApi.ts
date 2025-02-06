import axios from 'axios';

const API_KEY = '183daca270264bad86fc5b72972fb82a';
const BASE_URL = 'https://newsapi.org/v2/everything';

export const fetchNews = async (query: string): Promise<any[]> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: query,
        apiKey: API_KEY,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};
