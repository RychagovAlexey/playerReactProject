import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import arrow from "../../image/arrow.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  addToLinksHistory,
  setCurrentLink,
} from "../../store/slice/inputSlice";

export default function LinkInput() {
  const [localLink, setLocalLink] = useState("");
  const [errStatus, setErrStatus] = useState("");
  const dispatch = useDispatch();
  const linksHistory = useSelector((state) => state.link.linksHistory);
  const handleCloseError = () => {
    setErrStatus("");
  };

  const inputTextHandler = (event) => {
    setLocalLink(event.target.value);
  };
  const handleAutocompleteChange = (event, value) => {
    setLocalLink(value || ''); // If no value is selected, set an empty string
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
      setErrStatus("");
      return;
    }, 5000);
  }, [errStatus]);

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
        <Autocomplete
          selectOnFocus
          freeSolo
          clearOnBlur
          onChange={handleAutocompleteChange}
          sx={{
            width: "32.75rem",
            height: "6rem",
          }}
          options={linksHistory}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                disableUpDownKeys: true,
                sx: {
                  height: '6rem',

                },
              }}
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
                  py: "1.5rem",
                },
                backgroundColor: "#fff",
                width: "32.75rem",
                height: "6rem",
                "@media (max-width: 568px)": {
                  width: "232px",
                  height: "64px",
                  "& input": {
                    fontSize: "1.5rem",
                    width: "100%",
                    py: "1rem",
                  },
                },
              }}
            />
          )}
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
            "@media (max-width: 568px)": {
              width: "64px",
            },
          }}
        >
          <img src={arrow} />
        </Button>
      </Box>
      <Snackbar
        open={!!errStatus}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert severity='error'>{errStatus}</Alert>
      </Snackbar>
    </Box>
  );
}
