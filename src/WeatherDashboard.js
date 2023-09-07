import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import CityCard from "./CityCard";
import Pagination from "./Pagination";

function WeatherDashboard() {
  const [isloading,setIsloading] = useState(false)
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");
  const [err, setErr] = useState("");
  const [currentPage,setCurrpage] = useState(1)
  const [postsPerPage,SetPostsPerPage] = useState(3);

  const idlastp = currentPage * postsPerPage
  const idfirstp = idlastp - postsPerPage
  const currentCities = cities.slice(idfirstp,idlastp)
  const convertTemp = (unit,id) => {
    var val = cities[id].main.temp
    if(unit==="celcius") {
      //convert to fahrenheit
      const cel = (val * (9 / 5)) + 32
      cities[id].main.temp=cel

    } else {
      //convert to celcius
      const fah = (val - 32)* 5/9
      cities[id].main.temp=fah
      console.log(cities);
    }
  }
  const loadcities = () => {
    fetch(
      "https://api.openweathermap.org/data/2.5/group?id=524901,703448,2643743,2172797,3245,18007&APPID=77003d306b25e391aca3f6d95268b3ed&units=metric"
    )
      .then((res) => res.json())
      .then((data) => setCities(data.list));
    // console.log(cities);
  };
  useEffect(() => {
    loadcities();
  }, []);
  async function fetchWeather(city) {
    setIsloading(true)
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=77003d306b25e391aca3f6d95268b3ed&units=metric`
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setIsloading(false)
          setErr("");
          setCities([data, ...cities]);
        });
      } else {
        res.json().then((data) => {
          setIsloading(false)
          setErr(data.message);
        });
      }
    });
  }

  const addCity = () => {
    fetchWeather(search);
  };

  const deleteCity = (city) => {
    setCities(cities.filter((c) => c.name !== city));

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
      <h1 className="text-decoration-underline">Weather App</h1>
      <input
        className="rounded-pill p-2 mt-3"
        type="text"
        placeholder="enter city name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="p-2 btn btn-primary" onClick={addCity}>
        search
      </button>
      <div className="mt-5 d-flex flex-wrap wrap justify-content-center align-items-center gap-5">
      {isloading ? <>
        <div className="">
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        </div>
      </>:<>
        {currentCities.map((city, id) => (
          <CityCard name={city.name} tempc={city.main.temp} id={id} deleteCity={deleteCity} convertTemp={convertTemp} key={id} />
          // <div className="card p-5" key={city.name}>
          //   <h2>{city.name}</h2>
          //   <div className="d-flex justify-content-between align-items-center">
          //     {/* {unit?<p>Temperature: {city.main.temp}</p>:<p>{temp}</p>} */}
          //     <p>Temperature: {city.main.temp}</p>
          //   </div>
          //   <button onClick={() => deleteCity(city)}>Delete</button>
          // </div>
        ))}
        </>}
      </div>
      <Pagination PostsPerPage={postsPerPage} totalPosts={cities.length} paginate={paginate}/>
    </div>
  );
}
export default WeatherDashboard;
