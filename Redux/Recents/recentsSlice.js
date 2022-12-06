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
			let isExistIndex = recents.findIndex((each) => each.name === action.payload.name)

			if (isExistIndex !== -1) {
				recents.splice(isExistIndex, 1)
			}

			if (recents.length === 6) {
				recents.splice(-1);
			}
			recents.unshift(action.payload);

		},
		selectTabs: (state, action) => {
			state.tabs = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { addToRecent, selectTabs } = recentsSlice.actions;

export default recentsSlice.reducer;
