export class User {
    public id?:string;
    public firstName: string;
    public middleName: string;
    public lastName: string;
    public phoneNo: string;
    public email: string;
    public dateOfBirth: string;
    public gender: number;
    public bloodGroup: string;
    public address: string;
    public skills: string[];

    constructor(
        firstName: string,
        middleName: string,
        lastName: string,
        phoneNo: string,
        email: string,
        dateOfBirth: string,
        gender: number,
        bloodGroup: string,
        address: string,
        skills: string[]) {

        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.phoneNo = phoneNo;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.bloodGroup = bloodGroup;
        this.address = address;
        this.skills = skills;
        
    }
}