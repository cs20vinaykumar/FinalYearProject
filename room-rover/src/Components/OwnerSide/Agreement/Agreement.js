import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "./Agreement.css";
import axios from "axios";

const Agreement = (props) => {
  const [bulletPoints, setBulletPoints] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [image, setImage] = useState(null);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:4000/updateProfile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          setUserName(response.data); 
        }
      } catch (error) {
        console.log("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  


  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("bulletPoints", JSON.stringify(bulletPoints));
      formData.append("image", image);
      formData.append("ownerName", userName.name);
      formData.append("ownerLName", userName.lname);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:4000/Agreement",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Set Content-Type for FormData
          },
        }
      );

      if (response.status === 201) {
        alert("Agreement created successfully");
        setBulletPoints([]);
        setInputValue("");
        setImage(null);
        navigate("/Dashboard");
      }
    } catch (error) {
      console.log("Error Fetching Data", error);
    }
  };

  const addBulletPoint = () => {
    if (inputValue.trim() !== "") {
      setBulletPoints([...bulletPoints, inputValue]);
      setInputValue("");
    }
  };

  const deleteBulletPoint = (index) => {
    const updatedBulletPoints = bulletPoints.filter((_, i) => i !== index);
    setBulletPoints(updatedBulletPoints);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div>
      <div className="popup">
        <div
          className="popup-inner"
          style={{ maxHeight: "500px", overflowY: "auto" }}
        >
          <h2>Agreement Form</h2>
          <span>
            This rental <strong > ("Agreement")</strong> is entered into between{" "}
            <strong> {userName.name} {userName.lname}</strong> hereinafter referred to as the
            "Landlord", and <strong> [Tenant's Name],</strong> hereinafter
            referred to as the "Tenant"
          </span>{" "}
          <br />
          <br />
          <span className="span-p">
            Write all the clauses in the Agreement form
          </span>
          <ul>
            {bulletPoints.map((point, index) => (
              <li key={index}>
                {point}{" "}
                <i
                  class="fa-solid fa-trash"
                  onClick={() => deleteBulletPoint(index)}
                ></i>
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="image-input"
          />
          <br /> <br />
          <button onClick={addBulletPoint}>Add Bullet Point</button> <br />{" "}
          <hr />
          <br />
          <span className="span-agree">
            Uplaod Image of your CNIC both sides
          </span>{" "}
          <br />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
          />{" "}
          <br /> <br />
          <br /> <br />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Link to="/Dashboard">
            <button className="close-btn btn btn-success">Close</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Agreement;
