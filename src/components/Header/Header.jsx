import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import arrow from "../../image/arrow.svg";
export default function Header() {
  return (
    <Box
      sx={{
        margin: ".75rem",
        height: 490,
        backgroundColor: "background.paper",
        display: "flex",
        // justifyContent: 'space-around',
        alignItems: "center",
      }}
    >
      <Box width={492} sx={{ color: "text.secondary", marginLeft: "40px" }}>
        <Typography variant='h3' letterSpacing={-1}>
          Play any audio sources directly in the browser!
        </Typography>
        <Typography
          mt={"1.5rem"}
          variant='h5'
          fontWeight={300}
          letterSpacing={-0.4}
        >
          Without any restrictions for free
        </Typography>
        <Typography
          display={"inline-block"}
          mr={"1rem"}
          mt={"11.375rem"}
          variant='caption'
          fontWeight={300}
          letterSpacing={-0.3}
        >
          By uploading the audio file, you agree to our
          <a
            style={{
              fontWeight: 400,
              textDecoration: "none",
              color: "#000",
              display: "inline-block",
              marginLeft: "4px",
            }}
            href='/'
          >
            Terms of Service.
          </a>
        </Typography>
      </Box>

      <Box>
        <Typography
          sx={{ color: "text.secondary" }}
          mb={"1.4rem"}
          letterSpacing={-0.4}
          variant='h5'
        >
          Insert the link
        </Typography>

        <Box display={"flex"}>
          <TextField
            fullWidth
            variant='outlined'
            sx={{
              "& fieldset": {
                border: "none",
                // borderRadius: 0,
              },
              backgroundColor: "#fff",
              width: "32.75rem",
              height: "6rem",
            }}
          />
          <Button
            variant='contained'
            sx={{
              boxShadow: "none",
              width: "6rem",
              bgcolor: "background.accent",
              borderRadius: 0,
              "&:hover": {
                backgroundColor: "background.accent",
              },
            }}
          >
            <img src={arrow} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
