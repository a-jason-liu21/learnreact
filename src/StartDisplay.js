import './App.css';
import React from 'react';

function StartDisplay(props) {
  return (
    <div>
        <button onClick={()=>{
          console.log(typeof props.changeState)
          props.onStart();
        }}>Start!</button>
    </div>
  );
}

export default StartDisplay;
