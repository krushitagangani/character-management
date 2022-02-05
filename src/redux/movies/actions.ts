import { MoviesActionTypes } from "./types";

// common success
export const moviesApiResponseSuccess = (actionType: string, data: any) => ({
  type: MoviesActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});

// common error
export const moviesApiResponseError = (actionType: string, error: string) => ({
  type: MoviesActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getCharacters = (word: string) => ({
  type: MoviesActionTypes.GET_CHARACTERS,
  payload: word,
});

export const getFilms = (Ids: Array<string | number>) => ({
  type: MoviesActionTypes.GET_FILMS,
  payload: Ids,
});
