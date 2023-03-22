import "./Weather.css";
import Today from "../Date/Today";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import React, { useEffect, useState } from "react";

import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import ThunderstormOutlinedIcon from "@mui/icons-material/ThunderstormOutlined";

// gets props address, location, shareLocation
const Weather = ({ address, location, shareLocation }) => {
  // stores the weather data for the weather that is happening at this exact time (basically right now)
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  // stores the weather data for the weather that is happening later one (all the upcoming weather forecasts)
  const [weatherData, setWeatherData] = useState(null);
  // stores the uvIndex of the weather
  const [uvIndex, setUvIndex] = useState(null);
  // checks to see if username is stored in localStorage, otherwise username is set to empty.
  const [username] = useState(localStorage.getItem("username") || "");

  // useEffect funtion once the page is first loaded/ on refresh and also everytime the location value changes
  useEffect(() => {
    // getData -> we create this async function inside of useEffect so we can have the function wait to complete any processes we want before moving onto the next. This helps alot for when fetching data and converting data to json. we dont want the code to crash so we have it wait when doing these processes.
    const getData = async () => {
      if (location?.latitude && location?.longitude) {
        // Gets the weather of right now
        const getCurrentWeatherDataResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?appid=4828ffdbecf5266bb65d79765d588e86&lat=${location.latitude}&lon=${location.longitude}`
        );
        // gets uvIndex of right now
        const getUvIndex = await fetch(
          `https://api.openweathermap.org/data/2.5/uvi?lat=${location.latitude}&lon=${location.longitude}&appid=4828ffdbecf5266bb65d79765d588e86`
        );

        // get the uvIndex data converts it to json and store it in the uvIndex state variable
        const getUvIndexResponse = await getUvIndex.json();
        setUvIndex(getUvIndexResponse.value);

        // gets current weather data converts it to json and stores it in currentWeatherData state variable.
        const getCurrentWeatherData =
          await getCurrentWeatherDataResponse.json();
        setCurrentWeatherData(getCurrentWeatherData);

        // gets the weather for every 3 hours -> this api call gets the upcoming weather forecasts. because we are using the free api we are only able to get the weather data that occurs every 3 hours for 5 days.
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?appid=4828ffdbecf5266bb65d79765d588e86&lat=${location.latitude}&lon=${location.longitude}`
        );

        // we convert the fetched data to json and store it in the weatherData state variable
        const data = await res.json();
        setWeatherData(data);
      }
    };
    getData();
  }, [location]);

  // if no location is shared we display a message asking user to provide their location
  if (!shareLocation) {
    return (
      <div>
        <h1>We are unable to provide any information.</h1>
        <p>
          If you want us to provide any weather data, please share your location
          and try again!
        </p>
      </div>
    );
  }

  // if we havent finished fetching data and storing it in the variables then we display a loading message
  if (!currentWeatherData && !weatherData) {
    return <h1>Loading...</h1>;
  }

  // if we do have weather data we run this if statement.
  if (weatherData) {
    // using the API we found that those are the weather names stored so in this object here we have stored all the different icons we want when that type of weather occurs
    const weatherDisplay = {
      Clear: <WbSunnyOutlinedIcon className="weatherIcon" fontSize="" />,
      Clouds: <CloudOutlinedIcon className="weatherIcon" fontSize="" />,
      Rain: <ThunderstormOutlinedIcon className="weatherIcon" fontSize="" />,
      Snow: <AcUnitOutlinedIcon className="weatherIcon" fontSize="" />,
    };

    // we get the type of weather that is occuring from the api
    let weatherType = currentWeatherData.weather[0].main;
    // we then choose which type of icon we want from weather display by calling weatherDisplay then giving it the name of the type of weather is occuring. if we can't find a match we use the or expression || so we can by default just give a cloud icon
    let weatherContent = weatherDisplay[weatherType] || (
      <CloudOutlinedIcon className="weatherIcon" fontSize="" />
    );

    // Only shows the weather every 3 hours for the next 24 hours, so we conver the response to an array and map through each weatherData so we can render the type of weather that is happening, the time its happening and the degrees.
    const hourlyWeather = Object.values(weatherData)[3].map((each, i) => {
      if (i >= 0 && i <= 7) {
        let date = new Date(each.dt_txt);
        let time = date.toLocaleTimeString([], {
          hour: "numeric",
          hour12: true,
        });

        if (time === "0 am") {
          time = "12 am";
        } else if (time === "0 pm") {
          time = "12 pm";
        }

        const updatedWeatherDisplay = {
          Clear: (
            <WbSunnyOutlinedIcon
              className="hourlyWeatherIcon"
              fontSize="large"
            />
          ),
          Clouds: (
            <CloudOutlinedIcon className="hourlyWeatherIcon" fontSize="large" />
          ),
          Rain: (
            <ThunderstormOutlinedIcon
              className="hourlyWeatherIcon"
              fontSize="large"
            />
          ),
          Snow: (
            <AcUnitOutlinedIcon
              className="hourlyWeatherIcon"
              fontSize="large"
            />
          ),
        };

        return (
          <div className="hourlyWeather" key={i}>
            {updatedWeatherDisplay[each.weather[0].main]}
            <p>{time}</p>
            {/* Converts temperature for Kelvin to Degrees */}
            <p>{Math.round(each.main.temp - 273.15)}°C</p>
          </div>
        );
      } else return null;
    });

    // we return all the bits we want to the page, a welcome message with the username if username exists otherwise just welcome, the type of weather with and icon for it, the future weathers thats happening every 3 hours. we also show the chances of precipitation (this feature doesn't work for all areas just depends on the API because as of right now we are only using the free version), we show humidity, Wind speed information and also UV index information
    return (
      <div className="weather">
        <h1>Welcome {username}</h1>
        <div className="weather__containerOne">
          <div>
            <LocationOnIcon className="locationIcon" fontSize="" />
            {address.city ? (
              <p className="city">{address.city}</p>
            ) : (
              <p className="city--unknown">Unknown</p>
            )}
          </div>

          <p className="currentWeather">
            {/* Converts temp from kelvin to degrees celcius */}
            {Math.round(currentWeatherData.main.temp - 273.15)}°
          </p>
        </div>
        <div className="weather__containerTwo">
          <div className="weather__containerTwo--containerOne">
            <Today />
            <DirectionsBikeIcon className="bikeIcon" fontSize="" />
          </div>
          <div className="weather__containerTwo--containerTwo">
            <h1>{currentWeatherData.weather[0].main}</h1>
            {weatherContent}
          </div>
          <div className="weather__containerTwo--containerThree">
            <div className="weather--info">
              <p>Chances Of Precipitation</p>
              {/* pop property is not always available for all locations by the api*/}
              {currentWeatherData.pop ? (
                <p>{currentWeatherData.pop}%</p>
              ) : (
                <p>Unavailable</p>
              )}
            </div>
            <div className="weather--info">
              <p>Humidity</p>
              <p>{currentWeatherData.main.humidity}%</p>
            </div>
            <div className="weather--info">
              <p>Wind</p>
              <p>{currentWeatherData.wind.speed}mph</p>
            </div>
            <div className="weather--info">
              <p>UV Index</p>
              <p>{uvIndex}</p>
            </div>
          </div>
        </div>
        <div className="weather__containerThree">
          <div className="hourlyWeatherContainer">
            <div>{hourlyWeather}</div>
          </div>
        </div>
      </div>
    );
  }
};
export default Weather;
