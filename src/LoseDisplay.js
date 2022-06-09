import './App.css';
import React from 'react';

function LoseDisplay(props) {
  return (
    <div>
      <p>You lose! You got to level {props.level}</p>
      <button onClick={()=>{
        props.onRestart();
      }}>Restart</button>
    </div>
  );
}

export default LoseDisplay;
