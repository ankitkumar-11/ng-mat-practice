export class AdmissionDetail {
    public id?: string;
    public fullName: string;
    public email: string;
    public phoneNo: number;
    public dateOfBirth: string;
    public gender: number;
    public bloodGroup: string;
    public pinCode: number;
    public country: string;
    public state: string;
    public city: string;
    public address: string;
    public branch: string;
    public subjects: string[];

    constructor(fullName: string,
        email: string,
        phoneNo: number,
        gender: number,
        dateOfBirth: string,
        bloodGroup: string,
        pinCode: number,
        country: string,
        state: string,
        city: string,
        address: string,
        branch: string,
        subjects: string[],
        id?: string) {

        this.fullName = fullName;
        this.email = email;
        this.phoneNo = phoneNo;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.bloodGroup = bloodGroup;
        this.pinCode = pinCode;
        this.country = country;
        this.state = state;
        this.city = city;
        this.address = address;
        this.branch = branch;
        this.subjects = subjects;
        this.id = id;
    }
}