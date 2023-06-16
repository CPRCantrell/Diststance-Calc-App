import React, { useState, useEffect, useCallback } from "react";
import { SearchBox, AddressMinimap, config } from "@mapbox/search-js-react";
import "./App.scss"

function App() {

  const [feature, setFeature] = useState({properties:{full_address:""}, geometry:{coordinates:[-84.3877, 33.7488]}});
  const [searchValue, setSearchValue] = useState("");
  const [pointAValue, setPointAValue] = useState("");
  const [pointBValue, setPointBValue] = useState("");
  const [token, setToken] = useState("");
  const [distance, setDistance] = useState(0);

  const LatitudeDegreeConvertions = {toKilometers: 40075.017/360, toMile: 24901.461/360}
  const LongitudeDegreeConvertions = {toKilometers: 40007.863/360, toMile: 24859.734/360}

  useEffect(() => {
    const accessToken = "pk.eyJ1IjoiYy1yb21hbmNhbnRyZWxsIiwiYSI6ImNsZ3h6MmliOTA0Z3IzZXBpZWpqOWNtbzQifQ.AA1tCkKxeoIpw4YGUsYTJQ"
    setToken(accessToken)
    config.accessToken = accessToken;
  }, []);

  const handleRetrieve = useCallback(
    (res) => {
      const feature = res.features[0]
      setFeature(feature)
    },[setFeature])

  function handleSubmit(e){
    e.preventDefault()
    let pointA = stringToCoordinates(pointAValue)
    let pointB = stringToCoordinates(pointBValue)
    setDistance(calculateDistance(pointA, pointB))
  }

  function stringToCoordinates(stringCoordinates){
    stringCoordinates = stringCoordinates.split(',').map(item => item.trim())
    return {long:parseFloat(stringCoordinates[0]), lat: parseFloat(stringCoordinates[1])}
  }

  function calculateDistance(firstPoint, secondPoint){
    let xAxisDifference = (firstPoint.long <= secondPoint.long ? secondPoint.long - firstPoint.long : firstPoint.long - secondPoint.long) * LongitudeDegreeConvertions.toKilometers
    let yAxisDifference = (firstPoint.lat <= secondPoint.lat ? secondPoint.lat - firstPoint.lat : firstPoint.lat - secondPoint.lat) * LatitudeDegreeConvertions.toKilometers
    return Math.sqrt(Math.pow(xAxisDifference, 2) + Math.pow(yAxisDifference, 2)).toFixed(3)
  }

  return (
    <>
      <div>

        <div>
        <h2 className="txt-s txt-bold color-gray mb3">Address</h2>
        <SearchBox accessToken={token} onRetrieve={handleRetrieve} value={searchValue} onChange={value=>setSearchValue(value)} />
        </div>

        <div className="test">
          <AddressMinimap satelliteToggle={true} feature={feature} show={true}/>
        </div>

        <button onClick={event=>setPointAValue(`${feature.geometry.coordinates[0]}, ${feature.geometry.coordinates[1]}`)}>SET POINT A</button>
        <button onClick={event=>setPointBValue(`${feature.geometry.coordinates[0]}, ${feature.geometry.coordinates[1]}`)}>SET POINT B</button>

        <p>Longitude: {feature.geometry.coordinates[0]}</p>
        <p>Latitude: {feature.geometry.coordinates[1]}</p>
      </div>

      <form onSubmit={event=>handleSubmit(event)}>
        <h2>Point A</h2>
        <input type="text" value={pointAValue} onChange={setPointAValue}/>

        <h2>point B</h2>
        <input type="text" value={pointBValue} onChange={setPointBValue} />

        <input type="submit" />
      </form>

      <div>
        <h2>Distance: {distance}km</h2>
      </div>
    </>
  );
}

export default App;
