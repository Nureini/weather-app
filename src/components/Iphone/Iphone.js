import { useEffect, useState } from "react";
import CalorieTracker from "../CalorieTracker/CalorieTracker";
import ChangeLocation from "../ChangeLocation/ChangeLocation";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Profile from "../Profile/Profile";
import Weather from "../Weather/Weather";
import "./Iphone.css";

const Iphone = () => {
  // used to store values of latitude and longitude in an object
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });

  // used to store values of city, country, postcode in an object
  const [address, setAddress] = useState({
    city: "",
    country: "",
    postcode: "",
  });

  // stores postcode value
  const [postcode, setPostcode] = useState("");

  // if user has chosen to share there location by default instead of manually inputting it, shareLocation will be set to true otherwise it will be false. Also once we get a users location when they input postcode shareLocation will also be set to true
  const [shareLocation, setShareLocation] = useState(false);

  // used to store whether the menu is clicked -> the one that accesses profile or resets account.
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  // if user has clicked on their profile settings
  const [isProfileClicked, setIsProfileClicked] = useState(false);

  // if user has clicked on calorie tracker
  const [isCalorieTrackerClicked, setIsCalorieTrackerClicked] = useState(false);

  // checks to see if user has given a valid postcode
  const [isPostcodeInvalid, setIsPostcodeInvalid] = useState(false);

  // useEffect only runs when page is first loaded or on refresh,
  // it also runs when the postcode value changes, so if user inputs a different postcode everytime they do this the useEffect will run again.
  useEffect(() => {
    // getLocationData -> we create this function inside of useEffect so we can make it async and we can allow any bits of code we want to wait for it to finish before executing any other lines of code
    const getLocationData = async () => {
      let locationData = null;

      // if a user has given a postcode , this if statement will run.
      if (postcode) {
        // we use openstreetmap api to get the latitude and longitude of the users location when they give a postcode.
        const getDetails = await fetch(
          `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${postcode}&countrycodes=gb`
        );

        // processes the fetch response and converts data to json.
        const getDetailsData = await getDetails.json();

        // if invalid postcode is given
        if (getDetailsData.length === 0) {
          // sets invalid postcode to true
          setIsPostcodeInvalid(true);
          console.log("Invalid Postcode");
          // return statement allows us to exist from useEffect function if postcode is invalid
          return;
        }

        // stores latitude and longitude in the locationData variable as an object
        locationData = {
          latitude: getDetailsData[0].lat,
          longitude: getDetailsData[0].lon,
        };
      } else {
        // when site is first loaded up, postcode will not have been entered so the useEffect will skip the first if statement and come to this else statement.

        // we check to see if user has permissions in their settings already set to share location.
        const permissionStatus = await navigator.permissions.query({
          name: "geolocation",
        });

        // if user has permissions in their settings already set to share location, then the app will be able to extract their latitude and longitude.
        if (permissionStatus.state === "granted") {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, (error) => {
              reject(error);
            });
          });

          // sets latitude and longitude
          locationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
        } else {
          // if user hasn't set share location permissions to share in their settings, the useEffect will just exist so when user first loads site no weather information will display.
          return;
        }
      }

      // we then check to see if the variable we declared as null at the start of the function now contains any data inside of it.
      if (locationData) {
        // if locationData e
        setLocation(locationData);

        // openstreetmap API which gets users city, country and postcode using their latitude and longitude.
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${locationData.latitude}&lon=${locationData.longitude}`
        );

        // turn the data we get from openstreetmap API to json
        const data = await response.json();

        // store the data inside of an object, in the state "address" we created.
        setAddress({
          city: data.address.city,
          country: data.address.country,
          postcode: data.address.postcode,
        });

        // once we have the users location, the shareLocation state is true.
        setShareLocation(true);
      }
    };

    // we call the function to run it inside of useEffect here.
    getLocationData();
  }, [postcode]);

  // we create this variable displayContent so depending on what the if statement is that is content we want to store inside of displayContent variable.
  let displayContent;
  if (!isProfileClicked && !isMenuClicked && !isCalorieTrackerClicked) {
    // if neither profile or menu is clicked then the default weather page will be displayed
    displayContent = (
      <>
        <Header setIsMenuClicked={setIsMenuClicked} />
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
    // if menu is clicked then the menu page will be displayed
    displayContent = (
      <Menu
        setIsMenuClicked={setIsMenuClicked}
        setIsProfileClicked={setIsProfileClicked}
        setIsCalorieTrackerClicked={setIsCalorieTrackerClicked}
      />
    );
  } else if (isProfileClicked) {
    // if profile is clicked then the profile page will be displayed
    displayContent = (
      <Profile
        setIsMenuClicked={setIsMenuClicked}
        setIsProfileClicked={setIsProfileClicked}
      />
    );
  } else if (isCalorieTrackerClicked) {
    // if calorie Tracker is clicked then the calorie tracker page will be displayed
    displayContent = (
      <CalorieTracker
        setIsMenuClicked={setIsMenuClicked}
        setIsCalorieTrackerClicked={setIsCalorieTrackerClicked}
      />
    );
  }

  // we then return the displayContent variable, which is what will be shown on the screen.
  return <div className="app--iphone">{displayContent}</div>;
};
export default Iphone;
