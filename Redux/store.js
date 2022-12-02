import { configureStore } from "@reduxjs/toolkit";
import recentsSlice from "./Recents/recentsSlice";

export const store = configureStore({
	reducer: {
		recent: recentsSlice,
	},
});
