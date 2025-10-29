import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        themeToggle: "light", // or "dark"
    },
    reducers: {
        toggleTheme: (state) => {
            state.themeToggle = state.themeToggle === "light" ? "dark" : "light";
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
