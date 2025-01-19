export class Vehicle {
    id: string;
    category: string;
    numberPlate: string;
    fuelType: number;
    status: string;
    remarks: string;
    staffId: string;

    constructor(id: string, category: string, numberPlate: string, fuelType: number, status: string, remarks: string, staffId: string) {
        this.id = id;
        this.category = category;
        this.numberPlate = numberPlate;
        this.fuelType = fuelType;
        this.status = status;
        this.remarks = remarks;
        this.staffId = staffId;
    }
}