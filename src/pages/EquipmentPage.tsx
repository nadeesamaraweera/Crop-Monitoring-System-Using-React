import { Equipments } from "../components/interfaces/equipment.ts";
import { useState } from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout.tsx";
import { TitleComponent } from "../components/common/TitleComponent.tsx";
import { AddButtonComponent } from "../components/common/AddButtonComponent.tsx";
import { CrudForm } from "../components/common/CrudFormComponent.tsx";
import { TableComponent } from "../components/common/TableComponent.tsx";
import { useDispatch, useSelector } from "react-redux";
import { addEquipment, deleteEquipment, updateEquipment } from "../slices/EquipmentSlice.tsx";
import { AlertComponent } from "../components/common/AlertComponent.tsx";

type InputType = "text" | "number" | "email" | "file" | "date" | "select";

export const EquipmentPage = () => {
    // @ts-ignore
    const equipments = useSelector((state) => state.equipment);
    const dispatch = useDispatch();

    const [editingEquipment, setEditingEquipment] = useState<Equipments | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setAlertType] = useState<"success" | "update" | "error" | "warning" | "delete">("success");
    const [alertMessage, setAlertMessage] = useState("");

    const columns = [
        { key: "id", header: "ID" },
        { key: "category", header: "Category" },
        { key: "type", header: "Type" },
        { key: "status", header: "Status" },
        { key: "fieldId", header: "Field" },
        { key: "staffId", header: "Staff" },
    ];

    const formFields: Array<{ name: keyof Equipments; label: string; type: InputType; required?: boolean; options?: string[] }> = [
        { name: "category", label: "Category", type: "select", options: ["Plough", "Mamotee", "Shovel", "Wheelbarrow","Sprayer","Axe","Seeder"], required: true },
        { name: "type", label: "Type", type: "select", options: ["Electrical", "Mechanical"], required: true },
        { name: "status", label: "Status", type: "select", options: ["Active", "Inactive", "Maintenance"], required: true },
        { name: "fieldId", label: "Field ID", type: "text", required: true },
        { name: "staffId", label: "Staff ID", type: "text", required: true },
    ];

    const handleSubmit = (data: Partial<Equipments>) => {
        if (editingEquipment) {
            dispatch(updateEquipment({ ...editingEquipment, ...data }));
            setAlertMessage("Equipment updated successfully!");
            setAlertType("update");
        } else {
            dispatch(addEquipment({ ...data, id: Date.now().toString() } as Equipments));
            setAlertMessage("Equipment added successfully!");
            setAlertType("success");
        }
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 3000);
        setIsFormOpen(false);
        setEditingEquipment(null);
    }

    const handleEdit = (equipment: Equipments) => {
        setEditingEquipment(equipment);
        setIsFormOpen(true);
    }

    const handleDelete = (id: string) => {
        dispatch(deleteEquipment(id));
        setAlertMessage("Equipment deleted successfully!");
        setAlertType("delete");
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 3000);
    }

    return (
        <DashboardLayout>
            <div className="flex justify-between items-center">
                <TitleComponent title="Equipment Section" fPath="Dashboard" sPath="Equipments" />
                <AddButtonComponent label="Add Equipment" onClick={() => setIsFormOpen(true)} />
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
                        data={editingEquipment || undefined}
                        onSubmit={handleSubmit}
                        onCancel={() => {
                            setIsFormOpen(false);
                            setEditingEquipment(null);
                        }}
                        fields={formFields}
                    />
                )}

                <TableComponent
                    columns={columns}
                    data={equipments}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </DashboardLayout>
    );
};
