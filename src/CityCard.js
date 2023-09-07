import React, { useState } from 'react'

export default function CityCard({name,tempc,city}) {
    const [unit, setUnit] = useState("cel");
  const [temp, setTemp] = useState();
  const convertTemp = (id) => {
    var val = cities[id].main.temp;

    // console.log(val);

    if (unit=="fah") {
      const cel = ((+val * 9) / 5 + 32).toFixed(2);
      const items = cities.map((city, index) =>
        index === id ? { ...city, [city.main.temp]: cel } : city
      );
      setCities(items);
    } else {
      const fah = (((+val - 32) * 5) / 9).toFixed(2);
      const items = cities.map((city, index) =>
        index === id ? { ...city, [city.main.temp]: fah } : city
      );
      setCities(items);
    }
    // setUnit(!unit)
  };
  return (
    <>
        <div className="card p-5" key={city.name}>
            <h2>{city.name}</h2>
            <div className="d-flex justify-content-between align-items-center">
              {unit?<p>Temperature: {city.main.temp}</p>:<p>{temp}</p>}
              {/* <p>Temperature: {city.main.temp}</p> */}
              {/* {setTemp(city.main.temp)}
              <p>Temperature: {temp}</p> */}
              {unit?<><button className="btn  btn-primary" onClick={()=>convertTemp(city.main.temp)}> °F</button></>:<><button className="btn  btn-primary" onClick={()=>convertTemp(temp)}> °C</button></>}
            </div>
            <button onClick={() => deleteCity(city)}>Delete</button>
          </div>
    </>
  )
}
