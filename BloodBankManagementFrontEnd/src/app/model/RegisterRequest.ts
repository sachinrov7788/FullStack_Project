export class RegisterRequest {
    email: string;
    name: string;
    bloodGroup: string;
    gender: string;
    age: number;
    mobileNumber: string;
    password: string;
    confirmPassword: string;

    constructor(
        email: string,
        name: string,
        bloodGroup: string,
        gender: string,
        age: number,
        mobileNumber: string,
        password: string,
        confirmPassword: string
    ) {
        this.email = email;
        this.name = name;
        this.bloodGroup = bloodGroup;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}
