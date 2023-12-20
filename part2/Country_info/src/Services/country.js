import axios from "axios";

const whetherUrl = "https://api.openweathermap.org/data/2.5/weather";
const countryUrl = "https://studies.cs.helsinki.fi/restcountries";
const api_key = import.meta.env.VITE_SOME_KEY;

const buildObject = (country) => {
  return {
    Name: country.name.common,
    Capitals: country.capital,
    Area: country.area,
    Languages: country.languages,
    FlagUrl: country.flags.png,
    FlagAlt: country.flags.alt,
  };
};

const getAllCountries = () => {
  return axios
    .get(`${countryUrl}/api/all`)
    .then((response) => response.data.map((country) => buildObject(country)));
};

const getCountry = (country) => {
  return axios.get(`${countryUrl}/api/name/${country}`).then((response) => {
    console.log(response);
  });
};

const getCityWeather = (city) => {
  return axios
    .get(`${whetherUrl}?q=${city}&appid=${api_key}`)
    .then((response) => {
      return response.data;
    });
};

export default { getAllCountries, getCountry, getCityWeather };
