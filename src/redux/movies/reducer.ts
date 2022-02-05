// types
import { MoviesActionTypes, MoviesState } from "./types";

export const INIT_STATE: MoviesState = {
  charactersList: [],
  films: [],
  charactersLoading: false,
  filmsLoading: false,
};

const Movies = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case MoviesActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case MoviesActionTypes.GET_CHARACTERS:
          return {
            ...state,
            charactersList: action.payload.data,
            isCharactersListFetched: true,
            charactersLoading: false,
          };
        case MoviesActionTypes.GET_FILMS:
          return {
            ...state,
            films: action.payload.data,
            isFilmsFetched: true,
            filmsLoading: false,
          };
        default:
          return { ...state };
      }

    case MoviesActionTypes.API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case MoviesActionTypes.GET_CHARACTERS:
          return {
            ...state,
            isCharactersListFetched: false,
            charactersLoading: false,
          };
        case MoviesActionTypes.GET_FILMS:
          return {
            ...state,
            isFilmsFetched: false,
            filmsLoading: false,
          };
        default:
          return { ...state };
      }

    case MoviesActionTypes.GET_CHARACTERS: {
      return {
        ...state,
        charactersLoading: true,
        isCharactersListFetched: false,
      };
    }
    case MoviesActionTypes.GET_FILMS:
      return {
        ...state,
        isFilmsFetched: true,
        filmsLoading: true,
      };
    default:
      return { ...state };
  }
};

export default Movies;
