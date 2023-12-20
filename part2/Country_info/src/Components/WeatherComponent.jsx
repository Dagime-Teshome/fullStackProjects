/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./weather.css";
import Services from "../Services/country";

const WeatherComponent = ({ capital }) => {
  const [weatherData, setWetherData] = useState({});
  const [iconList, setIconList] = useState([]);
  useEffect(() => {
    Services.getCityWeather(capital)
      .then((response) => {
        console.log(response);
        setWetherData(response);
        getImgSrc(response.weather);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [capital]);

  const getImgSrc = (weatherArray) => {
    console.log(weatherArray);
    setIconList(
      weatherArray.map((weather) => ({
        icon: weather.icon,
        description: weather.description,
      }))
    );
  };
  return (
    <div className="WeatherCardClass">
      <h1>Weather in {capital}</h1>
      {iconList.map((weather, index) => {
        return (
          <div key={index} className="weatherImgClass">
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.description}
            />
            <figcaption className="weatherHeaderClass">
              {weather.description.toUpperCase()}
            </figcaption>
          </div>
        );
      })}
      <div className="WeatherInfo">
        <div className="cardTextClass">
          <span>
            <b>Temperature:</b>
          </span>
          {weatherData?.main?.temp} Celsius
        </div>
        <div className="cardTextClass">
          <span>
            <b>Wind:</b>
          </span>
          {weatherData?.wind?.speed} m/s
        </div>
      </div>
    </div>
  );
};

export default WeatherComponent;
