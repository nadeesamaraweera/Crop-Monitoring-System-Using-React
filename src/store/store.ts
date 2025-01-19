import {configureStore} from "@reduxjs/toolkit";
import CropSlice from "../slices/CropSlice.tsx";
import FieldSlice from "../slices/FieldSlice.tsx";
import StaffSlice from "../slices/StaffSlice.tsx";
import LogSlice from "../slices/LogSlice.tsx";
import VehicleSlice from "../slices/VehicleSlice.tsx";
import EquipmentSlice from "../slices/EquipmentSlice.tsx";

export const store = configureStore({
    reducer: {
        crop: CropSlice,
        field: FieldSlice,
        staff: StaffSlice,
        log: LogSlice,
        vehicle: VehicleSlice,
        equipment: EquipmentSlice,
    },
});
