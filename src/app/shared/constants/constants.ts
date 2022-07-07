export enum GENDER {
    Male = 0,
    Female = 1
}

export const ONLY_ALPHABETS_REGEX = /[^A-Za-z\s]*/;
export const ONLY_NUMBER_REGEX = /[^0-9]*/;
export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const PHONE_NO_REGEX = /^([0-9]){10}$/;
export const BLOOD_GROUP_REGEX = /^(A|B|AB|O)[+|-]$/i;
export const PINCODE_REGEX = /^([0-9]){6}$/;