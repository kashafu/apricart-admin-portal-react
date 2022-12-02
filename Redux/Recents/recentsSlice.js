import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	recents: [],
	tabs: [],
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
		selectTabs: (state, action) => {
			state.tabs = action.payload;
			console.log(state.tabs);
		},
	},
});

// Action creators are generated for each case reducer function
export const { addToRecent, selectTabs } = recentsSlice.actions;

export default recentsSlice.reducer;
