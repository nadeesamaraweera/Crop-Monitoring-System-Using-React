import {Logs} from "../components/interfaces/logs.ts";
import {useState} from "react";
import {DashboardLayout} from "../components/layout/DashboardLayout.tsx";
import {CrudForm} from "../components/common/CrudFormComponent.tsx";
import {TableComponent} from "../components/common/TableComponent.tsx";
import {TitleComponent} from "../components/common/TitleComponent.tsx";
import {AddButtonComponent} from "../components/common/AddButtonComponent.tsx";
import {useDispatch, useSelector} from "react-redux";
import {addLog, deleteLog, updateLog} from "../slices/LogSlice.tsx";
import {AlertComponent} from "../components/common/AlertComponent.tsx";

type InputType = "text" | "number" | "email" | "file" | "date" | "time";

export const LogsPage = () => {
    // @ts-ignore
    const logs = useSelector((state) => state.log);
    const dispatch = useDispatch();

    const [editingLog, setEditingLog] = useState<Logs | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setAlertType] = useState<"success" | "update" | "error" | "warning" | "delete">("success");
    const [alertMessage, setAlertMessage] = useState("");

    const columns = [
        { key: "id", header: "Log ID" },
        { key: "date", header: "Date" },
        { key: "time", header: "Time" },
        { key: "details", header: "Details" },
        { key: "user", header: "User" },
        { key: "status", header: "Status" },
    ];

    const formFields: Array<{ name: keyof Logs; label: string; type: InputType; required?: boolean }> = [
        { name: "date", label: "Date", type: "date", required: true },
        { name: "time", label: "Time", type: "time", required: true },
        { name: "details", label: "Details", type: "text", required: true },
        { name: "user", label: "User", type: "text", required: true },
        { name: "status", label: "Status", type: "text", required: true },
    ];

    const handleSubmit = (data: Partial<Logs>) => {
        if (editingLog) {
            dispatch(updateLog({ ...editingLog, ...data }));
            setAlertMessage("Log updated successfully!");
            setAlertType("update");
        } else {
            dispatch(addLog({ ...data, id: Date.now().toString() } as Logs));
            setAlertMessage("Log added successfully!");
            setAlertType("success");
        }
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 3000);
        setIsFormOpen(false);
        setEditingLog(null);
    }

    const handleEdit = (log: Logs) => {
        setEditingLog(log);
        setIsFormOpen(true);
    }

    const handleDelete = (id: string) => {
        dispatch(deleteLog(id));
        setAlertMessage("Log deleted successfully!");
        setAlertType("delete");
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 3000);
    }

    return (
        <>
            <DashboardLayout>
                <div className="flex justify-between items-center">
                    <TitleComponent title="Log Section" fPath="Dashboard" sPath="Logs" />
                    <AddButtonComponent label="Add Log" onClick={() => setIsFormOpen(true)} />
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
                            data={editingLog || undefined}
                            onSubmit={handleSubmit}
                            onCancel={() => {
                                setIsFormOpen(false);
                                setEditingLog(null);
                            }}
                            fields={formFields}
                        />
                    )}

                    <TableComponent
                        columns={columns}
                        data={logs}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            </DashboardLayout>
        </>
    );
};