import React from "react";

//plugins
import { Row, Col, Card } from "react-bootstrap";
import { Film } from "../../types";

const EmptyState = () => {
  return (
    <div className="m-0 p-2 rounded bg-secondary bg-opacity-10">
      No Character Selected.
    </div>
  );
};

interface MovieTypes {
  movie: Film;
}
const Movie = ({ movie }: MovieTypes) => {
  const releaseDate = movie?.release_date
    ? new Date(movie?.release_date)
    : undefined;

  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title>{movie.title ? movie.title : "-"}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Producer : {movie.producer}
        </Card.Subtitle>
        <Card.Text as="div">
          <p className="mb-1 mt-3">
            Director : {movie.director ? movie.director : "-"}
          </p>
          <p className="mb-0">
            Release Date :{" "}
            {releaseDate ? `${releaseDate.toLocaleDateString("en-CA")}` : "-"}
          </p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
interface MoviesListProps {
  movies: Array<Film>;
}
const MoviesList = ({ movies }: MoviesListProps) => {
  return (
    <>
      <h6 className="fw-bold">List of Movies</h6>
      {movies.length > 0 ? (
        <Row>
          {(movies || []).map((movie: Film, key: number) => (
            <Col lg={6} xs={12} key={key} className="pb-0">
              <Movie movie={movie} />
            </Col>
          ))}
        </Row>
      ) : (
        <EmptyState />
      )}
    </>
  );
};

export default MoviesList;
