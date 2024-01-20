import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Modal, Button } from "react-bootstrap";
import "./post.css";

export default function Post() {
  const [products, setProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

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
        {/* <headinv>Welcome to Room Rover</headinv> */}
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
                    id="dropdown-basic"
                  ></Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <button
                        onClick={() => handleDeleteClick(product._id)}
                        className="btn btn-dark"
                      >
                        delete
                      </button>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to={`/Update/${product._id}`}>
                        <button className="btn btn-success">Update</button>
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <img
                  className="card-img-top image"
                  src={`http://localhost:4000/Images/${product.file}`}
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
                  <Link
                    to={`/product/${product._id}`}
                    className="btn btn-primary btnSee "
                  >
                    See Details
                  </Link>{" "}
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
