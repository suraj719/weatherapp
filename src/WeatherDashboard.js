import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";

function WeatherDashboard() {
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");
  const [err, setErr] = useState("");
  const [currentPage,setCurrpage] = useState(1)
  const [postsPerPage,SetPostsPerPage] = useState(3);

  const idlastp = currentPage * postsPerPage
  const idfirstp = idlastp - postsPerPage
  const currentCities = cities.slice(idfirstp,idlastp)
  // const [unit, setUnit] = useState("cel");
  // const [temp, setTemp] = useState();
  // const convertTemp = (id) => {
  //   var val = cities[id].main.temp;

  //   // console.log(val);

  //   if (unit=="fah") {
  //     const cel = ((+val * 9) / 5 + 32).toFixed(2);
  //     const items = cities.map((city, index) =>
  //       index === id ? { ...city, [city.main.temp]: cel } : city
  //     );
  //     setCities(items);
  //   } else {
  //     const fah = (((+val - 32) * 5) / 9).toFixed(2);
  //     const items = cities.map((city, index) =>
  //       index === id ? { ...city, [city.main.temp]: fah } : city
  //     );
  //     setCities(items);
  //   }
  //   // setUnit(!unit)
  // };
  const loadcities = () => {
    fetch(
      "http://api.openweathermap.org/data/2.5/group?id=524901,703448,2643743,2172797,3245,18007&APPID=77003d306b25e391aca3f6d95268b3ed&units=metric"
    )
      .then((res) => res.json())
      .then((data) => setCities(data.list));
    // console.log(cities);
  };
  useEffect(() => {
    loadcities();
  }, []);
  async function fetchWeather(city) {
    fetch(
      // "http://api.openweathermap.org/data/2.5/group?id=524901,703448,2643743&APPID=77003d306b25e391aca3f6d95268b3ed&units=metric"
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=77003d306b25e391aca3f6d95268b3ed&units=metric`
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setErr("");
          setCities([data, ...cities]);
        });
      } else {
        res.json().then((data) => {
          setErr(data.message);
        });
      }
    });
  }

  const addCity = () => {
    fetchWeather(search);
    // const weather = fetchWeather(search);
    // setCities([...cities, weather]);
  };

  const deleteCity = (city) => {
    setCities(cities.filter((c) => c.name !== city.name));
  };
  const paginate = pagenum =>setCurrpage(pagenum)
  return (
    <div className="text-center">
      {err ? (
        <>
          <div className="alert alert-danger" role="alert">
            {err}
          </div>
        </>
      ) : (
        <></>
      )}
      <input
        className="rounded-pill p-2 mt-3"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="p-2 btn btn-primary" onClick={addCity}>
        Add City
      </button>
      <div className="mt-5 d-flex flex-wrap wrap justify-content-center align-items-center gap-5">
        {currentCities.map((city, id) => (
          <div className="card p-5" key={city.name}>
            <h2>{city.name}</h2>
            <div className="d-flex justify-content-between align-items-center">
              {/* {unit?<p>Temperature: {city.main.temp}</p>:<p>{temp}</p>} */}
              <p>Temperature: {city.main.temp}</p>
            </div>
            <button onClick={() => deleteCity(city)}>Delete</button>
          </div>
        ))}
      </div>
      <Pagination PostsPerPage={postsPerPage} totalPosts={cities.length} paginate={paginate}/>
    </div>
  );
}
export default WeatherDashboard;
