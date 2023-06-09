import { Box, LinearProgress, Slider, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { removeCurrentLink } from "../../store/slice/inputSlice";
import Pause from "../../image/Pause.svg";
import Play from "../../image/Play.svg";
import usePlayer from "../../hooks/usePlayer";
import PanoramaHorizontalSelectIcon from '@mui/icons-material/PanoramaHorizontalSelect';

export default function Player() {
  const {
    backToInputHandler,
    playerStatus,
    playerStatusHandler,
    duration,
    handleTimeChange,
    formatTime,
    currentTime,
    volume,
    handleVolumeChange,
    player,
    currentLink,
    isSongLoaded,
    handleSpeedChange,
    playbackSpeed
  } = usePlayer();
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
        {isSongLoaded ? (
          ""
        ) : (
            <LinearProgress
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                backgroundColor: "inherit",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#ffffff",
                },
              }}
            />
          )}
        <Box marginX={"20px"} pt={"20px"} display={'flex'} justifyContent={'space-between'}>
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
          <Box display={'flex'} width='12rem' alignItems='center' justifyContent='space-between'>
            <PanoramaHorizontalSelectIcon sx={{ fontSize: '1rem'}} />
            <Slider
               id="speed"
               value={playbackSpeed}
               min={0.5}
               max={2}
               step={0.1}
               onChange={handleSpeedChange}
              sx={{
                width: '6rem',
                color: "#ADACAD",
                "& .MuiSlider-thumb": {
                  backgroundColor: "white",
                  transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                },
              }}
            />
            <PanoramaHorizontalSelectIcon />

          </Box>
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
                transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
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
              width: "252px",
              color: "white",
              "& .MuiSlider-track": {
                color: "black",
              },
              "& .MuiSlider-thumb": {
                backgroundColor: "black",
                transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                width: "1rem",
                height: "0.75rem",
                borderRadius: 0,
              },
            }}
          />
        </Box>
      </Box>
      <audio ref={player} className='player' controls src={currentLink}></audio>
    </Box>
  );
}
