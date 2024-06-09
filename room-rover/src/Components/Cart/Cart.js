import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Typed from "typed.js";
import "./Cart.css";

export default function Cart() {
  const [bookedPosts, setBookedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:4000/booking", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBookedPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);
  useEffect(() => {
    let typed = new Typed(".headinv", {
      strings: ["Here are the posts you booked."],
      typeSpeed: 35,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/Login");
    }
  }, [navigate]);
  return (
    <div>
      <div className="dashboard-cart">
        <legend>Booked Post</legend>
        <hr className="lakeer lakeer-media" />
        <div className="headinv"></div>
      </div>
      <br /> <br />
      <div className="main">
        {loading ? (
          <div>Loading...</div>
        ) : bookedPosts.length === 0 ? (
          <div>No posts booked yet.</div>
        ) : (
          <div className="grid-container">
            {bookedPosts.map((Product) => (
              <div
                key={Product._id}
                className="card"
                style={{ width: "20rem" }}
              >
                <img
                  className="card-img-top image"
                  src={`http://localhost:4000/assets/${Product.file[0]}`}
                  alt={Product.altText || "Product Image"}
                />
                <div className="card-body" key={Product._id}>
                  <h5 className="card-title">{Product.title}</h5>
                  <h5 className="card-title">
                    <b>
                      {Product.area}, {Product.location}
                    </b>
                  </h5>
                  <p className="card-text">
                    {Product.propertyType?.room || Product.propertyType?.flat}
                  </p>
                  <p className="card-text">
                    <strong>Rent:</strong>{" "}
                    {Product.pricing && Product.pricing.rent}
                    {/* {
                      <FormatPrice
                        price={Product.pricing && Product.pricing.rent}
                      />
                    } */}
                  </p>
                  <Link
                    to={`/product/${Product._id}`}
                    className="btn btn-primary btnSee btn-details-mdeia"
                  >
                    See Details
                  </Link>{" "}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
