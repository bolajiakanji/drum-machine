import React, { useEffect, useState } from "react";
import "./App.css";

const drumpadsOne = [
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
const drumpadsTwo = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
];

function App() {
  const [display, setDisplay] = useState("ON HEATER KIT");
  const [powerOn, setPowerOn] = useState(true);
  const [soundVolume, setSoundVolume] = useState(0.6);
  const [soundCategory, setSoundCategory] = useState(drumpadsOne);

  useEffect(() => {
    document.addEventListener("keydown", keyPadListener);

    return () => {
      document.removeEventListener("keydown", keyPadListener);
    };
  }, [powerOn, soundVolume]);

  const handleOnchange = function (e) {
    if (powerOn) {
      let rangeValue = e.target.value;
      setSoundVolume(rangeValue);
      setDisplay(`${Math.round(e.target.value * 100)}% VOLUME`);
      setTimeout(() => {
        setDisplay("");
      }, 500);
    }
  };

  const keyPadListener = function (e) {
    if (powerOn) {
      let keyValue = e.key;
      playSound(keyValue.toUpperCase());
    }
  };

  function handleKitClick() {
    if (powerOn) {
      let switchButtontwo = document.getElementsByClassName("switchButton");
      let switchTwo = document.getElementsByClassName("switch");
      if (soundCategory === drumpadsOne) {
        setDisplay("ON SMOOTH KIT");
        setSoundCategory(drumpadsTwo);
      } else {
        setDisplay("ON HEATER KIT");
        setSoundCategory(drumpadsOne);
      }
      switchButtontwo[1].style.float =
        soundCategory === drumpadsOne ? "left" : "right";
      switchTwo[1].style.backgroundColor =
        soundCategory === drumpadsOne ? " #ff3300" : "#cc9900";
    }
  }

  function playSound(selector) {
    if (powerOn) {
      const audio = document.getElementById(selector);
      if (audio) {
        let parentElement = audio.parentNode.id;
        setDisplay(parentElement);

        audio.volume = soundVolume;
        audio.play();
      }
    }
  }
  const handleOnclick = function () {
    let switchButtonOne = document.getElementsByClassName("switchButton");
    let switchOne = document.getElementsByClassName("switch");
    if (!powerOn) {
      setPowerOn(true);
      setDisplay(
        soundCategory === drumpadsOne ? "ON HEATER KIT" : "ON SMOOTH KIT"
      );
      switchButtonOne[0].style.float = "right";
      switchOne[0].style.backgroundColor = "#cc9900";
    } else {
      setPowerOn(false);
      setDisplay("");

      switchButtonOne[0].style.float = "left";
      switchOne[0].style.backgroundColor = " #a6a6a6";
    }
  };

  return (
    <div id="drum-machine">
      <div>
        <DrumPadKeys soundCategoryArray={soundCategory} playSound={playSound} />
      </div>
      <div>
        <Power onOn={handleOnclick} />
        <div id="display">{display}</div>
        <SoundBotton onKitClick={handleKitClick} />
        <Slider onVolumeChange={handleOnchange} volumeValue={soundVolume} />
      </div>
    </div>
  );
}

export default App;

function DrumPadKeys({ soundCategoryArray, playSound }) {
  return (
    <>
      <div id="drumpad_container">
        {soundCategoryArray.map((drumpad) => (
          <div
            key={drumpad.id}
            className="drum-pad"
            id={drumpad.id}
            onClick={(e) => {
              playSound(drumpad.keyTrigger);
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
    </>
  );
}

function Power({ onOn }) {
  return (
    <>
      <div className="switch" onClick={onOn}>
        <div className="switchButton"></div>
      </div>
    </>
  );
}
function SoundBotton({ onKitClick }) {
  return (
    <>
      <div className="switch" onClick={onKitClick}>
        <div className="switchButton"></div>
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
        value={volumeValue}
        min="0"
        max="1"
        step="0.01"
        onChange={onVolumeChange}
      />
    </>
  );
}
