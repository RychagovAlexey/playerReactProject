import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	currentLink: '',
	linksHistory: [],

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
			state.linksHistory = [...state.linksHistory, action.payload]
		},
	},
})

// Action creators are generated for each case reducer function
export const { setCurrentLink, removeCurrentLink, addToLinksHistory } = linkSlice.actions

export default linkSlice.reducer