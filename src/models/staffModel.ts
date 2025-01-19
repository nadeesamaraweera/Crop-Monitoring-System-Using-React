export class Staff {
    id: string;
    firstName: string;
    lastName: string;
    designation: string;
    gender: string;
    joiningDate: string;
    dateOfBirth: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    addressLine4: string;
    addressLine5: string;
    mobile: string;
    email: string;
    role: string;

    constructor(id: string, firstName: string, lastName: string, designation: string, gender: string, joiningDate: string, dateOfBirth: string, addressLine1: string, addressLine2: string, addressLine3: string, addressLine4: string, addressLine5: string, mobile: string, email: string, role: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.designation = designation;
        this.gender = gender;
        this.joiningDate = joiningDate;
        this.dateOfBirth = dateOfBirth;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.addressLine3 = addressLine3;
        this.addressLine4 = addressLine4;
        this.addressLine5 = addressLine5;
        this.mobile = mobile;
        this.email = email;
        this.role = role;
    }
}