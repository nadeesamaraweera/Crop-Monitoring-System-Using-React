import {Vehicles} from "../components/interfaces/vehicle.ts";
import {useState} from "react";
import {DashboardLayout} from "../components/layout/DashboardLayout.tsx";
import {TitleComponent} from "../components/common/TitleComponent.tsx";
import {AddButtonComponent} from "../components/common/AddButtonComponent.tsx";
import {CrudForm} from "../components/common/CrudFormComponent.tsx";
import {TableComponent} from "../components/common/TableComponent.tsx";
import {useDispatch, useSelector} from "react-redux";
import {addVehicle, deleteVehicle, updateVehicle} from "../slices/VehicleSlice.tsx";
import {AlertComponent} from "../components/common/AlertComponent.tsx";

type InputType = "text" | "number" | "email" | "file" | "date" | "select";

export const VehiclePage = () => {
    // @ts-ignore
    const vehicles = useSelector((state) => state.vehicle);
    const dispatch = useDispatch();

    const [editingVehicle, setEditingVehicle] = useState<Vehicles | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setAlertType] = useState<"success" | "update" | "error" | "warning" | "delete">("success");
    const [alertMessage, setAlertMessage] = useState("");

    const columns = [
        { key: "id", header: "ID" },
        { key: "category", header: "Category" },
        { key: "numberPlate", header: "Number" },
        { key: "fuelType", header: "Fuel" },
        { key: "status", header: "Status" },
        { key: "remarks", header: "Remarks" },
        { key: "staffId", header: "Staff" },
    ];

    const formFields: Array<{ name: keyof Vehicles; label: string; type: InputType; required?: boolean, options?: string[] }> = [
        { name: "category", label: "Category", type: "select", options: ["Car", "Motorbikes", "Land masters", "Van" ,"Land vehicle","ankers truck"], required: true },
        { name: "numberPlate", label: "Number Plate", type: "text", required: true },
        { name: "fuelType", label: "Fuel Type", type: "select", options: ["Petrol", "Diesel", "Electric"], required: true },
        { name: "status", label: "Status", type: "select", options: ["Available", "Out Of Service"], required: true },
        { name: "remarks", label: "Remarks", type: "text", required: true },
        { name: "staffId", label: "Staff ID", type: "text", required: true },
    ];

    const handleSubmit = (data: Partial<Vehicles>) => {
        if (editingVehicle) {
            dispatch(updateVehicle({ ...editingVehicle, ...data }));
            setAlertMessage("Vehicle updated successfully!");
            setAlertType("update");
        } else {
            dispatch(addVehicle({ ...data, id: Date.now().toString() } as Vehicles));
            setAlertMessage("Vehicle added successfully!");
            setAlertType("success");
        }
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 3000);
        setIsFormOpen(false);
        setEditingVehicle(null);
    }

    const handleEdit = (vehicle: Vehicles) => {
        setEditingVehicle(vehicle);
        setIsFormOpen(true);
    }

    const handleDelete = (id: string) => {
        dispatch(deleteVehicle(id));
        setAlertMessage("Vehicle deleted successfully!");
        setAlertType("delete");
        setAlertVisible(true);
    }

    return (
        <>
            <DashboardLayout>
                <div className="flex justify-between items-center">
                    <TitleComponent title="Vehicle Section" fPath="Dashboard" sPath="Vehicles" />
                    <AddButtonComponent label="Add Vehicle" onClick={() => setIsFormOpen(true)} />
                </div>

                <div className="p-6 space-y-6">
                    {alertVisible && (
                        <AlertComponent
                            message={alertMessage}
                            type={alertType}
                            onClose={() => setAlertVisible(false)}
                        />
                    )}

                    {isFormOpen && (
                        <CrudForm
                            data={editingVehicle || undefined}
                            onSubmit={handleSubmit}
                            onCancel={() => {
                                setIsFormOpen(false);
                                setEditingVehicle(null);
                            }}
                            fields={formFields}
                        />
                    )}

                    <TableComponent
                        columns={columns}
                        data={vehicles}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            </DashboardLayout>
        </>
    );
};
