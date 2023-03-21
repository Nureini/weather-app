import "./Menu.css";
import CloseIcon from "@mui/icons-material/Close";

// The menu component -> contains the props setIsMenuClicked and setIsProfileClicked.
const Menu = ({
  setIsMenuClicked,
  setIsProfileClicked,
  setIsCalorieTrackerClicked,
}) => {
  // if profile is clicked it will have setIsProfileClicked to true and also setIsMenuClicked to false. So this way we can display the Profile section and hide the menu section.
  const handleProfileClick = () => {
    setIsProfileClicked(true);
    setIsMenuClicked(false);
  };

  // if calories tracker is clicked it will have setIsCalorieTrackerClicked to true and also setIsMenuClicked to false. So this way we can display the Calorie Tracker section and hide the menu section.
  const handleCaloriesClick = () => {
    setIsCalorieTrackerClicked(true);
    setIsMenuClicked(false);
  };

  // this resets the users profile, we store the users username in localstorage, so if user clicks reset button then their username will be reset and not display on the default page. and setIsMenuClicked will become false so it can also leave the menu page and go back to the default page.
  const handleResetBtn = () => {
    localStorage.clear();
    setIsMenuClicked(false);
  };

  // we return the closeIcon -> this closes the menu page
  // we also return the Profile Navigation and also the reset button.
  return (
    <div className="menu">
      <CloseIcon
        className="menu__closeIcon"
        onClick={() => setIsMenuClicked(false)}
        fontSize="large"
      />
      <div>
        <p className="menu__profile" onClick={handleProfileClick}>
          Profile
        </p>
        <p className="menu__calories" onClick={handleCaloriesClick}>
          Track Calories Burned
        </p>
        <button className="menu__button" onClick={handleResetBtn}>
          Reset Account
        </button>
      </div>
    </div>
  );
};

export default Menu;
