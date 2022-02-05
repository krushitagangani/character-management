import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

// hooks
import { useRedux } from "../../hooks/index";

// actions
import { getCharacters, getFilms } from "../../redux/actions";

// components
import Loader from "../../components/Loader";
import MoviesList from "./MoviesList";
import { CharacterSelect, CharacterSelectOption } from "./CharacterSelect";
import MovieDetails from "./MovieDetails";
import { Film } from "../../types";

const Index = () => {
  // global store
  const { dispatch, useAppSelector } = useRedux();

  const { charactersList, charactersLoading, films, filmsLoading } =
    useAppSelector(state => ({
      charactersList: state.Movies.charactersList,
      charactersLoading: state.Movies.charactersLoading,

      films: state.Movies.films,
      filmsLoading: state.Movies.filmsLoading,
    }));

  /*
  character
  */
  const [characterOpts, setCharacterOpts] = useState<
    Array<CharacterSelectOption>
  >([]);

  const onChangeCharacter = (
    value: CharacterSelectOption | null | undefined
  ) => {
    if (value) {
      dispatch(getFilms(value.films ?? []));
    }
  };

  /*
  get the characters list
  */
  useEffect(() => {
    dispatch(getCharacters());
  }, [dispatch]);

  useEffect(() => {
    const opts: Array<CharacterSelectOption> = (charactersList || []).map(
      (character: any, index: number) => {
        return {
          ...character,
          value: index,
          label: character.name,
        };
      }
    );
    setCharacterOpts(opts);
  }, [charactersList]);

  /*
  movies list &  lastYear
  */
  const [movies, setMovies] = useState<Array<Film>>([]);
  const [lastYearMovie, setLastYearMovie] = useState<Film | undefined>();
  useEffect(() => {
    setMovies(films);

    /*
    get the last year of the character has been in a movie.
    */
    const movieInDesc = films.sort((a: any, b: any) => {
      const bDate: any = new Date(b["release_date"]);
      const aDate: any = new Date(a["release_date"]);
      return bDate - aDate;
    });
    if (movieInDesc.length) {
      setLastYearMovie(movieInDesc[0]);
    }
  }, [films]);

  return (
    <div className="p-5">
      <Row className="justify-content-center">
        <Col lg={6} xs={12}>
          {(charactersLoading || filmsLoading) && <Loader />}
          <div className="mb-5">
            <CharacterSelect
              options={characterOpts}
              onChangeCharacter={onChangeCharacter}
            />
          </div>

          {/* list of movies */}
          <div className="mb-5">
            <MoviesList movies={movies} />
          </div>

          {/* movie details */}
          <div className="mb-5">
            <MovieDetails lastYearMovie={lastYearMovie} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
