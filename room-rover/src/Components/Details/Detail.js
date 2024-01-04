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
          "http://localhost:4000/GetPropertyForm"
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
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>{product.amenities}</p>
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
