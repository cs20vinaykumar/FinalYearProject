/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [Products, setProducts] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("http://localhost:4000/GetPropertyForm");
      // console.log("products >>>>>", data)
      setProducts(data);
    };

    fetchData();
  }, []);
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light filters">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Location
                </a>
                <ul
                  class="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <a class="dropdown-item" href="/">
                      Karachi
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="/">
                      Hyderabad
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="/">
                      Sukkur
                    </a>
                  </li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Type
                </a>
                <ul
                  class="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <a class="dropdown-item" href="/">
                      Flat
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="/">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="/">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>

              <li class="nav-item active">
                <a class="nav-link" href="/">
                  {" "}
                  <i class="fa-solid fa-sliders"></i> More Filter
                  <span class="sr-only">(current)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* ------------------------------------------------------ */}
      <div className="main">
        <div className="grid-container">
          {Products &&
            Products?.data.map((Product) => (
              <div key={Product._id} class="card" style={{ width: "20rem" }}>
                {/* <div className="id">id={Product._id}</div> */}
                <img class="card-img-top" src="" alt="Image" />
                <div class="card-body">
                  <h5 class="card-title">title= {Product.title}</h5>
                  <p class="card-text">Description={Product.description}</p>
                  <p class="card-text">Rent={Product.pricing.rent}</p>
                  <Link to="/Detail" class="btn btn-primary">
                    See Details
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
