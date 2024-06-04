import React, { useEffect, useState } from "react";
import "./Payment.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Payment = ({ booking }) => {
  const { productId } = useParams();
  const [bookingDone, setBookingDone] = useState(false);
  const [image, setImage] = useState(null);
  const [product, setProduct] = useState(null);
  const [bookingStatus, setBookingStatus] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const getUserId = () => {
    const token = localStorage.getItem("token");
    console.log("Token from local storage:", token);

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken);
        return decodedToken.userID;
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    } else {
      console.error("Token not found.");
      return null;
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleBookingDone = async () => {
    try {
      const userId = getUserId();
      console.log("User ID from token:", userId);

      if (!userId) {
        console.error("User ID is not available.");
        return;
      }

      if (userId === product.postedBy._id) {
        alert("Owner cannot book their own post.");
        return;
      } else {
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("productId", productId);
        formData.append("status", "waiting");
        formData.append("image", image); // Append the image file to the form data

        await axios.post("http://localhost:4000/booking", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to multipart form data
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBookingDone(true);
        alert("Payemnt initiated. Please wait for confirmation.");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error booking:", error);
    }
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = getUserId();
        const response = await axios.get(
          `http://localhost:4000/booking/check?userId=${userId}&productId=${productId}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.bookingExists) {
          setBookingDone(true);
          setBookingStatus("You have booked this post.");
        }
      } catch (error) {
        console.error("Error fetching booking status:", error);
      }
    };

    fetchData();
  }, [productId]);

  const handleCancelBooking = async (userId, productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmDelete) {
      return; // If user cancels, do nothing
    }

    try {
      const token = localStorage.getItem("token");
      const userId = getUserId();

      if (!token) {
        console.error("Token not found.");
        return;
      }

      const response = await axios.delete(
        `http://localhost:4000/booking/${userId}/${productId}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Booking deleted successfully");

        alert("Booking deleted successfully");
        navigate("/Dashboard");
      } else {
        console.error("Failed to delete booking");

        alert("Failed to delete booking");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);

      alert("Error deleting booking. Please try again later.");
    }
  };
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/booking/GetStatus/${productId}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const statusData = response.data;
        setStatus(statusData);
        if (statusData && statusData.status === "approved") {
          await axios.put(
            `http://localhost:4000/PropertyForm/${productId}/booking`,
            { status: "approved" }, // Update status directly to "approved"
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [productId]);

  return (
    <>
      <div className="container">
        <div className="payment-container">
          <div className="payment-box">
            <h3 className="payment-title">Account Details</h3>
            {product?.accountDetails?.map((account, index) => (
              <div key={index} className="account-info">
                <h4>{`${index + 1}${ordinalSuffix(index + 1)} account:`}</h4>{" "}
                <br />
                <div className="info-label">Account Holder:</div>
                <div className="info-value">{account.accountHolder}</div>
                <div className="info-label">Account Number:</div>
                <div className="info-value">{account.accountNumber}</div>
                <div className="info-label">Bank:</div>
                <div className="info-value">{account.bank}</div> <br /> <hr />
              </div>
            ))}
          </div>

          <div className="payment-instructions">
            <p className="instruction greeen blink ">
              After Payment, take a screenshot and upload it here.
            </p>
            <p className="instruction green blink ">
              Wait Until Owner Confirms Your Booking
            </p>
          </div>
          <div className="upload-section">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
            />{" "}
          </div>
          {image && (
            <div className="image-preview">
              <img src={URL.createObjectURL(image)} alt="Preview" />
            </div>
          )}
          {!bookingDone && (
            <button
              onClick={handleBookingDone}
              className="booking-button btn-done"
            >
              Initiate Payment
            </button>
          )}

          {bookingDone && status && (
            <div className="booking-message">
              {status.status === "approved" && (
                <p>Your booking has been confirmed. Enjoy your stay!</p>
              )}
              {status.status === "rejected" && (
                <p>Your booking has been Cancelled. Sorry for inconvenience</p>
              )}
              {status.status === "waiting" && <p>{bookingStatus}</p>}
            </div>
          )}

          {!bookingDone && (
            <div className="button-container">
              {bookingDone && (
                <button className="waiting-button">
                  {status && (
                    <div>
                      {status.status === "waiting" && (
                        <p>Wait for owner approval</p>
                      )}
                      {status.status === "approved" && (
                        <p>Booking confirmed. Enjoy your stay!</p>
                      )}
                      {status.status === "cancelled" && (
                        <p>Booking cancelled</p>
                      )}
                    </div>
                  )}
                </button>
              )}

              {bookingDone && (
                <button
                  onClick={() => handleCancelBooking(booking, productId)}
                  className="cancel-booking-button"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          )}
        </div>{" "}
        <br />
        <div className="package-summary">
          <h3>Package Summary</h3>
          <div className="subtotal">
            <h4 style={{ color: "gray", fontWeight: "200", fontSize: "22px" }}>
              Subtotal
            </h4>
            <h4 style={{ fontSize: "22px" }}>Rs.{product?.pricing?.rent}</h4>
          </div>
          <div className="platform-charges">
            <h4 style={{ color: "gray", fontWeight: "200", fontSize: "22px" }}>
              Platform Charges
            </h4>
            <h4 style={{ fontSize: "22px" }}>Free</h4>
          </div>
          <div className="total-price">
            <h4 style={{ color: "gray", fontWeight: "200", fontSize: "22px" }}>
              Total
            </h4>
            <h4 style={{ fontSize: "22px" }}>Rs. {product?.pricing?.rent}</h4>
          </div>
          <hr className="seperator" />
          {bookingDone && (
            <button className="waiting-button">
              {status && (
                <div>
                  {status.status === "waiting" && (
                    <p>Wait for owner approval</p>
                  )}
                  {status.status === "approved" && (
                    <p>Booking confirmed. Enjoy your stay!</p>
                  )}
                  {status.status === "cancelled" && <p>Booking cancelled</p>}
                </div>
              )}
            </button>
          )}

          {bookingDone && status.status !== "approved" && (
            <button
              onClick={() => handleCancelBooking(booking, productId)}
              className="cancel-booking-button"
            >
              Cancel Booking
            </button>
          )}
        </div>
      </div>
    </>
  );
};

function ordinalSuffix(num) {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = num % 100;
  return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
}

export default Payment;
