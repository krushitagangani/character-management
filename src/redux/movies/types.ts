import { Film, FilmCharacter } from "../../types";

export enum MoviesActionTypes {
  API_RESPONSE_SUCCESS = "@@movies/API_RESPONSE_SUCCESS",
  API_RESPONSE_ERROR = "@@movies/API_RESPONSE_ERROR",

  GET_CHARACTERS = "@@movies/GET_CHARACTERS",
  GET_FILMS = "@@movies/GET_FILMS",
}

export interface MoviesState {
  charactersList: Array<FilmCharacter>;
  films: Array<Film>;
  charactersLoading?: boolean;
  filmsLoading?: boolean;
}
