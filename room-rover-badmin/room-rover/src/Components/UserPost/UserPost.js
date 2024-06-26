import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./UserPost.css";

export default function UserPost() {
  const [products, setProducts] = useState([]);
  const [length, setLength] = useState(0);
  const { userId } = useParams();
  const navigate = useNavigate();
  console.log(userId);

  useEffect(() => {
    fetch(`http://localhost:4000/mypost/${userId}`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProducts(result.myPost);
        setLength(result.myPost.length);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userId]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/Login");
    }
  }, [navigate]);
  return (
    <div>
      <br />
      <div className="dashboard">
        <legend>Dashboard</legend>
        <hr className="lakeer lakeer-media" />
        <div className="headinv">
          <p className="total-users " id="book-total-user">
            Total User Posts: {length}
          </p>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="main">
        <div className="grid-container">
          {products &&
            products.map((product) => (
              <div
                key={product._id}
                className="card"
                style={{ width: "20rem" }}
              >
                <img
                  className="card-img-top image"
                  src={`http://localhost:4000/assets/${product.file[0]}`}
                  alt={product.altText || "Product Image"}
                />
                <div className="card-body" key={product._id}>
                  <h5 className="card-title">{product.title}</h5>
                  <h5 className="card-title">
                    <b>{product.location}</b>
                  </h5>
                  <p className="card-text">
                    {product.propertyType.room || product.propertyType.flat}
                  </p>
                  <p className="card-text">
                    Rent <b>{product.pricing && product.pricing.rent}</b>
                  </p>
                  <Link
                    to={`/product/${product._id}`}
                    className="btn btn-primary btnSee btn-details-mdeia "
                    style={{ marginLeft: "20px" }}
                  >
                    See Details
                  </Link>{" "}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
