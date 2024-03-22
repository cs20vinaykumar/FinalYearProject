import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TenantAgreement.css";

export default function TenantAgreement() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:4000/GetAgreementData",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="terms-and-conditions">
      <h2>Agreement Form</h2>
      {error && <div>Error: {error}</div>}
      {products.length > 0 && products[0].postedBy ? (
        <div className="product">
          <span>
            This rental <strong>("Agreement")</strong> is entered into between{" "}
            "Landlord", and{" "}
            <strong>
              {products[0].postedBy.name} {products[0].postedBy.lname},
            </strong>{" "}
            hereinafter referred to as the "Tenant" <strong>Diway</strong>
          </span>
          <form>
            <div className="terms">
              <p>
                <ul>
                  {products[0].bulletPoints.map((point, index) => (
                    <li key={index}>{point}</li>
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
