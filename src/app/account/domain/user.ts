import { UnregisteredUser, isSameUnregisteredUser } from './unregistered';
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
}

export type UserId = Pick<User, 'id'>;

export type UserInfo = Pick<User, 'id' | 'displayName'>;

export interface Credentials {
    login: string;
    password: string;
}



export const isRegisteredUser = (user: User | UserId | UnregisteredUser): boolean => {
    if (!user) {
        return false;
    }
    if (user['id']) {
        return true;
    }
    return false;
};

export const isUnregisteredUser = (user: User | UserId | UnregisteredUser): boolean => {
    if (!user) {
        return false;
    }
    if (isRegisteredUser(user)) {
        return false;
    }
    if (user['displayName']) {
        return true;
    }
    return false;
};

export const isUnknown = (user: User | UserId | UnregisteredUser): boolean => {
    if (!user) {
        return true;
    }
    if (isRegisteredUser(user)) {
        return false;
    }
    if (isUnregisteredUser(user)) {
        return false;
    }
    return true;
};


export const isAuthenticated = (user: User | UserId | UnregisteredUser): boolean => {
    if (!user) {
        return false;
    }
    if (isRegisteredUser(user)) {
        return true;
    }
    if (isUnregisteredUser(user)) {
        return false;
    }
    return false;
};

export const hasRole = (user: User, role: Role) => {
    return user.account.roles.some((r) => role === r);
};


export const isSameUser = (a: User | UserId | UnregisteredUser,
                           b: User | UserId | UnregisteredUser) => {
    if (isRegisteredUser(a) && isRegisteredUser(b)) {
        return (a as UserId).id === (b as UserId).id;
    }
    if (isUnregisteredUser(a) && isUnregisteredUser(b)) {
        return isSameUnregisteredUser(a as UnregisteredUser, b as UnregisteredUser);
    }
    return false;
};
