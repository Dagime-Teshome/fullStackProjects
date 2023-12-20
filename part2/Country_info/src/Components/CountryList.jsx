/* eslint-disable react/prop-types */
const CountryList = ({ countryList, moreThan10, handleDetailClick }) => {
  if (countryList === null) {
    return null;
  }
  const style = {
    color: "red",
    fontWeight: "100",
  };
  return (
    <>
      <div style={style}>
        {moreThan10 ? "Too many matches,specify another filter" : ""}
      </div>
      <ul>
        {countryList.map((country, index) => {
          return (
            <li key={index}>
              {country.Name}{" "}
              <button
                onClick={() => {
                  handleDetailClick(country);
                }}
              >
                ShowDetail
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CountryList;
