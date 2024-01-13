import React, { useState } from "react";
import "./Upload.css";
import { Link } from "react-router-dom";
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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import axios from "axios";

function Upload(props) {
  const [description, setText] = useState("");
  const [Name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [cnic, setCnic] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [room, setRoom] = useState("");
  const [flat, setFlat] = useState("");
  const [availability, setAvailability] = useState("");
  const [deposite, setDeposite] = useState("");
  const [rent, setRent] = useState("");
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState();
  const [propertyType, setPropertyType] = useState("");

  const validateCnic = (cnic) => {
    // Validate if CNIC is a 13-digit number
    const cnicRegex = /^\d{13}$/;
    return cnicRegex.test(cnic);
  };
  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
    // Clear values of room and flat when propertyType changes
    setRoom("");
    setFlat("");
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

    if (!rent.trim()) {
      newErrors.rent = "Rent is required";
    }

    if (!Name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!validateCnic(cnic)) {
      newErrors.cnic = "CNIC must be a 13-digit number";
    }
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required";
    }

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
      formData.append("propertyType.flat", flat);
      formData.append("propertyType.room", room);
      formData.append("availability", availability);
      formData.append("dateRange.start", Date());
      formData.append("dateRange.end", Date());
      formData.append("pricing.deposite", deposite);
      formData.append("pricing.rent", rent);
      formData.append("amenities", amenities);
      formData.append("description", description);
      formData.append("contactForm.name", Name);
      formData.append("contactForm.email", email);
      formData.append("contactForm.cnic", cnic);
      formData.append("contactForm.phoneNumber", phoneNumber);
      formData.append("file", file);
      console.log("formData:", formData);

      const response = await axios.post(
        "http://localhost:4000/PropertyForm",
        formData
      );

      if (response.status === 200) {
        console.log("Form submitted:", {
          title,
          location,
          flat,
          room,
          availability: [availability],
          start: Date(),
          end: Date(),
          deposite,
          rent,
          amenities: [amenities],
          description,
          file,
          Name,
          email,
          cnic,
          phoneNumber,
        });
        alert("Form submitted successfully:", response.data.message);

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
          <div className="date-range">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateRangePicker"]}>
                <DateRangePicker
                  className="datePicker"
                  localeText={{ start: "From", end: "To" }}
                />
              </DemoContainer>
            </LocalizationProvider>
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
                type="number"
                value={rent}
                onChange={(event) => setRent(event.target.value)}
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
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <br />
          <span className="span-p">Upload Pictures of your flat or room</span>
          <br />
          <br />
          {/* --------------------Contact form------------------------- */}
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
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
            />
          </Box>
          <br />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          <Link to="/Dashboard">
            <button
              className="close-btn btn btn-success"
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
