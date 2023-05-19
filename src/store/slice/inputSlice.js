import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	currentLink: '',
	linksHistory: JSON.parse(localStorage.getItem('linksHistory')) || [],

}

export const linkSlice = createSlice({
	name: 'link',
	initialState,
	reducers: {
		setCurrentLink: (state, action) => {
			state.currentLink = action.payload
		},
		removeCurrentLink: (state) => {
			state.currentLink = ''
		},
		addToLinksHistory: (state, action) => {
			if(state.linksHistory.includes(action.payload)){
				const updatedArray = state.linksHistory.filter((element) => element !== action.payload);
				state.linksHistory = [action.payload, ...updatedArray]
			} else {
				state.linksHistory = [action.payload, ...state.linksHistory]
			}
			localStorage.setItem('linksHistory', JSON.stringify(state.linksHistory));
		},
	},
})

// Action creators are generated for each case reducer function
export const { setCurrentLink, removeCurrentLink, addToLinksHistory } = linkSlice.actions

export default linkSlice.reducer