import React, { useEffect, useState } from "react";
import "./Payment.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const Payment = () => {
  const { productId } = useParams();
  const [bookingDone, setBookingDone] = useState(false);
  const [image, setImage] = useState(null);
  const [product, setProduct] = useState(null);
  const [bookingStatus, setBookingStatus] = useState("");

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

      const payload = {
        userId: userId,
        productId: productId,
        status: "waiting",
      };
      console.log("Payload to be sent:", payload);

      await axios.post("http://localhost:4000/booking", payload, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBookingDone(true);
      setBookingStatus("Booking initiated. Please wait for confirmation.");
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

  return (
    <div className="payment-container">
      <div className="payment-box">
        <h3 className="payment-title">Account Details</h3>
        {product?.accountDetails?.map((account, index) => (
          <div key={index} className="account-info">
            <h4>{`${index + 1}${ordinalSuffix(index + 1)} account:`}</h4> <br />
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
          The owner will confirm within 2 hours.
        </p>
      </div>
      <div className="upload-section">
        <input
          type="file"
          name="image"
          value={image}
          accept="image/*"
          onChange={handleImageUpload}
        />{" "}
      </div>
      <div className="button-container">
        <button
          onClick={handleBookingDone}
          className="booking-button  btn-done"
        >
          Done Booking
        </button>
      </div>
      {bookingDone && <div className="booking-message">{bookingStatus}</div>}

   </div>
  );
};







// Function to get the ordinal suffix for a number (e.g., 1st, 2nd, 3rd, etc.)
function ordinalSuffix(num) {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = num % 100;
  return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
}

export default Payment;
