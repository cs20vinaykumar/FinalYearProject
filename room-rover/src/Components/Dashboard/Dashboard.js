import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import { Link } from "react-router-dom";
// import FormatPrice from "../Helper/FormatPrice";

export default function Dashboard() {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedLocationHeader, setSelectedLocationHeader] =
    useState("Location");
  const [selectedType, setSelectedType] = useState("");
  const [selectedTypeHeader, setSelectedTypeHeader] = useState("Type");
  const [isFiltered, setIsFiltered] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showRoomSubDropdown, setShowRoomSubDropdown] = useState(false);
  const [showFlatSubDropdown, setShowFlatSubDropdown] = useState(false);
  const [showPriceRangeFilter, setShowPriceRangeFilter] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

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
      setOriginalProducts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const searchHandle = async (event) => {
    const key = event.target.value.trim();
    if (key === "") {
      setSearchResults([]);
    } else {
      try {
        const response = await axios.get(
          `http://localhost:4000/Search/${key}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };
  // ----------------Filter Functions--------------------------------------------
  const togglePriceRangeFilter = () => {
    setShowPriceRangeFilter(!showPriceRangeFilter);
  };

  const filterByLocation = (location) => {
    setSelectedLocation(location);
    setSelectedLocationHeader(location);
    setIsFiltered(true);
  };

  const filterByType = (type) => {
    setSelectedType(type);
    setSelectedTypeHeader(type);
    setIsFiltered(true);
  };

  const handleClear = () => {
    setSearchResults([]);
    setSelectedLocation("");
    setSelectedLocationHeader("Location");
    setIsFiltered(false);
    setSelectedType("");
    setSelectedTypeHeader("Type");
    setMinPrice("");
    setMaxPrice("");
  };

  const getProductsToDisplay = (
    searchResults,
    originalProducts,
    selectedLocation,
    selectedType,
    minPrice,
    maxPrice
  ) => {
    if (searchResults.length > 0) {
      return searchResults;
    } else {
      return originalProducts.filter(
        (product) =>
          (selectedLocation ? product.location === selectedLocation : true) &&
          (selectedType
            ? (product.propertyType.room || product.propertyType.flat) ===
              selectedType
            : true) &&
          (minPrice ? product.pricing.rent >= minPrice : true) &&
          (maxPrice ? product.pricing.rent <= maxPrice : true)
      );
    }
  };

  const productsToDisplay = getProductsToDisplay(
    searchResults,
    originalProducts,
    selectedLocation,
    selectedType,
    minPrice,
    maxPrice
  );

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
    setIsFiltered(true);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
    setIsFiltered(true);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light filters">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown ">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {selectedLocationHeader}
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={() => filterByLocation("Karachi")}
                    >
                      Karachi
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={() => filterByLocation("Hyderabad")}
                    >
                      Hyderabad
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={() => filterByLocation("Sukkur")}
                    >
                      Sukkur
                    </Link>
                  </li>
                </ul>
              </li>
              {/* ---------------------------------------------------------- */}

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  id="navbarDropdownMenuLink"
                  role="button"
                  aria-expanded={showDropdown ? "true" : "false"}
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {selectedTypeHeader}
                </Link>
                <ul
                  className={`dropdown-menu ${showDropdown ? "show" : ""}`}
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li
                    className="dropdown-item"
                    onMouseEnter={() => setShowFlatSubDropdown(true)}
                    onMouseLeave={() => setShowFlatSubDropdown(false)}
                  >
                    Flat
                    {showFlatSubDropdown && (
                      <ul className="sub-dropdown">
                        <li>
                          <Link
                            className="dropdown-item"
                            onClick={() => filterByType("2 Bed Drawing")}
                          >
                            2 Bed Drawing
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            onClick={() => filterByType("3 Bed Drawing")}
                          >
                            3 Bed Drawing
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            onClick={() => filterByType("4 Bed Drawing")}
                          >
                            4 Bed Drawing
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            onClick={() => filterByType("Studio Apartment")}
                          >
                            Studio Apartment
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            onClick={() => filterByType("Pent House")}
                          >
                            Pent House
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li
                    className="dropdown-item"
                    onMouseEnter={() => setShowRoomSubDropdown(true)}
                    onMouseLeave={() => setShowRoomSubDropdown(false)}
                  >
                    Room
                    {showRoomSubDropdown && (
                      <ul className="sub-dropdown">
                        <li>
                          <Link
                            className="dropdown-item"
                            onClick={() => filterByType("Shared Room")}
                          >
                            Shared Room
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            onClick={() => filterByType("Single Room")}
                          >
                            Single Room
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              </li>

              {/* -------------------------------------------------- */}
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  id="navbarDropdownMenuLink"
                  role="button"
                  aria-expanded={showPriceRangeFilter ? "true" : "false"}
                  onClick={togglePriceRangeFilter}
                >
                  Price Range
                </Link>
                <div
                  className={`dropdown-menu price-range-filter ${
                    showPriceRangeFilter ? "show" : ""
                  }`}
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                  />
                  <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                  />
                  {/* <button onClick={handleClear}>Clear Price Range</button> */}
                </div>
              </li>

              <li className="nav-item active">
                {isFiltered && (
                  <Link
                    className="nav-link"
                    to="/Dashboard"
                    onClick={handleClear}
                  >
                    <i className="fa-regular fa-circle-xmark"></i>{" "}
                    <span>Clear Filter</span>
                  </Link>
                )}
              </li>
              {/* --------------------SEARCH BAR-------------------------------------- */}
              <li>
                <div className="search-barr">
                  <i className="fa-solid fa-location-dot fa-2xs icon-1"></i>
                  <input
                    type="text"
                    name="eingabe"
                    className="input-text-2 searchbarr"
                    placeholder="Search, Flat, Rooms"
                    onChange={searchHandle}
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="dashboard">
        <legend>dashboard</legend>
        <hr className="lakeer" />
        {/* <headinv>Welcome to Room Rover</headinv> */}
      </div>
      <br /> <br />
      <div className="main">
        <div className="grid-container">
          {productsToDisplay.map((Product) => (
            <div key={Product._id} className="card" style={{ width: "20rem" }}>
              <img
                className="card-img-top image"
                src={`http://localhost:4000/Images/${Product.file[0]}`}
                alt={Product.altText || "Product Image"}
              />
              <div className="card-body" key={Product._id}>
                <h5 className="card-title">{Product.title}</h5>
                <h5 className="card-title">
                  <b>{Product.location}</b>
                </h5>
                <p className="card-text">
                  {Product.propertyType.room || Product.propertyType.flat}
                </p>
                <p className="card-text">
                  <strong>Rent:</strong>{" "}
                  {Product.pricing && Product.pricing.rent}
                  {/* {
                    <FormatPrice
                      price={Product.pricing && Product.pricing.rent}
                    />
                  } */}
                </p>
                <Link
                  to={`/product/${Product._id}`}
                  className="btn btn-primary btnSee"
                >
                  See Details
                </Link>{" "}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="map"></div>
    </>
  );
}
