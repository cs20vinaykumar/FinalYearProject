import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Cart() {
  const [bookedPosts, setBookedPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:4000/booking", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBookedPosts(response.data);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <div className="dashboard">
        <legend>Booked Post</legend>
        <hr className="lakeer lakeer-media" />
        <div className="headinv">Here are the posts you booked.</div>
      </div>
      <br /> <br />
      <div className="main">
        {loading ? ( // Check if loading
          <div>Loading...</div>
        ) : bookedPosts.length === 0 ? ( // Check if bookedPosts array is empty
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
                  src={`http://localhost:4000/Images/${Product.file[0]}`}
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
