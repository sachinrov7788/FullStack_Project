export class BloodDetails {
    email: string;
    bloodGroup: string;
    units: number;

    constructor(bloodGroup: string, email: string, units: number) {
        this.email = email
        this.bloodGroup = bloodGroup;
        this.units = units;
    }
}
