import "./Profile.css";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

// gets props setIsMenuClicked and setIsProfileClicked function
const Profile = ({ setIsMenuClicked, setIsProfileClicked }) => {
  // profile page checks to see if username is currently stored in localStorage, if so it will get that username, otherwise the username variable will be set to empty.
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  // handles the users input for username whenever they change it.
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // this button is used to save the users username in localStorage.
  const handleButton = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    // ensures that after button is clicked profile page is exited
    setIsProfileClicked(false);
    // ensures that we return back to menu page
    setIsMenuClicked(true);
  };

  // returns CloseIcon for profile page
  // returns the username input form
  // returns the submit button for saving any new username entered.
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
