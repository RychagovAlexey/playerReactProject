import { Box, Slider, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { removeCurrentLink } from "../../store/slice/inputSlice";
import Pause from "../../image/Pause.svg";
import Play from "../../image/Play.svg";

export default function Player() {
  const currentLink = useSelector((state) => state.link.currentLink);
  const dispatch = useDispatch();
  const [playerStatus, setplayerStatus] = useState(false);
  const player = useRef(null);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audioElement = player.current;

    const handleLoadedData = () => {
      setDuration(audioElement.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime);
    };

    audioElement.addEventListener("loadeddata", handleLoadedData);
    audioElement.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audioElement.removeEventListener("loadeddata", handleLoadedData);
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const handleTimeChange = (event, newValue) => {
    const audioElement = player.current;
    audioElement.currentTime = newValue;
    setCurrentTime(newValue);
  };

  const backToInputHandler = () => {
    dispatch(removeCurrentLink());
  };

  const playerStatusHandler = () => {
    setplayerStatus((prev) => !prev);
    playerStatus ? player.current.pause() : player.current.play();
  };
  const handleVolumeChange = (event, newValue) => {
    const audioElement = player.current;
    audioElement.volume = newValue;
    setVolume(newValue);
  };
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds) % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <Box>
      <Typography
        variant='h5'
        mb={"1.5rem"}
        onClick={backToInputHandler}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "5.5rem",
          cursor: "pointer",
        }}
      >
        <ArrowBackIcon />
        Back
      </Typography>
      <Box
        width={"620px"}
        height={"198px"}
        sx={{
          backgroundColor: "background.player",
          position: "relative",
        }}
      >
        <Box ml={"20px"} pt={"20px"}>
          {playerStatus ? (
            <img
              src={Pause}
              onClick={playerStatusHandler}
              style={{ cursor: "pointer" }}
              alt='Stop Music'
            />
          ) : (
            <img
              src={Play}
              onClick={playerStatusHandler}
              style={{ cursor: "pointer" }}
              alt='Play Music'
            />
          )}
        </Box>

        <Box
          sx={{
            mx: "20px",
            mt: "45px",
          }}
        >
          <Slider
            value={currentTime}
            min={0}
            max={duration}
            onChange={handleTimeChange}
            aria-labelledby='continuous-slider'
            sx={{
              color: "#ADACAD",
              "& .MuiSlider-thumb": {
                backgroundColor: "white",
				transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
              },
            }}
          />
        </Box>

        <Box
          sx={{
            mx: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>{formatTime(currentTime)}</Typography>
          <Slider
            value={volume}
            onChange={handleVolumeChange}
            min={0}
            max={1}
            step={0.1}
			sx={{
				width: '252px',
				color: 'white',
				'& .MuiSlider-track':{
					color: 'black'
				},
				"& .MuiSlider-thumb": {
					backgroundColor: "black",
					transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
					width: '1rem',
					height: '0.75rem',
					borderRadius: 0
				  },
			}}
          />
        </Box>
      </Box>
      <audio ref={player} className='player' controls src={currentLink}></audio>
    </Box>
  );
}
