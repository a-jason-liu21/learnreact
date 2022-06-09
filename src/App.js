import './App.css';
import StartDisplay from './StartDisplay.js';
import GameDisplay from './GameDisplay.js';
import LoseDisplay from './LoseDisplay.js';
import React from 'react';

function App() {

  const DEBUG = false;

  const BASE_BTN_COUNT = 4;
  const BASE_SEQ_LEN = 3;
  const BASE_SEQ_TIME = 300;
  const SEQ_TIME_DEC = 50;
  const SEQ_TIME_MIN = 100;
  const SEQ_PER_LEVEL = 1;

  const [app_state, rset_app_state] = React.useState("start");
  const [buttons, rset_buttons] = React.useState([]);
  const [seq, rset_seq] = React.useState([]);
  const [level, rset_level] = React.useState(0);
  const [click_state, rset_click_state] = React.useState(0);
  const [show_state, rset_show_state] = React.useState(0);

  React.useEffect(() => {
    if (buttons.length <= 0) return;
    game_increment_sequence(BASE_SEQ_LEN);
  }, [buttons]);

  React.useEffect(() => {
    rset_show_state(-1);
  }, [seq])

  React.useEffect(() => {
    if (show_state < seq.length * 2 + 1) {
      setTimeout(() => {
        rset_show_state(show_state + 1);
      }, Math.max(SEQ_TIME_MIN, BASE_SEQ_TIME - SEQ_TIME_DEC * level));
    }
  }, [show_state])

  const game_increment_sequence = (num) => {
    let new_seq = [...seq];
    for (let i = 0;i < num;i++) {
      new_seq.push(Math.floor(Math.random() * buttons.length));
    }
    rset_seq(new_seq);
  }

  const game_generate_button = (num) => {
    return num.toString();
  }
  
  const game_btn_click = (id) => {
    console.log(click_state);
    if (id == seq[click_state]) {
      if (click_state >= seq.length - 1) {
        rset_click_state(0);
        rset_level(level+1);
        game_increment_sequence(SEQ_PER_LEVEL);
      } else {
        rset_click_state(click_state + 1);
      }
    } else {
      rset_app_state("lose");
    }
  }

  return (
    <div>
      {DEBUG && <p>App State: {app_state}</p>}
      {(app_state === "start") && <StartDisplay 
      onStart={() => {
        rset_app_state("game");
        let new_buttons = []
        for (let i = 0;i < BASE_BTN_COUNT;i++) {
          new_buttons.push(game_generate_button(i));
        }
        rset_buttons(new_buttons);
      }}/>}

      {(app_state === "game") && <GameDisplay 
        level={level}
        button_arr={
          buttons.map((index, text) => {
            return <button 
            style={(seq[show_state / 2] == index) ? {"backgroundColor": "red"} : {}}
            onClick={() => game_btn_click(index)}
            >{text}</button>
          }
        )} />}

      {(app_state === "lose") && <LoseDisplay 
        level={level}
        onRestart={() => {
          rset_buttons([]);
          rset_seq([]);
          rset_level(0);
          rset_click_state(0);
          rset_show_state(0);
          rset_app_state("start");
        }}/>}
    </div>
  );
}

export default App;
