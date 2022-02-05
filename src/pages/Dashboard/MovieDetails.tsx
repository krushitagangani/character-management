import React from "react";

interface MovieDetailsProps {
  lastYearMovie: any;
}

const MovieDetails = ({ lastYearMovie }: MovieDetailsProps) => {
  return (
    <>
      <h6 className="fw-normal">Name / Year last Movie:</h6>
      <p className="m-0 p-2 rounded bg-secondary bg-opacity-10">
        {lastYearMovie &&
        lastYearMovie["title"] &&
        lastYearMovie["release_date"]
          ? `${lastYearMovie["title"]}: ${lastYearMovie["release_date"]}`
          : "-"}
      </p>
    </>
  );
};

export default MovieDetails;
