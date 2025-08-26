import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
    query: string;
}

const initialState: SearchState = {
    query: "",
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        clearSearch: (state) => {
            state.query = "";
        },
    },
});

export const { setSearch, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
