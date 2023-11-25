import React, { useState } from "react";
import "./Upload.css";

function Upload(props) {
  const [showInput, setShowInputs] = useState(false);

  const handleRoomClick = () => {
    setShowInputs(true);
  };

  const handleFlatClick = () => {
    setShowInputs(false);
  };

  return props.trigger ? (
    <div className="popup">
      <div
        className="popup-inner"
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        <button
          className="close-btn btn btn-success"
          onClick={() => props.setTrigger(false)}
        >
          Close
        </button>
        <h1>vinay</h1>
        <p>hey this is my props</p>
        <input
          type="checkbox"
          className="btn-check"
          id="btn-check-outlined"
          autocomplete="off"
        />
        <input
          type="radio"
          className="btn-check"
          name="options"
          id="option1"
          autocomplete="off"
          checked
          onClick={handleFlatClick}
        />
        <label className="btn btn-success mx-3" for="option1">
          Flat
        </label>
        <input
          type="radio"
          className="btn-check"
          name="options"
          id="option2"
          autocomplete="off"
          onClick={handleRoomClick}
        />
        <label className="btn btn-primary my-4" for="option2">
          Room
        </label>{" "}
        <br />
        {showInput && (
          <>
            <input
              type="radio"
              className="btn-check"
              name="options"
              id="option3"
              autocomplete="off"
            />
            <label className="btn btn-dark mx-3" for="option3">
              Single room
            </label>

            <input
              type="radio"
              className="btn-check"
              name="options"
              id="option4"
              autocomplete="off"
            />
            <label className="btn btn-success" for="option4">
              Shared Room
            </label>
          </>
        )}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Upload;
