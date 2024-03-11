export class Donors {
    id?: string;
    donorId: string;
    name: string;
    bloodGroup: string;
    units: number;
    mobileNumber: string;
    gender: string;
    age: number;
    city: string;
    address: string;
    date: Date;

    constructor(
        donorId: string,
        name: string,
        bloodGroup: string,
        units: number,
        mobileNumber: string,
        gender: string,
        age: number,
        city: string,
        address: string,
        date: Date
    ) {
        this.donorId = donorId;
        this.name = name;
        this.bloodGroup = bloodGroup;
        this.units = units;
        this.mobileNumber = mobileNumber;
        this.gender = gender;
        this.age = age;
        this.city = city;
        this.address = address;
        this.date = date;
    }
}
