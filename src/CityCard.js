import React, { useState } from 'react'

export default function CityCard({name,tempc,id,deleteCity,convertTemp}) {
    const [unit, setUnit] = useState("celcius");
    const [tempe,setTemp] = useState(tempc)
    const change = (unit,id) => {
      if(unit==="celcius") {
        //convert to fahrenheit
       setTemp((tempe * (9 / 5)) + 32)
  
      } else {
        //convert to celcius
        setTemp((tempe - 32)* 5/9)
      }
    }
  return (
    <>
        <div className="card p-5">
            <h2>{name}</h2>
            <div className="my-2">
              <p>Temperature: {tempe}</p>
              {unit=="celcius"?<><button className="btn  btn-primary" onClick={()=>{convertTemp(unit,id);setUnit("fahrenheit");change(unit,id)}}>convert to °F</button></>:<><button className="btn  btn-primary" onClick={()=>{convertTemp(unit,id);setUnit("celcius");change(unit,id)}}> convert to °C</button></>}
            </div>
            <button className='btn btn-danger ' onClick={() => deleteCity(name)}>Delete</button>
          </div>
    </>
  )
}
