export class Equipment {
    id: string;
    category: string;
    type: string;
    status: string;
    fieldId: string;
    staffId: string;

    constructor(id: string, category: string, type: string, status: string, fieldId: string, staffId: string) {
        this.id = id;
        this.category = category;
        this.type = type;
        this.status = status;
        this.fieldId = fieldId;
        this.staffId = staffId;
    }
}