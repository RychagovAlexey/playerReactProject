import { configureStore } from '@reduxjs/toolkit'
import linkReducer from './slice/inputSlice'


export const store = configureStore({
  reducer: {
	link: linkReducer,
  },
})