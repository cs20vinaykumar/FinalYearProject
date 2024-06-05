import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Chat from "../Chat/Chat";
import Complaint from "../Complaint/Complaint";
import "./Detail.css";

const Detail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isComplaintOpen, setIsComplaintOpen] = useState(false);
  const [totalViews, setTotalViews] = useState(0);

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

    const fetchTotalViews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/property/views/${productId}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTotalViews(response.data.totalViews);
      } catch (error) {
        console.error("Error fetching total views:", error);
      }
    };

    fetchData();
    fetchTotalViews();
  }, [productId]);

  useEffect(() => {
    const postView = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const { userID } = jwtDecode(token);
          const userId = userID;
          console.log("Decoded User ID:", userId);

          await axios.post(
            `http://localhost:4000/property/views/${productId}/`,
            { userId },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
        }
      } catch (error) {
        console.error("Error posting view:", error);
      }
    };

    if (product) {
      postView();
    }
  }, [product, productId]);

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

  const toggleChatModal = () => {
    setIsChatOpen(!isChatOpen);
  };

  const toggleComplaintModal = () => {
    setIsComplaintOpen(!isComplaintOpen);
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
              src={`http://localhost:4000/assets/${product.file[currentIndex]}`}
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
              <i className="fa-solid fa-user"></i> Posted By
            </h2>
            <div className="posted-details">
              <p>
                <strong>Name:</strong> {product?.postedBy?.name}{" "}
              </p>
              <p>
                <strong>Number:</strong> 0{product.postedBy?.number}
              </p>
              <p>
                <strong>Email:</strong> {product.postedBy?.email}
              </p>
              {/* <p>
                <strong>Booking Status:</strong> <span className="green-one">{product.booking.status === `approved`? `Booked`: product.booking.status }</span> 
              </p> */}
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
          <hr className="h-line" /> <br />
          <div className="total-views">
            <strong>{totalViews} people have viewed this post</strong>
          </div>
          <br /> <br />
          <div className="Details-button">
            <div className="button-row">
              <Link to={`/Payment/${product._id}`}>
                <button className="btn btn-dark btn-text">Book Now</button>
              </Link>
              <Link to={`/RequestVisit/${product._id}`}>
                <button className="btn btn-dark btn-text">
                  Request for visit
                </button>
              </Link>
            </div>
            <div className="button-row">
              <button
                className="btn btn-dark btn-text"
                onClick={toggleComplaintModal}
              >
                Complaint
              </button>
              <button
                className="btn btn-dark btn-text"
                onClick={toggleChatModal}
              >
                Chat
              </button>
            </div>
          </div>
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
                          <span className="size-font-amenities" key={wordIndex}>
                            {word}
                          </span>
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

      {/* Chat Modal */}
      {isChatOpen && (
        <Chat
          onClose={toggleChatModal}
          productId={productId}
          postedBy={product.postedBy}
        />
      )}
      {/* Complaint Modal */}
      {isComplaintOpen && (
        <Complaint onClose={toggleComplaintModal} productId={productId} />
      )}
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
