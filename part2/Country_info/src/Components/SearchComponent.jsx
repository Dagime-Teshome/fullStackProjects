import CountryList from "./CountryList";
import "./searchComponent.css";
/* eslint-disable react/prop-types */
const SearchComponent = ({
  countryList,
  onChange,
  moreThan10,
  handleDetailClick,
  disabled,
}) => {
  return (
    <div className="searchContainer">
      <h1>Find Countries </h1>
      <input
        className="inputClass"
        type="text"
        placeholder="type here"
        disabled={disabled}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <CountryList
        moreThan10={moreThan10}
        countryList={countryList}
        handleDetailClick={handleDetailClick}
      />
    </div>
  );
};

export default SearchComponent;
