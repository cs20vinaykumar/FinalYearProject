import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import "./RequestVisit.css";

export default function RequestVisit() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/GetPropertyForm",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  const handleTimeSlotSelect = (slot) => {
    setSelectedTimeSlot(slot);
  };

  const handleVisitRequest = async () => {
    if (selectedTimeSlot) {
      try {
        const { date, startTime, endTime } = selectedTimeSlot;
        await axios.post(
          "http://localhost:4000/PostRquest",
          { productId, date, startTime, endTime },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        alert("Visit request submitted successfully");

        navigate("/Dashboard");
      } catch (error) {
        console.error("Error submitting visit request:", error);
      }
    }
  };

  return (
    <div className="request-visit-container">
      <h1 className="title">Select a Time Slot for Visit</h1>
      <span>
        Select a time slot that suits you best and get ready to explore your
        potential new home!"
      </span>{" "}
      <br />
      <br />
      <Grid container spacing={2}>
        {product &&
          product.timeSlots.map((slot, index) => (
            <Grid item key={index}>
              <Button
                fullWidth
                variant="outlined"
                color={selectedTimeSlot === slot ? "success" : "primary"}
                onClick={() => handleTimeSlotSelect(slot)}
                sx={{ marginBottom: 2 }}
              >
                {new Date(slot.date).toLocaleDateString()} - {slot.startTime} to{" "}
                {slot.endTime}
              </Button>
            </Grid>
          ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        disabled={!selectedTimeSlot}
        onClick={handleVisitRequest}
        className="request-button"
      >
        Request Visit
      </Button>
    </div>
  );
}
