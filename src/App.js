import React, { useState } from 'react';
import './App.scss'

function App() {

  const [coordinatesA, setCoordinatesA] = useState({lat:0, long:0});
  const [coordinatesB, setCoordinatesB] = useState({lat:0, long:0});
  const [distance, setDistance] = useState(0);

  const LatitudeDegreeConvertions = {toKilometers: 40075.017/360, toMile: 24901.461/360}
  const LongitudeDegreeConvertions = {toKilometers: 40007.863/360, toMile: 24859.734/360}

  function handleSubmit(event){
    event.preventDefault()

    let latitudeDifference = (coordinatesA.lat > coordinatesB.lat ? coordinatesA.lat - coordinatesB.lat : coordinatesB.lat - coordinatesA.lat) * LatitudeDegreeConvertions.toKilometers
    let longitudeDifference = (coordinatesA.long > coordinatesB.long ? coordinatesA.long - coordinatesB.long : coordinatesB.long - coordinatesA.long) * LongitudeDegreeConvertions.toKilometers

    setDistance(Math.sqrt(Math.pow(latitudeDifference,2) + Math.pow(longitudeDifference,2)) + ' km')
  }

  function handlePointChange(point, update){
    if(point == 'A'){
      setCoordinatesA(coordinatesA => ({...coordinatesA, ...update}))
    } else {
      setCoordinatesB(coordinatesB => ({...coordinatesB, ...update}))
    }
  }

  return (
    <>
      <form onSubmit={e => handleSubmit(e)}>

        <h2>Point A</h2>

        <div className='form-group'>
          <lable>Latitutde</lable>
          <input type='number' value={coordinatesA.lat} onChange={e => handlePointChange('A',{lat:parseFloat(e.target.value)})} />
        </div>

        <div className='form-group'>
          <lable>Longitude</lable>
          <input type='number' value={coordinatesA.long} onChange={e => handlePointChange('A',{long:parseFloat(e.target.value)})} />
        </div>

        <h2>Point B</h2>

        <div className='form-group'>
          <lable>Latitutde</lable>
          <input type='number' value={coordinatesB.lat} onChange={e => handlePointChange('B',{lat:parseFloat(e.target.value)})} />
        </div>

        <div className='form-group'>
          <lable>Longitude</lable>
          <input type='number' value={coordinatesB.long} onChange={e => handlePointChange('B',{long:parseFloat(e.target.value)})} />
        </div>

        <input type='submit' />

      </form>
      <h2>{distance}</h2>
    </>
  );
}

export default App;
