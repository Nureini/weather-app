import "./Header.css";
import MenuIcon from "@mui/icons-material/Menu";

// accepts the prop setIsMenuClicked -> checks to see if menu is clicked or not
const Header = ({ setIsMenuClicked }) => {
  // if menu is clicked it will call the prop and send it to true, we call this function inside of the onClick handler of the MenuIcon.
  const handleMenuIcon = () => {
    setIsMenuClicked(true);
  };

  // return the header with the MenuIcon inside of it.
  return (
    <div className="header">
      <MenuIcon
        fontSize="large"
        className="menuIcon"
        onClick={handleMenuIcon}
      />
    </div>
  );
};

export default Header;
