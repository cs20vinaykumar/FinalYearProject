/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [Products, setProducts] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("http://localhost:4000/GetPropertyForm", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProducts(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light filters">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Location
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <a className="dropdown-item" href="/">
                      Karachi
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      Hyderabad
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      Sukkur
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Type
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <a className="dropdown-item" href="/">
                      Flat
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item active">
                <a className="nav-link" href="/">
                  {" "}
                  <i className="fa-solid fa-sliders"></i> More Filter
                  <span className="sr-only">(current)</span>
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
            Products.data.map((Product) => (
              <div
                key={Product._id}
                className="card"
                style={{ width: "20rem" }}
              >
                <img
                  className="card-img-top image"
                  src={`http://localhost:4000/Images/${Product.file}`}
                  alt={Product.altText || "Product Image"}
                />
                <div className="card-body" key={Product._id}>
                  <h5 className="card-title">{Product.title}</h5>
                  <h5 className="card-title">
                    <b>{Product.location}</b>
                  </h5>
                  <p className="card-text">
                    {Product.propertyType.room || Product.propertyType.flat}
                  </p>
                  <p className="card-text">
                    Rent <b>{Product.pricing && Product.pricing.rent}</b>
                  </p>
                  <Link
                    to={`/product/${Product._id}`}
                    className="btn btn-primary btnSee "
                  >
                    See Details
                  </Link>{" "}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
