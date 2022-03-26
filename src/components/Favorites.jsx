import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FcLike } from "react-icons/fc";
import '../style/common.css'

export default function Favorites(props) {
  let navigate = useNavigate();

  const apiKey = process.env.REACT_APP_API_KEY;

  const [id, setId] = useState(props.id);
  const [getState, setGetState] = useState(props.name); 
  const [tempC, setTempC] = useState();
  const [tempF, setTempF] = useState();
  const [visibleStyleC, setVisibleStyleC] = useState(props.visibleStyleC);
  const [visibleStyleF, setVisibleStyleF] = useState(props.visibleStyleF);

  useEffect(() =>{
   fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${getState}&language=en-us&details=false&offset=25`
      )
      .then((res) => res.json())
      .then((data) => { 
        const locationKey = data[0].Key; 
        return fetch(
            `http://dataservice.accuweather.com/currentconditions/v1//${locationKey}?apikey=${apiKey}&language=en-us&details=false`
          )
          .then((res) => res.json())
          .then((dataCC) => {
            const tempC = dataCC[0].Temperature.Metric.Value
            const tempF = dataCC[0].Temperature.Imperial.Value
            setTempC(tempC)
            setTempF(tempF)
          })})
  })

  const showWeat = () => {
     props.choice(id)
    navigate('/')
  };

  const remove = () => {
    props.deleteData(id);
  };

  return (
    <div className="dayDivF">
    <button type="submit" onClick={showWeat} className="dayBtnF"><h5 style={{fontSize: "25px", fontWeight: "bold"}}>{props.name}</h5>
    <p style={visibleStyleC}>{tempC}</p>
    <p style={visibleStyleF}>{tempF}</p>
    <FcLike type="button" onClick={remove} style={{fontSize: "20px"}} /></button>
</div>
  );
}
