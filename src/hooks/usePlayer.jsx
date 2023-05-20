import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCurrentLink } from "../store/slice/inputSlice";
import axios from "axios";

export default function usePlayer() {
  const currentLink = useSelector((state) => state.link.currentLink);
  const dispatch = useDispatch();
  const [playerStatus, setplayerStatus] = useState(false);
  const player = useRef(null);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSongLoaded, setisSongLoaded] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);


  useEffect(() => {
    setisSongLoaded(false);

    const audioElement = player.current;
    audioElement.src = currentLink;
    audioElement.load();

    audioElement.addEventListener("canplay", () => {
		setisSongLoaded(true);
    });

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

  const handleSpeedChange = (event, newValue) => {
    console.log(newValue);
    const speed = parseFloat(newValue);
    setPlaybackSpeed(speed);
    player.current.playbackRate = speed;
  };

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
  return {
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
  };
}
