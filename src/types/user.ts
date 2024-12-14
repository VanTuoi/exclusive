export interface UserDataRegister {
    name: string;
    contactField: string;
    password: string;
}

export interface UserData {
    id?: string;
    firstName: string;
    lastName: string;
    currentPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
    emailAddress?: string;
    city: string;
    streetAddress: string;
    phone?: string;
}

export interface UpdateUserData {
    id?: string;
    firstName?: string;
    lastName?: string;
    emailAddress?: string;
    streetAddress?: string;
    currentPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
}
