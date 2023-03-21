import { useState } from "react";
import "./ChangeLocation.css";

// this component handles any changes the the postcode input.
// the props setPostcode
const ChangeLocation = ({ setPostcode }) => {
  // we create a newPostcode useState to store everytime the postcode changes.
  const [newPostcode, setNewPostcode] = useState("");

  // handles every time someone enters a new postcode.
  const handlePostcodeChange = (e) => {
    setNewPostcode(e.target.value);
  };

  // we button is clicked a new postcode value is set to the variable
  const handleBtn = () => {
    setPostcode(newPostcode);
  };

  // we return an input for getting postcode with an onChange handler that checks to see everytime postcode changes.
  // we also return a submit button with onClick handler everytime someone clicks the button to search a new postcode
  return (
    <div className="changeLocation">
      <input
        className="changeLocation__input"
        type="text"
        name="postcode"
        id="postcode"
        placeholder="Enter Postcode"
        value={newPostcode}
        onChange={handlePostcodeChange}
      />
      <button className="changeLocation__button" onClick={handleBtn}>
        Submit
      </button>
    </div>
  );
};
export default ChangeLocation;
