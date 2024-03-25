import { configureStore } from "@reduxjs/toolkit";

import filtersReducer from "./filters/filters.slice";
import apiSlice from "./api/api.slice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        filters: filtersReducer,
    },
    middleware: getDefault => getDefault().concat(apiSlice.middleware),
});

export default store;