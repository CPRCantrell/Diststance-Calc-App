import React, { useState } from 'react';
import './App.scss'

function App() {

  const [corrdinatesA, setCorrdinatesA] = useState({lat:0, long:0});
  const [corrdinatesB, setCorrdinatesB] = useState({lat:0, long:0});
  const [distance, setDistance] = useState(0);

  const LatitudeDegreeConvertions = {toKilometers: 40075.017/360, toMile: 24901.461/360}
  const LongitudeDegreeConvertions = {toKilometers: 40007.863/360, toMile: 24859.734/360}

  function handleSubmit(event){
    event.preventDefault()

    let latitudeDifference = (corrdinatesA.lat > corrdinatesB.lat ? corrdinatesA.lat - corrdinatesB.lat : corrdinatesB.lat - corrdinatesA.lat) * LatitudeDegreeConvertions.toKilometers
    let longitudeDifference = (corrdinatesA.long > corrdinatesB.long ? corrdinatesA.long - corrdinatesB.long : corrdinatesB.long - corrdinatesA.long) * LongitudeDegreeConvertions.toKilometers

    setDistance(Math.sqrt(Math.pow(latitudeDifference,2) + Math.pow(longitudeDifference,2)) + ' km')
  }

  function handlePointChange(point, update){
    if(point == 'A'){
      setCorrdinatesA(corrdinatesA => ({...corrdinatesA, ...update}))
    } else {
      setCorrdinatesB(corrdinatesB => ({...corrdinatesB, ...update}))
    }
  }

  return (
    <>
      <form onSubmit={e => handleSubmit(e)}>

        <h2>Point A</h2>

        <div className='form-group'>
          <lable>Latitutde</lable>
          <input type='number' value={corrdinatesA.lat} onChange={e => handlePointChange('A',{lat:parseFloat(e.target.value)})} />
        </div>

        <div className='form-group'>
          <lable>Longitude</lable>
          <input type='number' value={corrdinatesA.long} onChange={e => handlePointChange('A',{long:parseFloat(e.target.value)})} />
        </div>

        <h2>Point B</h2>

        <div className='form-group'>
          <lable>Latitutde</lable>
          <input type='number' value={corrdinatesB.lat} onChange={e => handlePointChange('B',{lat:parseFloat(e.target.value)})} />
        </div>

        <div className='form-group'>
          <lable>Longitude</lable>
          <input type='number' value={corrdinatesB.long} onChange={e => handlePointChange('B',{long:parseFloat(e.target.value)})} />
        </div>

        <input type='submit' />

      </form>
      <h2>{distance}</h2>
    </>
  );
}

export default App;
