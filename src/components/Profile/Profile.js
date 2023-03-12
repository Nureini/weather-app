import "./Profile.css";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const Profile = ({ setIsMenuClicked, setIsProfileClicked }) => {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleButton = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    setIsProfileClicked(false);
    setIsMenuClicked(true);
  };

  return (
    <div className="profile">
      <CloseIcon
        className="profile__closeIcon"
        onClick={() => {
          setIsProfileClicked(false);
          setIsMenuClicked(true);
        }}
        fontSize="large"
      />
      <form className="form">
        <h1 className="form__title">Profile</h1>
        <div>
          <label htmlFor="username" className="form__label--username">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <button className="button" onClick={handleButton}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default Profile;
