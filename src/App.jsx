import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [sound, setSound] = useState("");
  const [on, setOn] = useState(true);
  const [soundVolume, setSoundVolume] = useState(60);

  useEffect(() => {
    document.addEventListener("keydown", listener);
  }, []);
  // const show = function (e) {
  //   console.log(e.key)
  // }

  // return (
  //   <>
  //     <div id="container" onKeyDown={show}>
  //       <button id="btn">G</button>
  //       <button id="btn">N</button>
  //       <button id="btn"> M</button>
  //       <p>whereare you going </p>
  //     </div>
  //   </>
  // );
  const handleOnchange = function () {
    let range_volume = document.getElementById("rangeVolume").value;
    setSoundVolume(range_volume);
    console.log(soundVolume);
  };
  const listener = function (e) {
    console.log(e.key);
    let keyp = e.key;

    playsound(keyp.toUpperCase());
    console.log("remove");
  };
  const drumpads = [
    {
      keyCode: 81,
      keyTrigger: "Q",
      id: "Heater-1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    },
    {
      keyCode: 87,
      keyTrigger: "W",
      id: "Heater-2",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    },
    {
      keyCode: 69,
      keyTrigger: "E",
      id: "Heater-3",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    },
    {
      keyCode: 65,
      keyTrigger: "A",
      id: "Heater-4",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    },
    {
      keyCode: 83,
      keyTrigger: "S",
      id: "Clap",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    },
    {
      keyCode: 68,
      keyTrigger: "D",
      id: "Open-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    },
    {
      keyCode: 90,
      keyTrigger: "Z",
      id: "Kick-n'-Hat",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    },
    {
      keyCode: 88,
      keyTrigger: "X",
      id: "Kick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    },
    {
      keyCode: 67,
      keyTrigger: "C",
      id: "Closed-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    },
  ];

  function playsound(selector) {
    if (on) {
      const audio = document.getElementById(selector);

      if (audio) {
        console.log(audio);
        let id_sound = audio.parentNode.id;
        setSound(id_sound);
        audio.volume = Math.round(soundVolume / 100);
        audio.play();
      }
    }
  }
  const handleOnclick = function () {
    let ft = document.getElementById("switch_float");

    if (!on) {
      setOn(true);
    } else {
      setOn(false);
    }
    on ? (ft.style.float = "right") : (ft.style.float = "left");
  };

  return (
    <div id="drum-machine">
      <div id="display">{sound}</div>
      <div id="drumpad_container">
        {drumpads.map((drumpad) => (
          <div
            key={drumpad.id}
            className="drum-pad"
            id={drumpad.id}
            onClick={(e) => {
              playsound(drumpad.keyTrigger);
            }}
          >
            {drumpad.keyTrigger}
            <audio
              src={drumpad.url}
              id={drumpad.keyTrigger}
              className="clip"
            ></audio>
          </div>
        ))}
      </div>
      <Power onOn={handleOnclick} />
      <Slider onVolumeChange={handleOnchange} volumeValue={soundVolume} />
    </div>
  );
}

export default App;

function Power({ onOn }) {
  return (
    <>
      <div className="switch" onClick={onOn}>
        <div id="switch_float"></div>
      </div>
    </>
  );
}

function Slider({ onVolumeChange, volumeValue }) {
  return (
    <>
      <input
        type="range"
        id="rangeVolume"
        defaultValue={volumeValue}
        min={0}
        max={1}
        step={0.01}
        onChange={onVolumeChange}
      />
    </>
  );
}
