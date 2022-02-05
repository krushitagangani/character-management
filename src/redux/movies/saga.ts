import { takeEvery, fork, put, all, call } from "redux-saga/effects";

// Login Redux States
import { FilmCharacter } from "../../types";
import { MoviesActionTypes } from "./types";
import { moviesApiResponseSuccess, moviesApiResponseError } from "./actions";

import {
  getCharacters as getCharactersApi,
  getFilms as getFilmsApi,
} from "../../api/index";

function* getCharacters() {
  try {
    let allCharacters: Array<FilmCharacter> = [];
    let fetchNext = true;
    let page = 1;
    do {
      const response: {
        results: Array<FilmCharacter>;
        next?: string;
        previous?: string;
      } = yield call(getCharactersApi, {
        page: page,
      });
      allCharacters = [...allCharacters, ...(response.results ?? [])];
      page++;
      fetchNext = response.next !== null;
    } while (fetchNext);

    yield put(
      moviesApiResponseSuccess(MoviesActionTypes.GET_CHARACTERS, allCharacters)
    );
  } catch (error: any) {
    yield put(moviesApiResponseError(MoviesActionTypes.GET_CHARACTERS, error));
  }
}

function* getFilms({ payload: urls }: any) {
  try {
    // ideally the backend should return the film id also. As we set the base url in the axios,
    // we can not pass the whole api url to the axios, so we are extracting the Id from the given films
    // url and pass those Ids to the redux-saga to get the films data
    const ids = urls.map((url: string) => url.split("films/")[1]);
    const response: Promise<any> = yield call(getFilmsApi, ids);
    yield put(moviesApiResponseSuccess(MoviesActionTypes.GET_FILMS, response));
  } catch (error: any) {
    yield put(moviesApiResponseError(MoviesActionTypes.GET_FILMS, error));
  }
}

export function* watchGetCharacters() {
  yield takeEvery(MoviesActionTypes.GET_CHARACTERS, getCharacters);
}

export function* watchGetFilms() {
  yield takeEvery(MoviesActionTypes.GET_FILMS, getFilms);
}

function* moviesSaga() {
  yield all([fork(watchGetCharacters), fork(watchGetFilms)]);
}

export default moviesSaga;
