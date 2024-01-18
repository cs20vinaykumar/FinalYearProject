import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

export default function Post() {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/mypost", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProducts(result.myPost);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
      throw error;
    }
  };

  return (
    <>
      <div className="main">
        <div className="grid-container">
          {Products &&
            Products.map((Product) => (
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
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
