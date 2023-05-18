import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import arrow from "../../image/arrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { addToLinksHistory, setCurrentLink } from "../../store/slice/inputSlice";

export default function LinkInput() {
  const [localLink, setLocalLink] = useState("");
  const [errStatus, setErrStatus] = useState("");
  const currentLink = useSelector((state) => state.link.currentLink);
  const dispatch = useDispatch();

  console.log(localLink);

  const inputTextHandler = (event) => {
    setLocalLink(event.target.value);
  };

  const btnClickHandler = () => {
    if (localLink.startsWith("https://")) {
      dispatch(setCurrentLink(localLink));
      dispatch(addToLinksHistory(localLink));
    } else {
      setErrStatus("Link does not start with 'https://'");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setErrStatus('')
    }, 3000);
  }, [errStatus])
  

  return (
    <Box>
      <Typography
        sx={{ color: "text.primary" }}
        mb={"1.4rem"}
        letterSpacing={-0.4}
        variant='h5'
      >
        Insert the link
      </Typography>

      <Box display={"flex"}>
        <TextField
          fullWidth
          placeholder='https://'
          variant='outlined'
          onChange={inputTextHandler}
          value={localLink}
          error={!!errStatus}
          helperText={errStatus ? errStatus : ""}
          sx={{
            "& fieldset": {
              border: "none",
            },
            "& ::placeholder": {
              fontSize: "1.5rem",
            },
            "& input": {
              fontSize: "1.5rem",
              width: "100%",
              py: "2rem",
            },
            backgroundColor: "#fff",
            width: "32.75rem",
            height: "6rem",
          }}
        />
        <Button
        onClick={btnClickHandler}
          variant='contained'
          sx={{
            boxShadow: "none",
            width: "6rem",
            bgcolor: "background.accent",
            borderRadius: 0,
            "&:hover": {
              backgroundColor: "background.accent",
              boxShadow: "none",
            },
          }}
        >
          <img src={arrow} />
        </Button>
      </Box>
    </Box>
  );
}
