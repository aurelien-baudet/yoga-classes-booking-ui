import { ContactInfo } from './contact';

export interface UnregisteredUser {
  id: string;
  displayName: string;
  contact: ContactInfo;
  preferences: UnregisteredUserPreferences;
  registered: false;
}
export class UnregisteredUser implements UnregisteredUser {
  constructor(user: UnregisteredUser) {
    this.id = user.id;
    this.displayName = user.displayName;
    this.contact = user.contact;
    this.preferences = user.preferences;
    this.registered = false;
  }

  static from(user?: UnregisteredUser) {
    return user ? new UnregisteredUser(user) : user;
  }
}

export type UnregisteredUserId = Pick<UnregisteredUser, 'id'>;

export interface UnregisteredUserPreferences {
  sendBookedMail?: boolean;
  agreesToBeAssisted: boolean;
}



export interface UnregisteredUserRegistration {
  displayName: string;
  contact: ContactInfo;
  preferences: UnregisteredUserPreferences;
}
