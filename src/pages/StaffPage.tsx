import {Staff} from "../components/interfaces/staff.ts";
import {useState} from "react";
import {DashboardLayout} from "../components/layout/DashboardLayout.tsx";
import {TitleComponent} from "../components/common/TitleComponent.tsx";
import {AddButtonComponent} from "../components/common/AddButtonComponent.tsx";
import {CrudForm} from "../components/common/CrudFormComponent.tsx";
import {TableComponent} from "../components/common/TableComponent.tsx";
import {useDispatch, useSelector} from "react-redux";
import {addStaff, deleteStaff, updateStaff} from "../slices/StaffSlice.tsx";
import {AlertComponent} from "../components/common/AlertComponent.tsx";

type InputType = "text" | "number" | "email" | "file" | "date" | "select";

export const StaffPage = () => {
    // @ts-ignore
    const staff = useSelector((state) => state.staff);
    const dispatch = useDispatch();

    const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setAlertType] = useState<"success" | "update" | "error" | "warning" | "delete">("success");
    const [alertMessage, setAlertMessage] = useState("");

    const columns = [
        { key: "id", header: "ID" },
        { key: "Name", header: "Name" },
        { key: "designation", header: "Designation" },
        { key: "gender", header:"Gender"},
        { key: "joiningDate", header:"Reg."},
        { key: "dateOfBirth", header:"DOB"},
        { key: "address", header: "Address"},
        { key: "mobile", header:"Mobile"},
        { key: "email", header:"Email"},
        { key: "role", header:"Role"},
    ];

    const formFields: Array<{ name: keyof Staff; label: string; type: InputType; options?: string[]; required?: boolean }> = [
        { name: "firstName", label: "First Name", type: "text", required: true },
        { name: "lastName", label: "Last Name", type: "text", required: true },
        { name: "designation", label: "Designation", type: "text", required: true },
        { name: "gender", label: "Gender", type: "select", options: ["Female", "Male"], required: true },
        { name: "joiningDate", label: "Joining Date", type: "date", required: true },
        { name: "dateOfBirth", label: "Date of Birth", type: "date", required: true },
        { name: "addressLine1", label: "Address Line 1", type: "text", required: true },
        { name: "addressLine2", label: "Address Line 2", type: "text", required: true },
        { name: "addressLine3", label: "Address Line 3", type: "text", required: true },
        { name: "addressLine4", label: "Address Line 4", type: "text", required: true },
        { name: "addressLine5", label: "Address Line 5", type: "text", required: true },
        { name: "mobile", label: "Mobile", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "role", label: "Role", type: "select", options: ["Administrator", "Manager", "Scientist", "Other"], required: true },
    ];

    const handleSubmit = (data: Partial<Staff>) => {
        if (editingStaff) {
            dispatch(updateStaff({ ...editingStaff, ...data }));
            setAlertMessage("Staff updated successfully!");
            setAlertType("update");
        } else {
            dispatch(addStaff({ ...data, id: Date.now().toString() } as Staff));
            setAlertMessage("Staff added successfully!");
            setAlertType("success");
        }
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 3000);
        setIsFormOpen(false);
        setEditingStaff(null);
    };

    const handleEdit = (staff: Staff) => {
        setEditingStaff(staff);
        setIsFormOpen(true);
    };

    const handleDelete = (id: string) => {
        dispatch(deleteStaff(id));
        setAlertMessage("Staff deleted successfully!");
        setAlertType("delete");
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 3000);
    };

    return (
        <>
            <DashboardLayout>
                <div className="flex justify-between items-center">
                    <TitleComponent title="Staff Section" fPath="Dashboard" sPath="Staff" />
                    <AddButtonComponent label="Add Staff" onClick={() => setIsFormOpen(true)} />
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
                            data={editingStaff || undefined}
                            onSubmit={handleSubmit}
                            onCancel={() => {
                                setIsFormOpen(false);
                                setEditingStaff(null);
                            }}
                            fields={formFields}
                        />
                    )}
                    <TableComponent
                        data={staff}
                        columns={columns}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            </DashboardLayout>
        </>
    );
};
