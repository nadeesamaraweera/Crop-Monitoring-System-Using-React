import {Fields} from "../models/fieldModel.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Fields[] = [];

const fieldSlice = createSlice({
    name: 'field',
    initialState,
    reducers: {
        addField(state, action: PayloadAction<Fields>) {
            state.push(action.payload);
        },
        updateField(state, action: PayloadAction<Fields>) {
            return state.map(field =>
                field.id === action.payload.id ? action.payload : field
            );
        },
        deleteField(state, action: PayloadAction<string>) {
            return state.filter(field => field.id !== action.payload);
        },
    },
});

export const {addField, updateField, deleteField} = fieldSlice.actions;
export default fieldSlice.reducer;