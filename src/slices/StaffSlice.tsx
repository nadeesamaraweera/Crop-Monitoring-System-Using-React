import {Staff} from "../models/staffModel.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Staff[] = [];

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        addStaff(state, action: PayloadAction<Staff>) {
            state.push(action.payload);
        },
        updateStaff(state, action: PayloadAction<Staff>) {
            return state.map(staff =>
                staff.id === action.payload.id ? action.payload : staff
            );
        },
        deleteStaff(state, action: PayloadAction<string>) {
            return state.filter(staff => staff.id !== action.payload);
        },
    },
});

export const { addStaff, updateStaff, deleteStaff } = staffSlice.actions;
export default staffSlice.reducer;