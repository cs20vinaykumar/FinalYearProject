import React, { useState } from "react";
import "./Upload.css";
import { Link, useNavigate } from "react-router-dom";
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
import axios from "axios";

function Upload(props) {
  const [description, setText] = useState("");
  // const [Name, setname] = useState("");
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
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState([]);
  const [propertyType, setPropertyType] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const navigate = useNavigate();
  const [timeSlots, setTimeSlots] = useState([
    { date: "", startTime: "", endTime: "" },
  ]);
  // const [accountHolder, setAccountHolder] = useState("");
  // const [accountNumber, setAccountNumber] = useState("");
  // const [bank, setBank] = useState("");
  const [areas, setAreas] = useState([]);
  const [area, setArea] = useState("");

  const cityAreas = {
    Karachi: [
      "Clifton Block 8",
      "Clifton Block 9",
      "Clifton Block 5",
      "DHA Phase 1",
      "DHA Phase 5",
    ],
    Hyderabad: ["Area A", "Area B", "Area C"],
    Sukkur: ["Area X", "Area Y", "Area Z"],
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    setAreas(cityAreas[event.target.value]);
  };

  const handleAreaChange = (event) => {
    setArea(event.target.value);
  };

  const [accountDetails, setAccountDetails] = useState([
    { accountHolder: "", accountNumber: "", bank: "" },
  ]);
  const addAccount = () => {
    setAccountDetails([
      ...accountDetails,
      { accountHolder: "", accountNumber: "", bank: "" },
    ]);
  };

  const removeAccount = (index) => {
    const updatedAccounts = [...accountDetails];
    updatedAccounts.splice(index, 1);
    setAccountDetails(updatedAccounts);
  };

  const handleAccountChange = (index, field, value) => {
    const updatedAccounts = [...accountDetails];
    updatedAccounts[index][field] = value;
    setAccountDetails(updatedAccounts);
  };

  // const [contactOption, setContactOption] = useState("owner");

  // const validateCnic = (cnic) => {
  //   const cnicRegex = /^\d{13}$/;
  //   return cnicRegex.test(cnic);
  // };
  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
    setRoom("");
    setFlat("");
  };

  const handleAddTimeSlot = () => {
    const newTimeSlot = {
      date: "", // Initialize with an empty string or any default value
      startTime: "", // Initialize with an empty string or any default value
      endTime: "", // Initialize with an empty string or any default value
    };
    setTimeSlots([...timeSlots, newTimeSlot]);
  };

  const handleTimeSlotChange = (index, field, value) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index][field] = value;
    setTimeSlots(updatedTimeSlots);
  };

  const handleRemoveTimeSlot = (index) => {
    const updatedTimeSlots = timeSlots.filter((_, i) => i !== index);
    setTimeSlots(updatedTimeSlots);
  };

  // const handleContactOptionChange = (event) => {
  //   setContactOption(event.target.value);
  // };
  // const formattedFromDate = fromDate ? fromDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';
  // const formattedToDate = toDate ? toDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';
  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };

  const handleFileChange = (event) => {
    const newFiles = event.target.files;
    const updatedFiles = [...file];
    for (let i = 0; i < newFiles.length; i++) {
      updatedFiles.push(newFiles[i]);
    }
    setFile(updatedFiles);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Validation
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!location) {
      newErrors.location = "Location is required";
    }
    if (!(room || flat)) {
      newErrors.propertyType = "Select either Flat or Room";
    }
    if (!(availability === "Permanent" || availability === "Temporary")) {
      newErrors.availabilityType = "Select either Permanent or Temporary";
    }
    if (!deposite.trim()) {
      newErrors.deposite = "Deposite is required";
    }

    // if (!rent.trim()) {
    //   newErrors.rent = "Rent is required";
    // }

    // if (!Name.trim()) {
    //   newErrors.name = "Name is required";
    // }
    // if (!email.trim()) {
    //   newErrors.email = "Email is required";
    // }
    // if (!validateCnic(cnic)) {
    //   newErrors.cnic = "CNIC must be a 13-digit number";
    // }
    // if (!phoneNumber.trim()) {
    //   newErrors.phoneNumber = "Phone Number is required";
    // }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Prepare the data to be sent to the server
      // const formData = new FormData();

      const formData = new FormData();
      formData.append("title", title);
      formData.append("location", location);
      formData.append("area", area);
      formData.append("propertyType.flat", flat);
      formData.append("propertyType.room", room);
      formData.append("availability", availability);
      formData.append("dateRange.fromDate", fromDate);
      formData.append("dateRange.toDate", toDate);
      formData.append("pricing.deposite", deposite);
      formData.append("pricing.rent", rent);
      formData.append("amenities", amenities);
      formData.append("description", description);
      // formData.append("contactForm.name", Name);
      // formData.append("contactForm.email", email);
      // formData.append("contactForm.cnic", cnic);
      // formData.append("contactForm.phoneNumber", phoneNumber);
      formData.append("accountDetails", JSON.stringify(accountDetails));
      for (let i = 1; i < accountDetails.length; i++) {
        formData.append(
          `accountDetails[${i}].accountHolder`,
          accountDetails[i].accountHolder
        );
        formData.append(
          `accountDetails[${i}].accountNumber`,
          accountDetails[i].accountNumber
        );
        formData.append(`accountDetails[${i}].bank`, accountDetails[i].bank);
      }

      for (let i = 0; i < file.length; i++) {
        formData.append("file", file[i]);
      }
      formData.append("timeSlots", JSON.stringify(timeSlots));

      // Append time slots data
      timeSlots.forEach((slot, index) => {
        formData.append(`timeSlots[${index}].date`, slot.date);
        formData.append(`timeSlots[${index}].startTime`, slot.startTime);
        formData.append(`timeSlots[${index}].endTime`, slot.endTime);
      });
      console.log("Time Slots:", timeSlots);
      console.log("formData:", formData);

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:4000/PropertyForm",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Form submitted:", {
          title,
          location,
          area,
          flat,
          room,
          availability,
          fromDate,
          toDate,
          deposite,
          rent,
          amenities: [amenities],
          description,
          file,
          // Name,
          // email,
          // cnic,
          // phoneNumber,
        });
        alert("post Created  successfully:", response.data.message);
        navigate("/Dashboard");
        props.setTrigger(false);

        setErrors({});
      } else {
        alert("not");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ submissionError: "Unexpected Error" });
    }
  };

  const handlechange = (event) => {
    const inputValue = event.target.value;
    const filteredValue = inputValue
      .split("\n")
      .filter((line) => line.trim() !== "")
      .join("\n");
    setText(filteredValue);
  };

  // ------------------------------------------------------------------------------------
  const [furnished, setFurnished] = useState(false);
  const [kitchenAvailability, setKitchenAvailability] = useState(false);
  const [parkingAvailability, setParkingAvailability] = useState(false);
  const [waterGas, setWaterGas] = useState(false);
  const [Bed, setBed] = useState(false);
  const [Internet, setInternet] = useState(false);
  const [Air, setAir] = useState(false);
  const [Laundry, setLaundry] = useState(false);

  const amenities = [
    furnished ? "Furnished" : null,
    kitchenAvailability ? "Kitchen Availability" : null,
    parkingAvailability ? "Parking Availability" : null,
    waterGas ? "Electricity, Water Gas" : null,
    Bed ? "Bed" : null,
    Internet ? "Internet and Cable TV" : null,
    Air ? "Air Condition" : null,
    Laundry ? "Laundry facilities" : null,
  ].filter(Boolean);
  // -------------------------------------------------------------------------------------------
  return props.trigger ? (
    <div className="popup">
      <div
        className="popup-inner"
        style={{ maxHeight: "500px", overflowY: "auto" }}
      >
        <h2>Property Listing Form</h2>
        <form onSubmit={handleFormSubmit}>
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
            <span className="span-p">Building Name like Abc Apartment</span>
          </Box>
          <br />
          {/* --------------------Location------------------------- */}
          <div className="location">
            <h4>Location</h4>
            <span className="span-p">Select your city:</span>
            <br />
            <br />
            <div className="one">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Location</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={location}
                  label="Location"
                  onChange={handleLocationChange}
                  error={!!errors.location}
                  required
                >
                  <MenuItem value={"Karachi"}>Karachi</MenuItem>
                  <MenuItem value={"Hyderabad"}>Hyderabad</MenuItem>
                  <MenuItem value={"Sukkur"}>Sukkur</MenuItem>
                </Select>
              </FormControl>
            </div>
            {areas.length > 0 && (
              <div className="two">
                <FormControl fullWidth>
                  <InputLabel id="area-label">Area</InputLabel>
                  <Select
                    labelId="area-label"
                    id="area"
                    value={area}
                    onChange={handleAreaChange}
                  >
                    {areas.map((area, index) => (
                      <MenuItem key={index} value={area}>
                        {area}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}
            {errors.location && (
              <p style={{ color: "red" }}>{errors.location}</p>
            )}
          </div>
          <br /> <br />
          {/* --------------------Property Type------------------------- */}
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
                      onChange={(e) => setKitchenAvailability(e.target.checked)}
                    />
                  }
                  label="Kitchen Availability"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={parkingAvailability}
                      onChange={(e) => setParkingAvailability(e.target.checked)}
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
              <label for="exampleFormControlTextarea1">
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
            <input type="file" onChange={handleFileChange} multiple />
          </div>
          {file.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
          <br />
          <span className="span-p">Upload Pictures of your flat or room</span>
          <br />
          <br />
          {/* --------------------Contact form------------------------- */}
          {/* <div>
            <h4>Contact Form</h4>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="contact-option"
                name="contact-option"
                value={contactOption}
                onChange={handleContactOptionChange}
              >
                <div  className="head-contact">
                <FormControlLabel
                  value="assistant"
                  control={<Radio />}
                  label="I am the owner"
                  className="head-input"
                />
                <FormControlLabel
                  value="owner"
                  control={<Radio />}
                  label="My assistant will deal with the tenant"
                  className="head-input"
                />
             
                </div>
              </RadioGroup>
            </FormControl>

            {contactOption === "owner" && (
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                  <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <TextField
                label="Name"
                value={Name}
                onChange={(e) => setname(e.target.value)}
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
                type="Number"
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
              />
            </Box>
              </Box>
            )}
          </div> */}
          {/* --------------------Contact form------------------------- */}
          {/* <div>
            <h4>Contact Form</h4>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <TextField
                label="Name"
                value={Name}
                onChange={(e) => setname(e.target.value)}
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
                type="Number"
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
              />
            </Box>
          </div>
          <br /> */}
          <br />
          {/* ----------------------------------------------- */}
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
              </div>{" "}
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
                  type="text"
                  onChange={(e) =>
                    handleAccountChange(index, "accountHolder", e.target.value)
                  }
                  error={!!errors.accountHolder}
                  helperText={errors.accountHolder}
                />{" "}
                <br />
                <TextField
                  label="Account Number"
                  value={account.accountNumber}
                  type="number"
                  onChange={(e) =>
                    handleAccountChange(index, "accountNumber", e.target.value)
                  }
                  error={!!errors.accountNumber}
                  helperText={errors.accountNumber}
                />{" "}
                <br />
                <Select
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
                {accountDetails.length > 1 && (
                  <IconButton onClick={() => removeAccount(index)}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            ))}{" "}
            <br />
            <Button variant="contained" color="primary" onClick={addAccount}>
              Add Account
            </Button>
          </div>
          <br />
          {/* ------------------------------------------------------------------- */}
          <br />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          <Link to="/Dashboard">
            <button
              className="close-btn btn btn-success upload-btn-media"
              onClick={() => props.setTrigger(false)}
            >
              Close
            </button>
          </Link>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Upload;
