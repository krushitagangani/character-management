// types
import { MoviesActionTypes, MoviesState } from "./types";

export const INIT_STATE: MoviesState = {
  charactersList: [],
  films: [],
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
            getCharactersListLoading: false,
          };
        case MoviesActionTypes.GET_FILMS:
          return {
            ...state,
            films: action.payload.data,
            isFilmsFetched: true,
            getFilmsLoading: false,
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
            getCharactersListLoading: false,
          };
        case MoviesActionTypes.GET_FILMS:
          return {
            ...state,
            isFilmsFetched: false,
            getFilmsLoading: false,
          };
        default:
          return { ...state };
      }

    case MoviesActionTypes.GET_CHARACTERS: {
      return {
        ...state,
        getCharactersListLoading: true,
        isCharactersListFetched: false,
      };
    }
    case MoviesActionTypes.GET_FILMS:
      return {
        ...state,
        isFilmsFetched: true,
        getFilmsLoading: true,
      };
    default:
      return { ...state };
  }
};

export default Movies;
