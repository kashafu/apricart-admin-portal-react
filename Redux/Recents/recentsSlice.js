import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	recents: [],
};

export const recentsSlice = createSlice({
	name: "recent",
	initialState,
	reducers: {
		addToRecent: (state, action) => {
			const { recents } = state;
			if (recents.length === 6) {
				recents.splice(-1);
			}
			recents.unshift(action.payload);
		},
	},
});

// Action creators are generated for each case reducer function
export const { addToRecent } = recentsSlice.actions;

export default recentsSlice.reducer;
