import { Crops } from "../components/interfaces/crops.ts";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashboardLayout } from "../components/layout/DashboardLayout.tsx";
import { TitleComponent } from "../components/common/TitleComponent.tsx";
import { AddButtonComponent } from "../components/common/AddButtonComponent.tsx";
import { TableComponent } from "../components/common/TableComponent.tsx";
import { CrudForm } from "../components/common/CrudFormComponent.tsx";
import { addCrop, deleteCrop, updateCrop } from "../slices/CropSlice.tsx";
import { AlertComponent } from "../components/common/AlertComponent.tsx";

type InputType = "text" | "number" | "email" | "file" | "date" | "select";



export const CropsPage = () => {
    // @ts-ignore
    const crops = useSelector((state) => state.crop);
    const dispatch = useDispatch();

    const [editingCrop, setEditingCrop] = useState<Crops | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setAlertType] = useState<"success" | "update" | "error" | "warning" | "delete">("success");
    const [alertMessage, setAlertMessage] = useState("");

    const columns = [
        { key: "id", header: "Crop ID" },
        { key: "commonName", header: "Common Name" },
        { key: "scientificName", header: "Scientific Name" },
        { key: "category", header: "Category" },
        { key: "season", header: "Season" },
    ];

    const formFields: Array<{
        name: keyof Crops;
        label: string;
        type: InputType;
        required?: boolean;
        options?: string[]; // Add options for dropdowns
    }> = [
        { name: "commonName", label: "Common Name", type: "text", required: true },
        { name: "scientificName", label: "Scientific Name", type: "text", required: true },
        { name: "category", label: "Category", type: "select", options: ["Fruit", "Vegetable", "Grain","Diary" ,"Meat","Poultry","Nuts"], required: true },
        { name: "season", label: "Season", type: "select", options: ["Summer", "Winter", "Spring", "Autumn"], required: true },
        { name: "img", label: "Image 1", type: "file" },
    ];


    const handleSubmit = (data: Partial<Crops>) => {
        if (editingCrop) {
            dispatch(updateCrop({ ...editingCrop, ...data }));
            setAlertMessage("Crop updated successfully!");
            setAlertType("update");
        } else {
            dispatch(addCrop({ ...data, id: Date.now().toString() } as Crops));
            setAlertMessage("Crop added successfully!");
            setAlertType("success");
        }
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 3000);
        setIsFormOpen(false);
        setEditingCrop(null);
    };

    const handleEdit = (crop: Crops) => {
        setEditingCrop(crop);
        setIsFormOpen(true);
    };

    const handleDelete = (id: string) => {
        dispatch(deleteCrop(id));
        setAlertMessage("Crop deleted successfully!");
        setAlertType("delete");
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 3000);
    };

    return (
        <>
            <DashboardLayout>
                <div className="flex justify-between items-center">
                    <TitleComponent
                        title="Crop Section"
                        fPath="Dashboard"
                        sPath="Crops"
                    />
                    <AddButtonComponent
                        label="Add Crop"
                        onClick={() => setIsFormOpen(true)}
                    />
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
                            data={editingCrop || undefined}
                            onSubmit={handleSubmit}
                            onCancel={() => {
                                setIsFormOpen(false);
                                setEditingCrop(null);
                            }}
                            fields={formFields}
                        />
                    )}

                    <TableComponent
                        data={crops}
                        columns={columns}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            </DashboardLayout>
        </>
    );
};
