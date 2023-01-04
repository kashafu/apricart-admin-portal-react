import { createSlice } from "@reduxjs/toolkit"

const apisSlice = createSlice({
	name: "apis",
	initialState: [],
	reducers: {
		initializeApis: (state, action) => {
			state.splice(0, state.length)
			action.payload.forEach(element => {
				state.push(element)
			});
		},
	},
})

export const apisReducer = apisSlice.reducer

export const {
	initializeApis
} = apisSlice.actions
