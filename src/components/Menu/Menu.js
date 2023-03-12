import "./Menu.css";
import CloseIcon from "@mui/icons-material/Close";

const Menu = ({ setIsMenuClicked, setIsProfileClicked }) => {
  const handleProfileClick = () => {
    setIsProfileClicked(true);
    setIsMenuClicked(false);
  };

  const handleButton = () => {
    localStorage.clear();
    setIsMenuClicked(false);
  };

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
        <button className="menu__button" onClick={handleButton}>
          Reset Account
        </button>
      </div>
    </div>
  );
};

export default Menu;
