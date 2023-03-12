import { useEffect, useState } from "react";
import ChangeLocation from "../ChangeLocation/ChangeLocation";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Profile from "../Profile/Profile";

import Weather from "../Weather/Weather";
import "./Iphone.css";

const Iphone = () => {
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });
  const [address, setAddress] = useState({
    city: "",
    country: "",
    postcode: "",
  });
  const [postcode, setPostcode] = useState("");
  const [shareLocation, setShareLocation] = useState(false);
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const [isAddIconClicked, setIsAddIconClicked] = useState(false);
  const [isPostcodeInvalid, setIsPostcodeInvalid] = useState(false);

  useEffect(() => {
    const getLocationData = async () => {
      let locationData = null;

      if (postcode) {
        const getDetails = await fetch(
          `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${postcode}&countrycodes=gb`
        );

        const getDetailsData = await getDetails.json();
        // if invalid postcode is given
        if (getDetailsData.length === 0) {
          setIsPostcodeInvalid(true);
          console.log("Invalid Postcode");
          return;
        }

        locationData = {
          latitude: getDetailsData[0].lat,
          longitude: getDetailsData[0].lon,
        };
      } else {
        const permissionStatus = await navigator.permissions.query({
          name: "geolocation",
        });

        if (permissionStatus.state === "granted") {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, (error) => {
              reject(error);
            });
          });

          locationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
        } else {
          return;
        }
      }

      if (locationData) {
        setLocation(locationData);

        // API which gets users location using latitude and longitude
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${locationData.latitude}&lon=${locationData.longitude}`
        );
        const data = await response.json();

        setAddress({
          city: data.address.city,
          country: data.address.country,
          postcode: data.address.postcode,
        });

        setShareLocation(true);
      }
    };

    getLocationData();
  }, [postcode]);

  let displayContent;
  if (!isProfileClicked && !isMenuClicked && !isAddIconClicked) {
    displayContent = (
      <>
        <Header
          setIsMenuClicked={setIsMenuClicked}
          setIsAddIconClicked={setIsAddIconClicked}
        />
        {isPostcodeInvalid && <p className="err">INVALID POSTCODE</p>}
        <ChangeLocation setPostcode={setPostcode} />
        {
          <Weather
            address={address}
            location={location}
            shareLocation={shareLocation}
          />
        }
      </>
    );
  } else if (isMenuClicked) {
    displayContent = (
      <Menu
        setIsMenuClicked={setIsMenuClicked}
        setIsProfileClicked={setIsProfileClicked}
      />
    );
  } else if (isProfileClicked) {
    displayContent = (
      <Profile
        setIsMenuClicked={setIsMenuClicked}
        setIsProfileClicked={setIsProfileClicked}
      />
    );
  }

  return <div className="app--iphone">{displayContent}</div>;
};
export default Iphone;
