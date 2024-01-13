/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

export default function Dashboard() {
  const [Products, setProducts] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("http://localhost:4000/GetPropertyForm");
      setProducts(data);
    };

    fetchData();
  }, []);

  // const convertSpacesToHyphens = (title) => {
  //   return title.replace(/\s+/g, '-').toLowerCase();
  // };

  const deleteProduct = async (id) => {
    try {
      let result = await fetch(
        `http://localhost:4000/DeletePropertyForm/product/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await result.json();
      window.location.reload(true);
      return data;
    } catch (error) {
      console.error("Error:", error.message);
      throw error; // Re-throw the error for the calling function to handle
    }
  };

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
                <Dropdown className="dropdow">
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                  ></Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>
                      {" "}
                      <button
                        onClick={() => deleteProduct(Product._id)}
                        className="btn btn-dark"
                      >
                        delete
                      </button>{" "}
                    </Dropdown.Item>
                    {/* <Dropdown.Item href="#/action-2">Action 2</Dropdown.Item> */}
                    <Dropdown.Item>
                      {" "}
                      <Link to={`/Update/${Product._id}`}>
                        <button className="btn btn-success">Update</button>
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
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
                  {/* <button
                    onClick={() => deleteProduct(Product._id)}
                    className="btn btn-dark"
                  >
                    delete
                  </button>{" "} */}
                  {/* <Link to={`/Update/${Product._id}`}>
                  <button className="btn btn-success">
                    Update

                  </button>
                  </Link> */}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
