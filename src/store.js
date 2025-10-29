import { configureStore } from "@reduxjs/toolkit"
import themeSlice from "./Slice/themeSlice"

export const store = configureStore({
    reducer: {
        theme: themeSlice
    }
})