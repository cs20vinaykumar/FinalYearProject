import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TenantAgreement.css";
import { useParams } from "react-router-dom";

export default function TenantAgreement() {
  const { productId } = useParams();
  const [foundProduct, setFoundProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/GetAgreementData`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const products = response.data;
        const foundProduct = products.find((p) => p._id === productId);
        setFoundProduct(foundProduct);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
      }
    };

    fetchData();
  }, [productId]);

  return (
    <div className="terms-and-conditions">
      <h2>Agreement Form</h2>
      {error && <div>Error: {error}</div>}
      {foundProduct ? (
        <div className="product">
          <span>
            This rental <strong>("Agreement")</strong> is entered into between{" "}
            "Landlord", and{" "}
            <strong>
              {foundProduct.postedBy?.ownerName} {foundProduct.postedBy?.ownerLName},
            </strong>{" "}
            hereinafter referred to as the "Tenant" <strong>Diway</strong>
          </span>
          <form>
            <div className="terms">
              <p>
                <ul>
                  {foundProduct.bulletPoints &&
                    foundProduct.bulletPoints.map((point, index) => (
                      <li key={index}> <br />{point}</li>
                    ))}
                </ul>
              </p>
            </div>
            <button type="submit">Proceed</button>
          </form>
        </div>
      ) : (
        <div>No agreements found</div>
      )}
    </div>
  );
}
