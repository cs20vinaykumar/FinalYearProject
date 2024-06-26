import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import Typed from "typed.js";
// import FormatPrice from "../Helper/FormatPrice";

function Dashboard(props) {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
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
  const [userLocation, setUserLocation] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const navigate = useNavigate();

  const toggleMap = () => {
    setShowMap(!showMap);
  };
  useEffect(() => {
    let typed = new Typed(".headinv", {
      strings: [
        "Welcome at the Room Rover",
        "Find Your Ideal room for rent.",
        "Find home together",
      ],
      typeSpeed: 20,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/Login");
    }
  }, [navigate]);
  useEffect(() => {
    fetchData();
    getUserLocation();
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
    setSearch(key);
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
    if (searchResults.length > 0 || search !== "") {
      return searchResults;
    } else {
      return originalProducts.filter(
        (product) =>
          (selectedLocation ? product.location === selectedLocation : true) &&
          (selectedType
            ? (product.propertyType.room || product.propertyType.flat) ===
              selectedType
            : true) &&
          (minPrice
            ? parseFloat(product.pricing.rent.replace(/,/g, "")) >=
              parseFloat(minPrice.replace(/,/g, ""))
            : true) && 
          (maxPrice
            ? parseFloat(product.pricing.rent.replace(/,/g, "")) <=
              parseFloat(maxPrice.replace(/,/g, ""))
            : true) 
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

  // -------------------Google Map------------------------------
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  return (
    <>
    {/* ........................Filters....................... */}
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
              <li className="nav-item dropdown">
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
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={() => filterByLocation("Larkana")}
                    >
                      Larkana
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
                    className="dropdown-item dropdown-item-media"
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
                    className="dropdown-item dropdown-item-media"
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
                </div>
              </li>
              {/* ----------------------------------Map Button---------------------------------- */}
              <li className="nav-item">
                <div className="toggle-map-button nav-link" onClick={toggleMap}>
                  {showMap ? "Hide Map" : "Show Map"}
                </div>
              </li>
              {/* --------------------SEARCH BAR-------------------------------------- */}
              <li className="nav-item search-bar-container">
                <div className="search-barr">
                  <i className="fa-solid fa-location-dot fa-2xs icon-1"></i>
                  <input
                    type="text"
                    name="eingabe"
                    className="input-text-2 searchbarr"
                    placeholder="Search by City, Flat and Rooms"
                    onChange={searchHandle}
                  />
                </div>
              </li>
              {/* --------------------CLEAR FILTER------------------------------------ */}
              {isFiltered && (
                <li className="nav-item clear-filter-btn">
                  <Link
                    className="nav-link"
                    to="/Dashboard"
                    onClick={handleClear}
                  >
                    <i className="fa-regular fa-circle-xmark"></i> Clear Filter
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* ---------------------main dashboard.................. */}
      <div className="dashboard">
        <legend>dashboard</legend>
        <hr className="lakeer lakeer-media" />
        <div className="headinv"></div>
      </div>
      <br /> <br />
      <div className="main">
        <div className="grid-container">
          <div
            className={`grid-container ${
              showMap ? "grid-container-map-shown" : ""
            }`}
          >
            {productsToDisplay
              .filter((Product) => Product.booking.status !== "approved") 
              .map((Product) => (
                <div
                  key={Product._id}
                  className="card"
                  style={{ width: "20rem" }}
                >
                  <img
                    className="card-img-top image"
                    src={`http://localhost:4000/assets/${Product.file[0]}`}
                    alt={Product.altText || "Product Image"}
                  />
                  <div className="card-body" key={Product._id}>
                    <h5 className="card-title">{Product.title}</h5>
                    <h5 className="card-title">
                      <b>
                        {Product.area}, {Product.location}
                      </b>
                    </h5>
                    <p className="card-text">
                      {Product.propertyType.room || Product.propertyType.flat}
                    </p>
                    <p className="card-text">
                      <strong>Rent:</strong> Rs{" "}
                      {Product.pricing && Product.pricing.rent}
                      {/* {
                    <FormatPrice
                      price={Product.pricing && Product.pricing.rent}
                    />
                  } */}
                    </p>
                    <Link
                      to={`/product/${Product._id}`}
                      className="btn btn-primary btnSee btn-details-mdeia"
                    >
                      See Details
                    </Link>{" "}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {showMap && (
        <div className="map">
          <Map
            google={props.google}
            initialCenter={{ lat: 25.8943, lng: 68.5247 }}
            zoom={14}
          >
            {userLocation && <Marker position={userLocation} />}
          </Map>
        </div>
      )}
    </>
  );
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyC4Q15J0gP0wpLVzuqvG7GvMe4xBBQGptE",
})(Dashboard);
