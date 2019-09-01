export interface UnregisteredUser {
    displayName: string;
    email?: string;
    phoneNumber?: string;
    sendBookedMail?: boolean;
}


export const isSameUnregisteredUser = (a: UnregisteredUser, b: UnregisteredUser) => {
    return a.displayName === b.displayName
        && a.email === b.email
        && a.phoneNumber === b.phoneNumber;
};
