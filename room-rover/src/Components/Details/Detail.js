import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Detail.css";
import { Link } from "react-router-dom";

const Detail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? product.file.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === product.file.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="main-seeDetails">
        <h1 className="head-1">
          {product.title} {product.location}
        </h1>
        <br />
        <div className="DetailImageBox">
          {product.file.length > 1 && (
            <button className="prev" onClick={goToPrevSlide}>
              {"<"}
            </button>
          )}
          <img
            className="card-img-top"
            src={`http://localhost:4000/Images/${product.file[currentIndex]}`}
            alt={`Product ${currentIndex + 1}`}
          />
          {product.file.length > 1 && (
            <button className="next" onClick={goToNextSlide}>
              {">"}
            </button>
          )}
        </div>
        {product.file.length > 1 && (
          <div className="dots-container">
            {product.file.map((_, index) => (
              <span
                key={index}
                className={index === currentIndex ? "dot active" : "dot"}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        )}
        <br />
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
        <div className="posted-by">
          
  <h2> <i class="fa-solid fa-user"></i> Posted By</h2>
  <div className="posted-details">
    <p><strong>Name:</strong> {product.postedBy.name} {product.postedBy.lname}</p>
    <p><strong>Number:</strong> 0{product.postedBy.number}</p>
    <p><strong>Email:</strong> {product.postedBy.email}</p>
  </div>
</div>
        <div className="Details-button">
          <Link to="/BookingDetails">
            <button className=" btn btn-dark btn-text ">Book Now</button> &nbsp;
          </Link>
          &nbsp; <br />
          <br />
          <button className=" btn btn-dark btn-text ">
            Request for visit
          </button>{" "}
        </div>{" "}

 
        <br />
        <br />
        <br />
        <br />
        {/* JSX */}
        <div className="main-description">
          <div className="description-2">
            <strong className="head-des">Utilities And Amenities</strong>
            <ul id="amenitiesList" className="amenities-columns">
              {product.amenities.map((amenity, index) =>
                amenity.split(",").map((segment, segmentIndex) => (
                  <li key={index + "-" + segmentIndex}>
                    {segment
                      .trim()
                      .split(" ")
                      .map((word, wordIndex) => (
                        <span key={wordIndex}>{word}</span>
                      ))}
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="avaibility">
            <strong className="head-des">Availability</strong>:
            <p>
              <li>
                This is an <strong>{product.availability}</strong> Vacancy from{" "}
                <strong>{product.dateRange.fromDate}</strong> to{" "}
                <strong>{product.dateRange.toDate}</strong>
              </li>
            </p>
          </div>
        </div>
        <br />
        <br />
        <br />
        <strong className="head-des">Description</strong>: <br />
        <div className="head-des-container">
          <div className="description-1">{product.description}</div>
        </div>
        <br />
        <br />
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
