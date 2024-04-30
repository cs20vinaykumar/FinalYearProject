import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./UserPost.css";

export default function UserPost() {
  const [products, setProducts] = useState([]);
  const { userId } = useParams();
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
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userId]);

  return (
    <div>
      <div className="dashboard">
        <legend>User's Post</legend>
        <hr className="lakeer" />
        <div div className="headinv">
          {/* Here is the post you published. */}
        </div>
      </div>
      <br /> <br />
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
                  src={`http://localhost:4000/Images/${product.file[0]}`}
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
