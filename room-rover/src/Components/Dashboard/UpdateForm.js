import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const UpdateForm = () => {
  const [description, setDescription] = useState("");
  // const [Name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [cnic, setCnic] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [room, setRoom] = useState("");
  const [flat, setFlat] = useState("");
  const [availability, setAvailability] = useState("");
  const [deposite, setDeposite] = useState("");
  const [rent, setRent] = useState("");
  const [errors] = useState({});
  const [file, setFile] = useState();
  const [propertyType, setPropertyType] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [furnished, setFurnished] = useState(false);
  const [kitchenAvailability, setKitchenAvailability] = useState(false);
  const [parkingAvailability, setParkingAvailability] = useState(false);
  const [waterGas, setWaterGas] = useState(false);
  const [Bed, setBed] = useState(false);
  const [Internet, setInternet] = useState(false);
  const [Air, setAir] = useState(false);
  const [Laundry, setLaundry] = useState(false);
  const [accountDetails, setAccountDetails] = useState([]);

  const [timeSlots, setTimeSlots] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  const getProductDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/UpdatePropertyForm/product/${params.id}`
      );
      const result = await response.json();
      setTitle(result.title);
      setLocation(result.location);
      setPropertyType(result.propertyType.room ? "room" : "flat");
      setAvailability(result.availability);
      setFromDate(result.dateRange.fromDate);
      setToDate(result.dateRange.toDate);
      setDeposite(result.pricing.deposite);
      setRent(result.pricing.rent);
      setDescription(result.description);
      setFile(result.file);
      // setName(result.contactForm.name);
      // setEmail(result.contactForm.email);
      // setCnic(result.contactForm.cnic);
      // setPhoneNumber(result.contactForm.phoneNumber);
      setRoom(result.propertyType.room);
      setFlat(result.propertyType.flat);
      setAccountDetails(result.accountDetails);
      setTimeSlots(result.timeSlots);
    } catch (error) {
      console.error("Error:", error.message);
      alert("Failed to fetch product details.");
    }
  };

  useEffect(() => {
    getProductDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePropertyTypeChange = (event) => {
    const selectedPropertyType = event.target.value;
    setPropertyType(selectedPropertyType);
    if (selectedPropertyType === "flat") {
      setRoom("");
    } else if (selectedPropertyType === "room") {
      setFlat("");
    }
  };

  const handlechange = (event) => {
    const inputValue = event.target.value;
    const filteredValue = inputValue
      .split("\n")
      .filter((line) => line.trim() !== "")
      .join("\n");
    setDescription(filteredValue);
  };

  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };

  const handleTimeSlotChange = (index, field, value) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index][field] = value;
    setTimeSlots(updatedTimeSlots);
  };

  const handleAddTimeSlot = () => {
    const newTimeSlot = {
      date: "", // Initialize with an empty string or any default value
      startTime: "", // Initialize with an empty string or any default value
      endTime: "", // Initialize with an empty string or any default value
    };
    setTimeSlots([...timeSlots, newTimeSlot]);
  };

  const handleRemoveTimeSlot = (index) => {
    const updatedTimeSlots = timeSlots.filter((_, i) => i !== index);
    setTimeSlots(updatedTimeSlots);
  };

  const handleAccountChange = (index, field, value) => {
    const updatedAccounts = [...accountDetails];
    updatedAccounts[index][field] = value;
    setAccountDetails(updatedAccounts);
  };

  // Define the addAccount function
  const addAccount = (newAccount) => {
    setAccountDetails([...accountDetails, newAccount]);
  };

  // Define the removeAccount function
  const removeAccount = (index) => {
    const updatedAccounts = [...accountDetails];
    updatedAccounts.splice(index, 1);
    setAccountDetails(updatedAccounts);
  };

  const UpdateFormSubmit = async () => {
    try {
      const result = await fetch(
        `http://localhost:4000/UpdatePropertyForm/product/${params.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            title,
            location,
            propertyType: {
              room,
              flat,
            },
            availability,
            dateRange: {
              fromDate,
              toDate,
            },
            pricing: {
              rent,
              deposite,
            },
            description,
            // Name,
            // email,
            // phoneNumber,
            // cnic,
            file,
            accountDetails,
            timeSlots,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (result.ok) {
        alert("Form Updated Successfully");
        navigate("/Post");
      } else {
        throw new Error("Failed to update form. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Failed to update form. Please try again.");
    }
  };

  return (
    <div>
      <div className="popup">
        <div
          className="popup-inner"
          style={{ maxHeight: "500px", overflowY: "auto" }}
        >
          <h2>Update Form</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              UpdateFormSubmit();
            }}
          >
            <br />
            {/* --------------------Title------------------------- */}
            <Box
              sx={{
                width: 400,
                maxWidth: "100%",
              }}
            >
              <TextField
                fullWidth
                label="Title"
                id="fullWidth"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={!!errors.title}
                helperText={errors.title}
                required
              />
              <span className="span-p">
                Building Name like Abc Apartment Block / Phase 1
              </span>
            </Box>
            <br />
            {/* --------------------Location------------------------- */}
            <div className="location">
              <div className="one">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" required>
                    Location
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={location}
                    label="Location"
                    onChange={(e) => setLocation(e.target.value)}
                    error={!!errors.location}
                    required
                  >
                    <MenuItem value={"Karachi"}>Karachi</MenuItem>
                    <MenuItem value={"Hyderabad"}>Hyderabad</MenuItem>
                    <MenuItem value={"Sukkur"}>Sukkur</MenuItem>
                  </Select>
                  {errors.location && (
                    <p style={{ color: "red" }}>{errors.location}</p>
                  )}
                </FormControl>
              </div>
            </div>
            <br /> <br />
            {/* --------------------Property Type------------------------- */}
            <div className="property-type">
              <h4>Property Type</h4>
              <span className="span-p">
                List your available flat or room for rent:
              </span>
              <br /> <br />
              <div className="one">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Property Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={propertyType}
                    label="Property Type"
                    onChange={handlePropertyTypeChange}
                    error={!!errors.propertyType}
                    required
                  >
                    <MenuItem value={"flat"}>Flat</MenuItem>
                    <MenuItem value={"room"}>Room</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {/* Render specific fields based on property type */}
              {propertyType === "flat" && (
                <div className="one">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Flat</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={flat}
                      label="Flat"
                      onChange={(e) => setFlat(e.target.value)}
                    >
                      <MenuItem value={"2 Bed Drawing"}>2 Bed Drawing</MenuItem>
                      <MenuItem value={"3 Bed Drawing"}>3 Bed Drawing</MenuItem>
                      <MenuItem value={"4 Bed Drawing"}>4 Bed Drawing</MenuItem>
                      <MenuItem value={"Pent House"}>Pent House</MenuItem>
                      <MenuItem value={"Studio Apartment"}>
                        Studio Apartment
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
              )}
              {propertyType === "room" && (
                <div className="two">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Room</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={room}
                      label="Room"
                      onChange={(e) => setRoom(e.target.value)}
                    >
                      <MenuItem value={"Single Room"}>Single Room</MenuItem>
                      <MenuItem value={"Shared Room"}>Shared Room</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              )}
              {errors.propertyType && (
                <p style={{ color: "red" }}>{errors.propertyType}</p>
              )}
            </div>
            <br /> <br />
            {/* --------------------Availablity------------------------- */}
            <div className="time">
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  <h4>Availability</h4>
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  error={!!errors.availabilityType}
                >
                  <FormControlLabel
                    value="Permanent"
                    control={<Radio />}
                    label="Permanent "
                  />
                  <FormControlLabel
                    value="Temporary"
                    control={<Radio />}
                    label="Temporary"
                  />
                </RadioGroup>
                {errors.availabilityType && (
                  <p style={{ color: "red" }}>{errors.availabilityType}</p>
                )}
              </FormControl>
            </div>
            <br />
            {/* --------------------Date Range------------------------- */}
            <div className="date-range-picker">
              <label htmlFor="fromDate">From Date:</label>
              <input
                type="date"
                id="fromDate"
                value={fromDate}
                onChange={(e) => handleFromDateChange(e.target.value)}
              />
              <br />
              <label htmlFor="toDate">To Date:</label>
              <input
                type="date"
                id="toDate"
                value={toDate}
                onChange={(e) => handleToDateChange(e.target.value)}
              />
            </div>
            <br />
            <br />
            {/* --------------------Pricing------------------------- */}
            <div className="pricing">
              <h4>Security Deposit And Monthly Rent in PKR</h4> <br />
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-controlled"
                  label="Deposite"
                  type="number"
                  value={deposite}
                  onChange={(event) => setDeposite(event.target.value)}
                  error={!!errors.deposite}
                  helperText={errors.deposite}
                  required
                />

                <TextField
                  id="outlined-uncontrolled"
                  label="Rent"
                  type="text"
                  value={rent.toLocaleString("en-PK")}
                  onChange={(event) => {
                    const enteredValue = event.target.value.replace(/,/g, ""); // Remove existing commas
                    const formattedValue =
                      parseFloat(enteredValue).toLocaleString("en-PK");
                    setRent(formattedValue);
                  }}
                  error={!!errors.rent}
                  helperText={errors.rent}
                  required
                />
              </Box>
            </div>
            <br />
            <br />
            {/* --------------------Amenities------------------------- */}
            <div className="Amenities">
              <h4>Utilities And Amenities</h4> <br />
              <div className="Utilities">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={furnished}
                        onChange={(e) => setFurnished(e.target.checked)}
                      />
                    }
                    label="Furnished"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={kitchenAvailability}
                        onChange={(e) =>
                          setKitchenAvailability(e.target.checked)
                        }
                      />
                    }
                    label="Kitchen Availability"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={parkingAvailability}
                        onChange={(e) =>
                          setParkingAvailability(e.target.checked)
                        }
                      />
                    }
                    label="Parking Availability"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={waterGas}
                        onChange={(e) => setWaterGas(e.target.checked)}
                      />
                    }
                    label="Electricity, Water Gas"
                  />
                </FormGroup>
              </div>
              <div className="Amenities">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Bed}
                        onChange={(e) => setBed(e.target.checked)}
                      />
                    }
                    label="Bed"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Internet}
                        onChange={(e) => setInternet(e.target.checked)}
                      />
                    }
                    label="Internet and Cable TV"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Air}
                        onChange={(e) => setAir(e.target.checked)}
                      />
                    }
                    label="Air Condition"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Laundry}
                        onChange={(e) => setLaundry(e.target.checked)}
                      />
                    }
                    label="Laundry facilities"
                  />
                </FormGroup>
              </div>
            </div>
            <br />
            <br />
            {/* --------------------Description------------------------- */}
            <div className="description">
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">
                  {" "}
                  <h5> Add Description</h5>
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  value={description}
                  onChange={handlechange}
                  required
                ></textarea>
              </div>
              <p>
                {
                  description.split(" ").filter((element) => {
                    return element !== 0;
                  }).length
                }{" "}
                words and {description.length} character
              </p>
            </div>
            {/* --------------------Upload Pictures------------------------- */}
            <div>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <br />
            <span className="span-p">Upload Pictures of your flat or room</span>
            <br />
            <br />
            {/* --------------------Account Details------------------------- */}
            {/* --------------------Account Details------------------------- */}
            <div>
              <h4>Account Details</h4>
              {accountDetails.map((account, index) => (
                <Box
                  key={index}
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <TextField
                    label="Account Holder"
                    value={account.accountHolder}
                    onChange={(e) =>
                      handleAccountChange(
                        index,
                        "accountHolder",
                        e.target.value
                      )
                    }
                    error={!!errors.accountHolder}
                    helperText={errors.accountHolder}
                  />
                  <TextField
                    label="Account Number"
                    value={account.accountNumber}
                    onChange={(e) =>
                      handleAccountChange(
                        index,
                        "accountNumber",
                        e.target.value
                      )
                    }
                    error={!!errors.accountNumber}
                    helperText={errors.accountNumber}
                  />
                  <FormControl fullWidth>
                    <InputLabel id={`bank-label-${index}`}>Bank</InputLabel>
                    <Select
                      labelId={`bank-label-${index}`}
                      value={account.bank}
                      onChange={(e) =>
                        handleAccountChange(index, "bank", e.target.value)
                      }
                      error={!!errors.bank}
                      required
                    >
                      <MenuItem value="">Select Bank</MenuItem>
                      <MenuItem value={"Bank Alhabib"}>Bank Al habib</MenuItem>
                      <MenuItem value={"Easypaisa"}>Easypaisa</MenuItem>
                      <MenuItem value={"JazzCash"}>JazzCash</MenuItem>
                      <MenuItem value={"HBL"}>HBL</MenuItem>
                    </Select>
                  </FormControl>
                  {accountDetails.length > 1 && (
                    <IconButton onClick={() => removeAccount(index)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              ))}
              <Button variant="contained" color="primary" onClick={addAccount}>
                Add Account
              </Button>
            </div>
            <br />
            <br />
            {/* --------------------Time Slots------------------------- */}
            <h4>Time Slots</h4>
            {/* --------------------Available Time Slots------------------------- */}
            <div className="time-slots">
              <h4>Available Time Slots</h4>
              <span>
                Select your available time slots for property visits. Add or
                remove slots as needed
              </span>
            </div>
            {timeSlots.map((timeSlot, index) => (
              <div key={index} className="time-slot">
                <div className="time-slot-fields">
                  <div className="field">
                    <label>Date for Slot {index + 1}</label>
                    <TextField
                      type="date"
                      value={timeSlot.date}
                      onChange={(e) =>
                        handleTimeSlotChange(index, "date", e.target.value)
                      }
                      className="time-slot-field"
                    />
                  </div>
                  <div className="field">
                    <label>Start Time for Slot {index + 1}</label>
                    <TextField
                      type="time"
                      value={timeSlot.startTime}
                      onChange={(e) =>
                        handleTimeSlotChange(index, "startTime", e.target.value)
                      }
                      className="time-slot-field"
                    />
                  </div>
                  <div className="field">
                    <label>End Time for Slot {index + 1}</label>
                    <TextField
                      type="time"
                      value={timeSlot.endTime}
                      onChange={(e) =>
                        handleTimeSlotChange(index, "endTime", e.target.value)
                      }
                      className="time-slot-field"
                    />
                  </div>
                </div>
                <br />
                <Button
                  onClick={handleAddTimeSlot}
                  variant="contained"
                  color="primary"
                  className="time-slot-button"
                >
                  Add Time Slot
                </Button>{" "}
                <br />
                {timeSlots.length > 1 && (
                  <Button
                    onClick={() => handleRemoveTimeSlot(index)}
                    variant="contained"
                    color="secondary"
                    className="time-slot-button"
                  >
                    Remove Time Slot
                  </Button>
                )}
              </div>
            ))}
            <br />
            <br />
            {/* --------------------Contact form------------------------- */}
            {/* <h4>Contact Form</h4>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <TextField
                label="Name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
              />
              <br />
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
              <br />
              <TextField
                type="Number"
                label="CNIC (13-digit number)"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                error={!!errors.cnic}
                helperText={errors.cnic}
              />
              <br />
              <TextField
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
              />
            </Box> */}
            <br />
            <Button
              type="submit"
              variant="contained"
              onSubmit={UpdateFormSubmit}
              color="primary"
            >
              Update Form
            </Button>
            <Link to="/Post">
              <button className="close-btn btn btn-success">Close</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
