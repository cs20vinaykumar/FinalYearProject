import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Detail() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/GetPropertyForm/${productId}`
        );
        console.log("response >>>>>", response);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchData();
  }, [productId]);

  return (
    <>
      <p>Product ID: {productId}</p>
      <div className="main">
        <div className="grid-container">
          {product && ( // Check if product exists before rendering
            <div key={product._id} className="card" style={{ width: "20rem" }}>
              {/* Add image rendering logic if needed */}
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  Rent={product.pricing && product.pricing.rent}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
