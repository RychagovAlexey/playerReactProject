import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Box } from '@mui/material';
import { useState } from 'react';
import LinkInput from './components/LinkInput/LinkInput';
import Player from './components/Player/Player';
import { useSelector } from 'react-redux';

function App() {
  const currentLink = useSelector((state) => state.link.currentLink)
  return (
    <Box>
      {!currentLink ? <LinkInput /> : <Player />}
    </Box>
  );
}

export default App;
