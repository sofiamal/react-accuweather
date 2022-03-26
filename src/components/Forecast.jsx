import React from "react";
import '../style/common.css'

export default function Forecast(props) {
  
  return (

<div className="dayDiv">
      <h5>{props.date}</h5>
      <p>{props.tempMax}</p>
      <p>{props.iconTxt}</p>
        {/* <img src={require(`../img/${props.icon.d}.png`)} alt="weather status icon" />     */}
  </div>      
  );
}
