import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Crops } from "../components/interfaces/crops";

const initialState: Crops[] = []

const cropSlice = createSlice({
    name: "crop",
    initialState,
    reducers: {
        addCrop: (state, action: PayloadAction<Crops>) => {
            state.push(action.payload);
        },
        updateCrop: (state, action: PayloadAction<Crops>) => {
            const index = state.findIndex((crop) => crop.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteCrop: (state, action: PayloadAction<string>) => {
            return state.filter((crop) => crop.id !== action.payload);
        },
    },
});

export const { addCrop, updateCrop, deleteCrop } = cropSlice.actions;
export default cropSlice.reducer;
