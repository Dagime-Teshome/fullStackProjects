/* eslint-disable react/prop-types */
import CountryDetail from "./CountryDetail";
import WeatherComponent from "./WeatherComponent";
import "./wrapper.css";

const WrapperComponent = ({ countryDetail }) => {
  if (countryDetail === null) {
    return null;
  }
  const capital = countryDetail?.Capitals[0];
  return (
    <div className="containerClass">
      <CountryDetail countryDetail={countryDetail} />
      <WeatherComponent capital={capital} />
    </div>
  );
};
export default WrapperComponent;
