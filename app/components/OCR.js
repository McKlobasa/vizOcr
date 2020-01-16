// @flow
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FastTextInput from './FastTextInput.js'
import {useSocket} from '../hooks/useSocket.js'


export default function OCR (props) {

  const getClockString = (time) => `0 RENDERER*FRONT_LAYER*TREE*$CLOCK*GEOM*TEXT SET ${time}\0`
  const getShotClockString = (time) => `0 RENDERER*FRONT_LAYER*TREE*$SHOT_TIMER*GEOM*TEXT SET ${time}\0`
  const [time, setTime] = useState(null)
  const [attackTime, setAttackTime] = useState(null)
  const { send } = useSocket()
  const [backendIsRunning, setBackendIsRunning] = useState(false)

  const callBackendAPI = async () => {
    const response = await fetch(`http://${props.fromIp}:${props.fromPort}/results.json`);
    const body = await response.json();

    if (response.status !== 200) {
      console.log('bad response')
      setBackendIsRunning(false)
    } else {
      setBackendIsRunning(false)
    }
    if (body.clock != time || body.attack != attackTime) {
      console.log(body.clock)
      setTime(body.clock)
      setAttackTime(body.attack)
      send(getClockString(body.clock))
      send(getShotClockString(body.attack))
    }
    return body;
  } 
  const checkTime = () => {
    if (backendIsRunning == false) {
      callBackendAPI()
      setBackendIsRunning(true)
    }
  }
  let t = setInterval(checkTime, 300)
  return (
    <div>
      <h2>{`time: ${time}`}</h2>
      <h2>{`attack: ${attackTime}`}</h2>
      <FastTextInput label={ 'from IP' } text={props.fromIp} setText={props.setFromIp}/>
      <FastTextInput label={ 'from port' } text={props.fromPort} setText={props.setFromPort}/>
      <FastTextInput label={ 'to IP' } text={props.toIp} setText={props.setToIp}/>
      <FastTextInput label={ 'to port' } text={props.toPort} setText={props.setToPort}/>
    </div>
  )
}
