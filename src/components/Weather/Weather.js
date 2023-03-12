import "./Weather.css";
import Today from "../Date/Today";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import React, { useEffect, useState } from "react";

import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import ThunderstormOutlinedIcon from "@mui/icons-material/ThunderstormOutlined";

const Weather = ({ address, location, shareLocation }) => {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [username] = useState(localStorage.getItem("username") || "");

  useEffect(() => {
    const getData = async () => {
      if (location?.latitude && location?.longitude) {
        // Gets the weather of right now
        const getCurrentWeatherDataResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?appid=4828ffdbecf5266bb65d79765d588e86&lat=${location.latitude}&lon=${location.longitude}`
        );

        const getCurrentWeatherData =
          await getCurrentWeatherDataResponse.json();

        setCurrentWeatherData(getCurrentWeatherData);

        // gets the weather for every 3 hours.
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?appid=4828ffdbecf5266bb65d79765d588e86&lat=${location.latitude}&lon=${location.longitude}`
        );

        const data = await res.json();

        setWeatherData(data);
      }
    };
    getData();
  }, [location]);

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

  if (!currentWeatherData && !weatherData) {
    return <h1>Loading...</h1>;
  }

  if (weatherData) {
    const weatherDisplay = {
      Clear: <WbSunnyOutlinedIcon className="weatherIcon" fontSize="" />,
      Clouds: <CloudOutlinedIcon className="weatherIcon" fontSize="" />,
      Rain: <ThunderstormOutlinedIcon className="weatherIcon" fontSize="" />,
      Snow: <AcUnitOutlinedIcon className="weatherIcon" fontSize="" />,
    };

    let weatherType = Object.values(weatherData)[3][0].weather[0].main;
    let weatherContent = weatherDisplay[weatherType] || (
      <CloudOutlinedIcon className="weatherIcon" fontSize="" />
    );

    // Only shows the weather every 3 hours for the next 24 hours
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
            {Math.round(currentWeatherData.main.temp - 273.15)}
            °C
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
