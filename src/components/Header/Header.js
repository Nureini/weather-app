import "./Header.css";
import MenuIcon from "@mui/icons-material/Menu";

const Header = ({ setIsMenuClicked }) => {
  const handleMenuIcon = () => {
    setIsMenuClicked(true);
  };

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
