import { takeEvery, fork, put, all, call } from "redux-saga/effects";

// Login Redux States
import { MoviesActionTypes } from "./types";
import { moviesApiResponseSuccess, moviesApiResponseError } from "./actions";

import {
  getCharacters as getCharactersApi,
  getFilms as getFilmsApi,
} from "../../api/index";

function* getCharacters({ payload: word }: any) {
  try {
    let page = 1;
    let characters: Array<object> = [];
    let lastRecord: any = [];
    do {
      const response: Promise<any> = yield call(getCharactersApi, word, {
        page: page,
      });
      const data: any = response;
      lastRecord = data;
      data.results.forEach((character: object) => {
        characters.push(character);
      });
      page++;
    } while (lastRecord.next !== null);
    yield put(
      moviesApiResponseSuccess(MoviesActionTypes.GET_CHARACTERS, characters)
    );
  } catch (error: any) {
    yield put(moviesApiResponseError(MoviesActionTypes.GET_CHARACTERS, error));
  }
}

function* getFilms({ payload: Ids }: any) {
  try {
    const response: Promise<any> = yield call(getFilmsApi, Ids);
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
