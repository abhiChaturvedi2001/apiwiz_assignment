import { createSlice } from '@reduxjs/toolkit'


const jsonInputSlice = createSlice({
    name: "inputSlice",
    initialState: {
        jsonInput: ""
    },
    reducers: {
        setJsonInputValue: (state, action) => {
            state.jsonInput = action.payload
        }
    }
});

export const { setJsonInputValue } = jsonInputSlice.actions

export default jsonInputSlice.reducer