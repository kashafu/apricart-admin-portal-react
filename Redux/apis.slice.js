import { createSlice } from "@reduxjs/toolkit"

const apisSlice = createSlice({
	name: "apis",
	initialState: [],
	reducers: {
		initializeApis: (state, action) => {
			state.categories = action.payload
		},
	},
})

export const apisReducer = apisSlice.reducer

export const {
	initializeApis
} = apisSlice.actions
