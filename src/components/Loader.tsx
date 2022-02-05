import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="status">
        <Spinner animation="border" variant="primary" />
      </div>
    </div>
  );
};

export default Loader;
