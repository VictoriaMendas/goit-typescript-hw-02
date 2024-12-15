import axios from "axios";

const API_KEY = "szbM16EAhzO0kLss1Ju44HsQ0Yt_BmVLCl__F_lHpCg";

axios.defaults.baseURL = "https://api.unsplash.com";
axios.defaults.params = {
  client_id: API_KEY,
};
export interface Image {
  urls: {
    regular: string;
    small: string;
  };
  id: string;
  alt_description: string;
}
interface ResponseData {
  total: number;
  total_pages: number;
  results: Image[];
}

export const fetchImages = async (
  query: string,
  page: number
): Promise<ResponseData> => {
  const response = await axios.get<ResponseData>("/search/photos", {
    params: { query: query, page, per_page: 12, orientation: "landscape" },
  });

  return response.data;
};
