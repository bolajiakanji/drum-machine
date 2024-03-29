import React, { useEffect, useState } from "react";
import "./App.css";
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
const bankTwo = [
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
  const [sound, setSound] = useState("on smooth kit");
  const [on, setOn] = useState(true);
  const [soundVolume, setSoundVolume] = useState(0.6);
  const [drumSoundType, setDrumSoundType] = useState(drumpads);

  useEffect(() => {
    document.addEventListener("keydown", listener);
    document.getElementById("drum-machine").focus()
  return () => {document.removeEventListener("keydown", listener)}
  },[on, soundVolume]);
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
  const handleOnchange = function (e) {
    if (on) {
      let range_volume = e.target.value;
      setSoundVolume(e.target.value);
      console.log(soundVolume);
      setSound(`Volume : ${Math.round(e.target.value *100)}%`)
      // let audioElements = document.getElementsByClassName('clip');
      // for (let index=0; index<audioElements.length; index++) {
      //   audioElements[index].volume=e.target.value}
      setTimeout(() => {
        setSound(drumSoundType === drumpads ? "kit2" : "kit1")
      }, 700);
    }
  };
  const listener = function (e) {
    if (on) {
    
      let keyp = e.key;

      playsound(keyp.toUpperCase());
    return  console.log("remove");
    }
    return console.log('normal')
  };
  function soundtype() {
    if (on) {
      let ft = document.getElementsByClassName("switch_float");

      if (drumSoundType === drumpads) {
        setSound("kit1");
        setDrumSoundType(bankTwo);
      } else {
        setSound("kit2");
        setDrumSoundType(drumpads);
      }
      return drumSoundType === drumpads
        ? (ft[1].style.float = "right")
        : (ft[1].style.float = "left");
    }
  }

  function playsound(selector) {
    if (on) {
      const audio = document.getElementById(selector);

      if (audio) {
        console.log(on);
        let id_sound = audio.parentNode.id;
   setSound(id_sound);     
        setTimeout(() => {
          setSound(drumSoundType === drumpads ? "kit2" : "kit1"); 
        },2000);
        audio.volume = soundVolume
        console.log(audio.volume)
        audio.play();
      }
    }
    console.log(on)
  }
  const handleOnclick = function () {
    let ft = document.getElementsByClassName("switch_float");

    if (!on) {
      setOn(true);
      setSound(drumSoundType === drumpads ? "kit2" : "kit1");
    } else {
      setOn(false);
      setSound("");
    }
    on ? (ft[0].style.float = "right") : (ft[0].style.float = "left");
  };

  return (
    <div id="drum-machine">
      <div>comeout</div>
      <div id="display">{sound}</div>
      <div id="drumpad_container">
        {drumSoundType.map((drumpad) => (
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
      <SoundBotton onSoundType={soundtype} />
      <Slider onVolumeChange={handleOnchange} volumeValue={soundVolume} />
    </div>
  );
}

export default App;

//  drp.map((drhg,i,arr) => {
//  return (

//                 <div
//                   key={arr[i].id}
//                   className="drum-pad"
//                   id={arr[i].id}
//                   onClick={(e) => {
//                     playsound(arr[i].keyTrigger);
//                   }}
//                 >
//                   <p>{arr[i].keyTrigger}</p>
//                   <audio
//                     src={arr[i].u

function Power({ onOn }) {
  return (
    <>
      <div className="switch" onClick={onOn}>
        <div className="switch_float"></div>
      </div>
    </>
  );
}
function SoundBotton({ onSoundType }) {
  return (
    <>
      <div className="switch" onClick={onSoundType}>
        <div className="switch_float"></div>
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
