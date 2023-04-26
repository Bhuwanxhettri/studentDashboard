import api from "./axios";

export const fetcher = async (url) => {
  const response = await api.get(url);
  const data = await response.data;
  return data;
};
