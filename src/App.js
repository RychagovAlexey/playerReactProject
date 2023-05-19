import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import LinkInput from './components/LinkInput/LinkInput';
import Player from './components/Player/Player';
import { useDispatch, useSelector } from 'react-redux';
import { addToLinksHistory } from './store/slice/inputSlice';

function App() {
  const currentLink = useSelector((state) => state.link.currentLink)
  const dispatch = useDispatch()
  useEffect(() => {
    const linksHistory = JSON.parse(localStorage.getItem('linksHistory'))
    console.log(linksHistory);
    // linksHistory && dispatch(addToLinksHistory(linksHistory))
  }, [])
  
  return (
    <Box>
      {!currentLink ? <LinkInput /> : <Player />}
    </Box>
  );
}

export default App;
