import React, {useState} from 'react'
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import Forecast from "./Forecast"

export default function Home(props) {

    const [getState, setGetState] = useState("tel aviv");
    const [unit, setUnit] = useState();
    const [visibleStyleLike, setVisibleStyleLike] = useState(props.visibleStyleLike);
    const [visibleStyleUnLike, setVisibleStyleUnLike] = useState(props.visibleStyleUnLike);
    const [visibleStyleC, setVisibleStyleC] = useState(props.visibleStyleC);
    const [visibleStyleF, setVisibleStyleF] = useState(props.visibleStyleF);

    const onSubmitHandler = (e) => {
        setVisibleStyleLike({ visibility: "hidden" });
        setVisibleStyleUnLike({ visibility: "visible" });
       props.onSubmitHandler(e, getState, unit)
    }

    const tempUF = (e) => {
        setUnit(e.target.value)
        setVisibleStyleC({ visibility: "hidden" });
        setVisibleStyleF({ visibility: "visible" });
      } 
      
      const tempUC = (e) => {
        setUnit(e.target.value)
        setVisibleStyleC({ visibility: "visible" });
        setVisibleStyleF({ visibility: "hidden" });
      }

    const putFav = () => {
        props.putFav(getState)
        setVisibleStyleLike({ visibility: "visible" });
        setVisibleStyleUnLike({ visibility: "hidden" });
    }

    const delFav = () => {
        props.delFav(getState)
        setVisibleStyleLike({ visibility: "hidden" });
        setVisibleStyleUnLike({ visibility: "visible" });
    }

  return (
    <div>
         <form class="row g-2 mt-3 d-flex flex-column justify-content-center align-items-center" onSubmit={onSubmitHandler}>
          <div class="col-auto">
            <input
              type="text"
              class="form-control"
              id="inputlocation"
              placeholder="Enter city..."
              onChange={(e) => setGetState(e.target.value)}
              value={getState}
            />
          </div>
        <br />
        <div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="units"
              id="inlineRadio1"
              value="false"
              onChange={tempUF}
            />
            <label class="form-check-label" for="inlineRadio1">
              Fahrenheit
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="units"
              id="inlineRadio2"
              value="true"
              onChange={tempUC}
              defaultChecked
            />
            <label class="form-check-label" for="inlineRadio2">
              Celcius
            </label>
          </div>
        </div>
        <div class="col-auto">
            <button type="submit" class="btn mb-3 btn-outline-success" style={{borderRadius: "50px"}}>
              Search
            </button>
          </div>
        </form>

        <div
          className="cDayDiv"
          style={{
            width: "150px",
            height: "230px",
            margin: "10px",
            position: "relative",
            left: "300px",
            bottom: "100px",
            border: "1px solid #019267",
          }}
        >
          <h5 style={{fontSize: "35px"}}>
            <strong>
              {props.name}{" "}
              </strong>
          </h5>
          <p className="tempD" style={visibleStyleC}>
            {props.tempC}°
          </p>
          <p className="tempF" style={visibleStyleF}>
            {props.tempF}°
          </p>
          <p className="weatTxt">{props.weatTxt}</p>
          {/* <img
            className="iconImg"
            src={require(`./img/${props.icon}.png`)}
            alt="weather status icon"
          /> */}
                  <FcLike
                type="button"
                onClick={delFav}
                className="like"
                style={visibleStyleLike}
              />
              <FcLikePlaceholder
                type="button"
                onClick={putFav}
                className="unLike"
                style={visibleStyleUnLike}
              />
        </div>
            {props.dataFD.map((d) => {
              return (
                <Forecast
                  date={d.Date.slice(0, 10)}
                  tempMax={d.Temperature.Maximum.Value}
                  iconTxt={d.Day.IconPhrase}
                  iconD={d.Day.Icon}
                />
              )})}
    </div>
  )
}
