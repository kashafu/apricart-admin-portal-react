import { configureStore } from "@reduxjs/toolkit";

import { apisReducer } from "./apis.slice"
import recentsSlice from "./Recents/recentsSlice";

export const store = configureStore({
	reducer: {
		recent: recentsSlice,
		apis: apisReducer
	},
});
