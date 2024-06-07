import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Modal, Button } from "react-bootstrap";
import "./post.css";
import Typed from "typed.js";

export default function Post() {
  const [products, setProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    let typed = new Typed(".headinv", {
      strings: ["  Here are the post you published."],
      typeSpeed: 20,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/mypost", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProducts(result.myPost);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const deleteProduct = async (id) => {
    try {
      let result = await fetch(
        `http://localhost:4000/DeletePropertyForm/product/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await result.json();
      window.location.reload(true);
      return data;
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  };

  const handleDeleteClick = (id) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteProduct(productToDelete);
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setProductToDelete(null);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="dashboard">
        <legend>My Post</legend>
        <hr className="lakeer" />
        <div div className="headinv"></div>
      </div>
      <br /> <br />
      <div className="main">
        <div className="grid-container">
          {products &&
            products.map((product) => (
              <div
                key={product._id}
                className="card"
                style={{ width: "20rem" }}
              >
                <Dropdown className="dropdow">
                  <Dropdown.Toggle
                    variant="success"
                    className="toggle-media"
                    id="dropdown-basic"
                  ></Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <button
                        onClick={() => handleDeleteClick(product._id)}
                        className="btn btn-dark btn-media"
                      >
                        delete
                      </button>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to={`/Update/${product._id}`}>
                        <button className="btn btn-success btn-media">
                          Update
                        </button>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item></Dropdown.Item>
                    <Dropdown.Item>
                      <Link>
                        <button className="btn btn-success btn-media">
                          View Request Visit
                        </button>
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <img
                  className="card-img-top image"
                  src={`http://localhost:4000/assets/${product.file[0]}`}
                  alt={product.altText || "Product Image"}
                />
                <div className="card-body" key={product._id}>
                  <h5 className="card-title">{product.title}</h5>
                  <h5 className="card-title">
                    <b>{product.location}</b>
                  </h5>
                  <p className="card-text">
                    {product.propertyType.room || product.propertyType.flat}
                  </p>
                  <p className="card-text">
                    Rent <b>{product.pricing && product.pricing.rent}</b>
                  </p>
                  <div className="button-container">
                    <Link
                      to={`/product/${product._id}`}
                      className="custom-button"
                    >
                      See Details
                    </Link>
                    <Link to={`/booking/product/${product._id}`}>
                      <button className="custom-view-button">
                        View Booking
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
