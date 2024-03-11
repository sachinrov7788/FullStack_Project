export class BloodRequest {
    requestId: string;
    name: string;
    email: string;
    bloodGroup: string;
    units: number;
    disease: string;
    mobileNumber: string;
    gender: string;
    age: number;
    status: string;

    constructor(
        requestId: string,
        name: string,
        email: string,
        bloodGroup: string,
        units: number,
        disease: string,
        mobileNumber: string,
        gender: string,
        age: number,
        status: string
    ) {
        this.requestId = requestId;
        this.name = name;
        this.email = email;
        this.bloodGroup = bloodGroup;
        this.units = units;
        this.disease = disease;
        this.mobileNumber = mobileNumber;
        this.gender = gender;
        this.age = age;
        this.status = status;
    }
}
