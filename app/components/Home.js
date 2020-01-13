import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json'
import styles from './Home.css'
import FastTextInput from './FastTextInput.js'
import {SocketProvider, useSocket} from '../hooks/useSocket.js'
import OCR from './OCR.js'

export default function Home (props) {
  const [fromIp, setFromIp] = useState('192.168.1.20')
  const [fromPort, setFromPort] = useState(8111) 
  const [toIp, setToIp] = useState('192.168.1.10')
  const [toPort, setToPort] = useState(6100) 
  return (
    <SocketProvider connection={{ip: toIp, port: toPort}}>
      <OCR
        fromIp={fromIp}
        setFromIp={setFromIp}
        fromPort={fromPort}
        setFromPort={setFromPort}
        toIp={toIp}
        setToIp={setToIp}
        toPort={toPort}
        setToPort={setToPort}
      />
    </SocketProvider>
  )
}
