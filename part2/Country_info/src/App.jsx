import { useEffect, useState } from "react";
import Services from "./Services/country";
import SearchComponent from "./Components/SearchComponent";
import WrapperComponent from "./Components/WrapperComponent";
import "./app.css";

function App() {
  const [countryList, setCountryList] = useState([]);
  const [countryListCopy, setCountryListCopy] = useState([]);
  const [moreThan10, setMoreThan10] = useState(false);
  const [countryDetail, setCountryDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Services.getAllCountries().then((countryList) => {
      setCountryList(countryList);
      setLoading(false);
    });
  }, []);

  const handleSearch = (searchParam) => {
    setCountryListCopy(filterData(searchParam));
  };

  const filterData = (text) => {
    let returnArray = countryList.filter((country) =>
      country.Name.toLowerCase().includes(text.toLowerCase())
    );
    if (text === "") {
      setCountryDetail(null);
      return null;
    } else if (returnArray.length > 10) {
      setMoreThan10(true);
      return [];
    } else if (returnArray.length == 1) {
      setCountryDetail(returnArray[0]);
      setMoreThan10(false);
      return returnArray;
    } else {
      setCountryDetail(null);
      setMoreThan10(false);
      return returnArray;
    }
  };

  const handleDetailClick = (data) => {
    setCountryDetail(data);
  };

  return (
    <>
      <SearchComponent
        countryList={countryListCopy}
        moreThan10={moreThan10}
        onChange={handleSearch}
        handleDetailClick={handleDetailClick}
        disabled={loading}
      />
      {loading ? <div className="loadingClass">Loading........</div> : null}
      <WrapperComponent countryDetail={countryDetail} />
    </>
  );
}

export default App;
