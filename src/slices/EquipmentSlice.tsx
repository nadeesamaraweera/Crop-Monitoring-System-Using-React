import {Equipment} from "../models/equipmentModel.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Equipment[] = [];

const equipmentSlice = createSlice({
    name: "equipment",
    initialState,
    reducers: {
        addEquipment: (state, action: PayloadAction<Equipment>) => {
            state.push(action.payload);
        },
        updateEquipment: (state, action: PayloadAction<Equipment>) => {
            const index = state.findIndex((equipment) => equipment.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteEquipment: (state, action: PayloadAction<string>) => {
            return state.filter((equipment) => equipment.id !== action.payload);
        },
    },
});

export const { addEquipment, updateEquipment, deleteEquipment } = equipmentSlice.actions;
export default equipmentSlice.reducer;