import { DashboardLayout } from "../components/layout/DashboardLayout";
import { TitleComponent } from "../components/common/TitleComponent";
import { useState } from "react";
import { CrudForm } from "../components/common/CrudFormComponent.tsx";
import { AddButtonComponent } from "../components/common/AddButtonComponent";
import { TableComponent } from "../components/common/TableComponent.tsx";
import {Fields} from "../components/interfaces/fields.ts";
import {useDispatch, useSelector} from "react-redux";
import {addField, deleteField, updateField} from "../slices/FieldSlice.tsx";
import {AlertComponent} from "../components/common/AlertComponent.tsx";

type InputType = "text" | "number" | "email" | "file" | "date";

export const FieldsPage = () => {

    // @ts-ignore
    const fields = useSelector((state) => state.field);
    const dispatch = useDispatch();

    const [editingField, setEditingField] = useState<Fields | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setAlertType] = useState<"success" | "update" | "error" | "warning" | "delete">("success");
    const [alertMessage, setAlertMessage] = useState("");

    const columns = [
        { key: "id", header: "Field ID" },
        { key: "name", header: "Name" },
        { key: "location", header: "Location" },
        { key: "size", header: "Size" },
        { key: "staff", header: "Staff" },
    ];

    const formFields: Array<{ name: keyof Fields; label: string; type: InputType; required?: boolean }> = [
        { name: "name", label: "Name", type: "text", required: true },
        { name: "location", label: "Location", type: "text", required: true },
        { name: "size", label: "Size", type: "text", required: true },
        { name: "staff", label: "Staff", type: "text", required: true },
        { name: "img1", label: "Image 1", type: "file" },
        { name: "img2", label: "Image 2", type: "file" },
    ];

    const handleSubmit = (data: Partial<Fields>) => {
        if (editingField) {
            dispatch(updateField({ ...editingField, ...data }));
            setAlertMessage("Field updated successfully!");
            setAlertType("update");
        } else {
            dispatch(addField({ ...data, id: Date.now().toString() } as Fields));
            setAlertMessage("Field added successfully!");
            setAlertType("success");
        }
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 3000);
        setIsFormOpen(false);
        setEditingField(null);
    };

    const handleEdit = (field: Fields) => {
        setEditingField(field);
        setIsFormOpen(true);
    };

    const handleDelete = (id: string) => {
        dispatch(deleteField(id));
        setAlertMessage("Field deleted successfully!");
        setAlertType("delete");
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 3000);
    };

    return (
        <DashboardLayout>
            <div className="flex justify-between items-center">
                <TitleComponent title="Field Section" fPath="Dashboard" sPath="Fields" />
                <AddButtonComponent label="Add Field" onClick={() => setIsFormOpen(true)} />
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
                        data={editingField || undefined}
                        onSubmit={handleSubmit}
                        onCancel={() => {
                            setIsFormOpen(false);
                            setEditingField(null);
                        }}
                        fields={formFields}
                    />
                )}
                <TableComponent
                    data={fields}
                    columns={columns}
                    onEdit={handleEdit}
                    onDelete={handleDelete} />
            </div>
        </DashboardLayout>
    );
};