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
        const products = response.data;
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
        <div id="left-side">
          <div className="DetailImageBox">
            {product.file.length > 1 && (
              <button className="prev" onClick={goToPrevSlide}>
                {"<"}
              </button>
            )}
            <img
              className="card-img-top-details"
              src={`http://localhost:4000/Images/${product.file[currentIndex]}`}
              alt={`Product ${currentIndex + 1}`}
            />
            {product.file.length > 1 && (
              <button className="next" onClick={goToNextSlide}>
                {">"}
              </button>
            )}
          </div>{" "}
          <br />
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
        </div>
        <div id="right-side">
          <div className="posted-by">
            <h2>
              {" "}
              <i class="fa-solid fa-user"></i> Posted By
            </h2>
            <div className="posted-details">
              <p>
                <strong>Name:</strong> {product.postedBy.name}{" "}
              </p>
              <p>
                <strong>Number:</strong> 0{product.postedBy.number}
              </p>
              <p>
                <strong>Email:</strong> {product.postedBy.email}
              </p>
            </div>
          </div>{" "}
          <br />
          <div className="head-1">
            {product.title},<br />
            {product.area},{product.location}. <br />
          </div>{" "}
          <br /> <br /> <hr className="h-line" /> <br />
          <div className="pricing">
            <p id="p-one">Rent: PKR {product.pricing.rent}</p>
            <p>Deposite: PKR {product.pricing.deposite}</p>
          </div>{" "}
          <hr className="h-line" />
          <br /> <br />
          <div className="Details-button">
            <Link to={`/Payment/${product._id}`}>
              <button className=" btn btn-dark btn-text ">Book Now</button>
            </Link>
            <br />
            <br />
            <Link to={`/RequestVisit/${product._id}`}>
              <button className=" btn btn-dark btn-text ">
                Request for visit
              </button>
            </Link>{" "}
          </div>{" "}
        </div>
        <div id="bottom-side">
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
                  This is an <strong>{product.availability}</strong> Vacancy
                  from <strong>{product.dateRange.fromDate}</strong> to{" "}
                  <strong>{product.dateRange.toDate}</strong>
                </li>
              </p>
            </div>
          </div>
          <br />
          <br />
          <br />
          <div className="head-des-container">
            <strong className="head-des" id="description">
              Description
            </strong>
            : <br />
            <div className="description-1">{product.description}</div>
          </div>
          <br />
          <br />
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
