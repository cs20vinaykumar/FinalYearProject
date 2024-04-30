import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Booking.css";

function Bookings(props) {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [totalBookings, setTotalBookings] = useState(0);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/GetPropertyForm",
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setOriginalProducts(response.data);
      setTotalBookings(response.data.length)
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error, e.g., display a message to the user
    }
  };

  return (
    <><br />
      <div className="dashboard">
        <legend>Dashboard</legend>
        <hr className="lakeer lakeer-media" />
        <div className="headinv">   <p className="total-users" id="book-total">Total Bookings: {totalBookings}</p></div>
      </div>
      <br /> <br />
   
      <div className="main">
        <div className="grid-container">
          {originalProducts.map((Product) => (
            <div key={Product._id} className="card" style={{ width: "20rem" }}>
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
                  {Product.propertyType.room || Product.propertyType.flat}
                </p>
                <p className="card-text">
                  <strong>Rent:</strong>{" "}
                  {Product.pricing && Product.pricing.rent}
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
      </div>
      <div className="map"></div>
    </>
  );
}

export default Bookings;
