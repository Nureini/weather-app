import { useState } from "react";
import "./ChangeLocation.css";

const ChangeLocation = ({ setPostcode }) => {
  const [newPostcode, setNewPostcode] = useState("");

  const handlePostcodeChange = (e) => {
    setNewPostcode(e.target.value);
  };

  const handleBtn = () => {
    setPostcode(newPostcode);
  };

  return (
    <div className="changeLocation" onClick={handleBtn}>
      <input
        className="changeLocation__input"
        type="text"
        name="postcode"
        id="postcode"
        placeholder="Enter Postcode"
        value={newPostcode}
        onChange={handlePostcodeChange}
      />
      <button className="changeLocation__button">Submit</button>
    </div>
  );
};
export default ChangeLocation;
