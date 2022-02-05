import { APIClient } from "./apiCore";

const api = new APIClient();

const getCharacters = (filters?: {}) => {
  return api.get(`/people`, filters);
};

const getFilms = (Ids: Array<string | number>) => {
  let urls: Array<string> = [];
  for (let i = 0; i < Ids.length; i++) {
    urls.push(`/films/${Ids[i]}`);
  }
  return api.getMultiple(urls);
};

export { getCharacters, getFilms };
