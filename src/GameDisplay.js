import './App.css';
import React from 'react';

function GameDisplay(props) {

    return (
        <div>
            <p>Level: {props.level}</p>
            {props.button_arr}
        </div>
    );
}

export default GameDisplay;
