import { configureStore } from "@reduxjs/toolkit"
import themeSlice from "./Slice/themeSlice"
import jsonInputSlice from "./Slice/jsonInputSlice"

export const store = configureStore({
    reducer: {
        theme: themeSlice,
        jsonInputValue: jsonInputSlice
    }
})