import React from "react";

//plugins
import { ListGroup } from "react-bootstrap";

const EmptyState = () => {
  return (
    <div className="m-0 p-2 rounded bg-secondary bg-opacity-10">
      No Character Selected.
    </div>
  );
};

interface MoviesListProps {
  movies: Array<any>;
}
const MoviesList = ({ movies }: MoviesListProps) => {
  return (
    <>
      <h6 className="fw-normal">List of Movies:</h6>
      {movies.length > 0 ? (
        <ListGroup as="ul">
          {(movies || []).map((movie: any, key: number) => (
            <ListGroup.Item as="li" key={key}>
              {movie.title}
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <EmptyState />
      )}
    </>
  );
};

export default MoviesList;
