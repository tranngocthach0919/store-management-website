import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: '',
    page: 1,
};

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setSearch(state, action) {
            state.search = action.payload;
        },
        setPage(state, action) {
            state.page = action.payload;
        }
    },
});

export const { setSearch, setPage } = filtersSlice.actions;

export default filtersSlice.reducer;
