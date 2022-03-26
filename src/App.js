import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Favorites from "./components/Favorites";
import "./App.css";

function App() {

  //  const locationkeyUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${getState}&language=en-us&details=false&offset=25`
  // const autocompleteUrl = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=autocom&language=en-us`
  // const fiveDayUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}&language=en-us&details=false&metric=${unit}`
  // const curentCUrl = `http://dataservice.accuweather.com/currentconditions/v1//${locationKey}?apikey=${apiKey}&language=en-us&details=false`
  // //https://cors-anywhere.herokuapp.com/

   const apiKey = process.env.REACT_APP_API_KEY;


  const [getState, setGetState] = useState("tel aviv");
  const [locationKey, setLocationKey] = useState();
  const [name, setName] = useState();
  const [tempC, setTempC] = useState();
  const [tempF, setTempF] = useState();
  const [icon, setIcon] = useState();
  const [weatTxt, setWeatTxt] = useState();
  const [unit, setUnit] = useState("true");
  const [dataFD, setDataFd] = useState([]);
  const [favState, setFavState] = useState([{name: "tel aviv"}, {name: "new york"}, {name: "batumi"}, {name: "dimona"}]);
  const [visibleStyleLike, setVisibleStyleLike] = useState({visibility: "hidden"});
  const [visibleStyleUnLike, setVisibleStyleUnLike] = useState({visibility: "visible"});
  const [visibleStyleC, setVisibleStyleC] = useState({ visibility: "visible" });
  const [visibleStyleF, setVisibleStyleF] = useState({ visibility: "hidden" });
  const [isAuthtenticating, setIsAuthenticating] = useState(false)

  useEffect(() => {
    search();
  }, []);

  const onSubmitHandler = (e, city, unit) => {
    e.preventDefault();
    setGetState(city)
    setUnit(unit)
    if (unit == "false") {
      setVisibleStyleC({ visibility: "hidden" });
      setVisibleStyleF({ visibility: "visible" });
    } else {
      setVisibleStyleC({ visibility: "visible" });
      setVisibleStyleF({ visibility: "hidden" });
    }
    const filterdData = favState.filter((s) => getState == s.name);
    if(filterdData.length == 0){
      console.log("false")
      setVisibleStyleLike({ visibility: "hidden" });
      setVisibleStyleUnLike({ visibility: "visible" });
    } else {
      console.log("true")
      setVisibleStyleLike({ visibility: "visible" });
      setVisibleStyleUnLike({ visibility: "hidden" });
    }
    search();
  };

  const search = () => {
     fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${getState}&language=en-us&details=false&offset=25`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const locationKey = data[0].Key;
          setLocationKey(locationKey);
          setName(data[0].LocalizedName);
          return fetch(
            `http://dataservice.accuweather.com/currentconditions/v1//${locationKey}?apikey=${apiKey}&language=en-us&details=false`
          )
            .then((res) => res.json())
            .then((dataCC) => {
              console.log(dataCC);
              const tempC = dataCC[0].Temperature.Metric.Value;
              const tempF = dataCC[0].Temperature.Imperial.Value;
              const icon = dataCC[0].WeatherIcon;
              const weatTxt = dataCC[0].WeatherText;
              setTempC(tempC);
              setTempF(tempF);
              setIcon(icon);
              setWeatTxt(weatTxt);
              return fetch(
                `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}&language=en-us&details=false&metric=${unit}`
              )
                .then((res) => res.json())
                .then((dataFD) => {
                  console.log(dataFD);
                  setDataFd(dataFD.DailyForecasts);
                });
            });
        })
        .catch (error => console.log(error))
        setIsAuthenticating(true)
  };

  const putFav = (city) => {
    setFavState([...favState, {name: city, tempC: tempC, tempF: tempF}]);
    setVisibleStyleLike({ visibility: "visible" });
    setVisibleStyleUnLike({ visibility: "hidden" });
    localStorage.setItem('favState', JSON.stringify(favState));
    JSON.parse(localStorage.getItem('favState'));
  };

  const delFav = (city) => {
    const filterdData = favState.filter((s) => s.name != city);
    setFavState(filterdData)
    setVisibleStyleLike({ visibility: "hidden" });
    setVisibleStyleUnLike({ visibility: "visible" });
    localStorage.setItem("favState", JSON.stringify(filterdData));
  }

  useEffect(() => {
    if (!localStorage.getItem("favState")) {
      localStorage.setItem("favState", JSON.stringify(favState));
    } else {
      setFavState(JSON.parse(localStorage.getItem("favState")));
    }
  }, []);

  const choice = (id) => {
    const filterdData = favState.filter((s, i) => id == i);
    const city = filterdData[0].name
    setGetState(city);
    search();
  };

  const deleteData = (id) => {
    const filterdData = favState.filter((s, i) => id != i);
    setFavState([...filterdData]);
    localStorage.setItem("favState", JSON.stringify(filterdData));
  };

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
        <Route
            path="/" 
            element={<Home
                onSubmitHandler={onSubmitHandler} name={name} tempC={tempC} tempF={tempF} weatTxt={weatTxt} icon={icon} dataFD={dataFD} 
                visibleStyleC={visibleStyleC} visibleStyleF={visibleStyleF} visibleStyleLike={visibleStyleLike} visibleStyleUnLike={visibleStyleUnLike} 
                delFav={delFav} putFav={putFav} /> }/>
          <Route
            path="/favorites"
            element={favState.map((s, i) => {
              return (
                <Favorites
                  choice={choice}
                  deleteData={deleteData}
                  name={s.name}
                  id={i}
                  favState={favState}
                  visibleStyleC={visibleStyleC}
                  visibleStyleF={visibleStyleF}
                />
              );
            })}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
