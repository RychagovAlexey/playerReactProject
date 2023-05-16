import { createTheme } from '@mui/material/styles';

// A custom theme for this app

const theme = createTheme({
	typography: {
		fontFamily: 'Space Grotesk, Arial, sans-serif',
		// Customize other typography settings if needed
	},
	palette: {
		background: {
			paper: '#EEEEEE',
			default: '#1B191C',
			accent: '#F8D231'
		},
		text: {
			primary: '#F5F6F7',
			secondary: '#000',
			subtitle: '#1B191C',
		}
	  },
});

export default theme;
