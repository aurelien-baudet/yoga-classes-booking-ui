import { ContactInfo } from './contact';

export enum Role {
    STUDENT = 'STUDENT',
    TEACHER = 'TEACHER'
}

export interface Account {
    login: string;
    password?: string;
    roles: Role[];
}


export interface User {
    id: string;
    displayName: string;
    account: Account;
    registered: true;
    contact: ContactInfo;
}
export class User implements User {
    constructor(user: User) {
        this.id = user.id;
        this.displayName = user.displayName;
        this.contact = user.contact;
        this.account = user.account;
        this.registered = true;
    }

    static from(user?: User) {
        return user ? new User(user) : user;
    }
}

export type UserId = Pick<User, 'id'>;

export type UserInfo = Pick<User, 'id' | 'displayName' | 'registered'>;

export interface Credentials {
    login: string;
    password: string;
}

