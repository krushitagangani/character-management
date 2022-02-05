import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

// hooks
import { useRedux } from "../../hooks/index";

// actions
import { getCharacters, getFilms } from "../../redux/actions";

// components
import MoviesList from "./MoviesList";
import CharacterSelect from "./CharacterSelect";
import MovieDetails from "./MovieDetails";
import Loader from "../../components/Loader";

const Index = () => {
  // global store
  const { dispatch, useAppSelector } = useRedux();

  const { charactersList, getCharactersListLoading, films, getFilmsLoading } =
    useAppSelector(state => ({
      charactersList: state.Movies.charactersList,
      getCharactersListLoading: state.Movies.getCharactersListLoading,

      films: state.Movies.films,
      getFilmsLoading: state.Movies.getFilmsLoading,
    }));

  /*
  character
  */
  const [selectedCharacter, setSelectedCharacter] = useState<
    any | null | undefined
  >(null);
  const [characterOpts, setCharacterOpts] = useState<Array<object>>([]);

  const onChangeCharacter = (value: any | null | undefined) => {
    setSelectedCharacter(value);

    if (value) {
      const selectedCharacterMovies =
        value && value["films"] ? value["films"] : [];
      // ideally the backend should return the film id also. As we set the base url in the axios, we can not pass the whole api url to the axios, so we are extracting the Id from the given films url and pass those Ids to the redux-saga to get the films data
      const modifiedMovies = (selectedCharacterMovies || []).map((m: any) => {
        let result = (m || "").split("films")[1];
        result = result.replaceAll("/", "");
        return result;
      });
      dispatch(getFilms(modifiedMovies));
    }
  };

  /*
  get the characters list
  */
  useEffect(() => {
    dispatch(getCharacters("people"));
  }, [dispatch]);

  useEffect(() => {
    const opts: Array<object> = (charactersList || []).map(
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
  const [movies, setMovies] = useState<Array<any>>([]);
  const [lastYearMovie, setLastYearMovie] = useState<null | any>();
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
          {(getCharactersListLoading || getFilmsLoading) && <Loader />}
          <div className="mb-5">
            <CharacterSelect
              selectedCharacter={selectedCharacter}
              characterOpts={characterOpts}
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
