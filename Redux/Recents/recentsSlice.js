import { createSlice } from "@reduxjs/toolkit";

import {
	getItemLocalStorage,
	setItemLocalStorage,
} from "../../helpers/Storage";

const initialState = {
	recents: getItemLocalStorage("recents")
		? JSON.parse(getItemLocalStorage("recents"))
		: [],
	tabs: getItemLocalStorage("tabs")
		? JSON.parse(getItemLocalStorage("tabs"))
		: [],
};

export const recentsSlice = createSlice({
	name: "recent",
	initialState,
	reducers: {
		addToRecent: (state, action) => {
			const { recents } = state;
			let isExistIndex = recents.findIndex(
				(each) => each.name === action.payload.name
			);

			if (isExistIndex !== -1) {
				recents.splice(isExistIndex, 1);
			}

			if (recents.length === 6) {
				recents.splice(-1);
			}
			recents.unshift(action.payload);
			setItemLocalStorage("recents", JSON.stringify(recents));
		},
		selectTabs: (state, action) => {
			state.tabs = action.payload;
			setItemLocalStorage("tabs", JSON.stringify(state.tabs));
		},
		deleteEntry: (state, action) => {
			const { recents } = state;
			recents.splice(action.payload, 1);
			setItemLocalStorage("recents", JSON.stringify(recents));
		},
	},
});

// Action creators are generated for each case reducer function
export const { addToRecent, selectTabs, deleteEntry } = recentsSlice.actions;

export default recentsSlice.reducer;
