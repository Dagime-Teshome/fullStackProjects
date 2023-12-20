/* eslint-disable react/prop-types */
import "./countryDetail.css";

const CountryDetail = ({ countryDetail }) => {
  if (countryDetail === null) {
    return null;
  }
  return (
    <div className="cardClass">
      <div className="cardImgClass">
        <img src={countryDetail.FlagUrl} alt={countryDetail.FlagAlt} />
      </div>
      <div className="cardInfoClass">
        <h1>{countryDetail.Name}</h1>
        <div className="text-container">
          <div className="cardTextClass">
            <span>Capital: </span>
            <ul>
              {countryDetail.Capitals.map((capital, index) => (
                <li key={index}>{capital},</li>
              ))}
            </ul>
          </div>
          <div className="cardTextClass">
            <span>Area: </span>
            {countryDetail.Area}
          </div>
          <div className="cardTextClass">
            <span>Languages: </span>
            <ul>
              {Object.values(countryDetail.Languages).map((language, index) => {
                return <li key={index}>{language}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
