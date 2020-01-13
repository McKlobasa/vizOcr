import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';


const Container = styled.div`
  flex: 1;
  flex-direction:row;
  flex-wrap: nowrap;
  position:relative;
  height: 100%;
  width: 100%;
  align-items: stretch;
`
const Input = styled.input`
  border: 1px solid white;
  background-color: transparent;
  border-radius: 4000px;
  padding-left: 12px;
  height: 25px;
  margin: 5px;
  padding: 3px;
  color: white;
  outline: none;
  &:focus {
    background-color: white;
    color: gray;
  }
`
const Label = styled.div`
  color: white;
  font-size: 12px;
  width: 300px;
`


function fastTextInput (props) {
  const [tempText, setTempText] = useState(props.text)
  
  return (
    <Container>
      <Label>{props.label}</Label>
      <Input 
        onChange={(event) => setTempText(event.target.value)}
        onBlur={(event) => props.setText(tempText)}
        value={tempText}
      />
    </Container>
  )
}



export default fastTextInput
