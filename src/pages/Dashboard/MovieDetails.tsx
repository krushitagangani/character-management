import React from "react";
import { Film } from "../../types";

interface MovieDetailsProps {
  lastYearMovie?: Film;
}

const MovieDetails = ({ lastYearMovie }: MovieDetailsProps) => {
  const releaseDate = lastYearMovie?.release_date
    ? new Date(lastYearMovie?.release_date)
    : undefined;
  return (
    <>
      <h6 className="fw-bold">Name / Year last Movie</h6>
      <p className="m-0 p-2 rounded bg-secondary bg-opacity-10">
        {lastYearMovie && lastYearMovie["title"] && releaseDate
          ? `${lastYearMovie["title"]}: ${releaseDate.toLocaleDateString(
              "en-CA"
            )}`
          : "-"}
      </p>
    </>
  );
};

export default MovieDetails;
