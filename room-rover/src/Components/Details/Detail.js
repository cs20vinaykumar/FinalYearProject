import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Detail.css";

const Detail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
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
        const products = response.data; // Assuming response.data is an array of products
        const foundProduct = products.find((p) => p._id === productId);
        setProduct(foundProduct);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
  

      <div className="main-seeDetails">
        <h1 className="head-1">
          {product.title} {product.location}
        </h1>{" "}
        <br />
        <div className="DetailImageBox">
          <img
            className="card-img-top"
            src={`http://localhost:4000/Images/${product.file}`}
            alt={product.altText || "Product Image"}
          />
        </div>{" "}
        <br />
        <p className="rental-p">
          Monthly Rent &nbsp; &nbsp; | &nbsp; &nbsp; Security Deposite &nbsp;
          &nbsp;{" "}
        </p>
        <p className="rental-p">
          {product.pricing.rent} &nbsp; &nbsp; | &nbsp; &nbsp;{" "}
          {product.pricing.deposite} &nbsp; &nbsp;{" "}
        </p>
        <br />
        <div className="Details-button">
          <button className=" btn btn-dark btn-text ">Book Now</button> &nbsp;
          &nbsp; <br />
          <br />
          <button className=" btn btn-dark btn-text ">
            Request for visit
          </button>{" "}
        </div>{" "}
        <br />
        <br />
        <div className="avaibility">
          <strong className="head-des">Availability</strong>:
          <p>
            This is an {product.availability} Vacancy from{" "}
            {product.dateRange.fromDate} to {product.dateRange.toDate}
          </p>
        </div>
        <br />
        <strong className="head-des">Description</strong>: <br />
        <div className="description-1">{product.description}</div>
        <br />
        <div className=" head-des ">
          <h4 className="">
            <strong>Utilities And Amenities</strong>
          </h4>
          {product.amenities.slice(0, 2).map((amenity, index) => (
            <p key={index}>{amenity}</p>
          ))}
        </div>
      </div>

      {/* ------------------------------footer----------------------------------------------- */}
      <footer className="footer">
        <div id="footer">
          <div className="class1 class-same">
            Room<span className="green-1">Rover</span>
          </div>
          <div className="class2 class-same">Resources</div>
          <div className="class3 class-same">Useful Links</div>
          <div className="class4 class-same">News Letter</div>
        </div>
      </footer>
    </>
  );
};

export default Detail;
