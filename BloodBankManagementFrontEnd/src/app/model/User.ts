import { Role } from "./Role";

export class User {
    email: string;
    name: string;
    bloodGroup: string;
    gender: string;
    age: number;
    role: Role;
    mobileNumber: string;
    password: string;

    constructor(email: string, name: string, bloodGroup: string, gender: string, age: number, role: Role, mobileNumber: string, password: string) {
        this.email = email;
        this.name = name;
        this.bloodGroup = bloodGroup;
        this.gender = gender;
        this.age = age;
        this.role = role;
        this.mobileNumber = mobileNumber;
        this.password = password;
    }
}
