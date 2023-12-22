import React from "react";
import { Link } from "react-router-dom";

export default function Detail() {
  return (
    <div>
      <h1>see details</h1>
      <Link to="/Dashboard">
        <button className="btn btn-success mx-5 my-5">back</button>
      </Link>
    </div>
  );
}
