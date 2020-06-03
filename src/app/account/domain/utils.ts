import { StudentId, StudentRef } from './student';
import { Booking } from './../../booking/domain/reservation';
import { UnregisteredUser } from './unregistered';
import { User, UserId, Role } from './user';


export const isRegisteredUser = (user: User | UnregisteredUser | StudentRef): boolean => {
  if (!user) {
      return false;
  }
  return user.registered;
};

export const isUnregisteredUser = (user: User | UnregisteredUser | StudentRef): boolean => {
  if (!user) {
      return false;
  }
  return !user.registered;
};

export const isUnknown = (user: User | UnregisteredUser | StudentRef): boolean => {
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


export const isAuthenticated = (user: User | UnregisteredUser | StudentRef): boolean => {
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


export const isSameUnregisteredUser = (a: UnregisteredUser, b: UnregisteredUser) => {
  return a.id === b.id;
};


export const isSameUser = (a: User | UnregisteredUser | StudentRef,
                           b: User | UnregisteredUser | StudentRef) => {
  if (isRegisteredUser(a) && isRegisteredUser(b)) {
      return (a as UserId).id === (b as UserId).id;
  }
  if (isUnregisteredUser(a) && isUnregisteredUser(b)) {
      return isSameUnregisteredUser(a as UnregisteredUser, b as UnregisteredUser);
  }
  return false;
};



export const isBookedForRegisteredStudent = (booking: Booking, student: StudentId) => {
  if (isRegisteredUser(booking.student)) {
      return (booking.student as StudentRef).id === student.id;
  }
  return false;
};
export const isBookedForRegisteredStudentPredicate = (student: StudentId) =>
  (booking: Booking) => isBookedForRegisteredStudent(booking, student);

export const isBookedForUnregisteredStudent = (booking: Booking, student: UnregisteredUser) => {
  if (isRegisteredUser(student)) {
      return false;
  }
  if (isRegisteredUser(booking.student)) {
      return false;
  }
  return isSameUser(booking.student, student);
};
export const isBookedForUnregisteredStudentPredicate = (student: UnregisteredUser) =>
  (booking: Booking) => isBookedForUnregisteredStudent(booking, student);


export const isBookedForStudent = (booking: Booking, student: StudentRef) => {
  if (isRegisteredUser(student)) {
      return isBookedForRegisteredStudent(booking, student as StudentId);
  }
  if (isUnregisteredUser(student)) {
      return isBookedForUnregisteredStudent(booking, student as UnregisteredUser);
  }
  return false;
};
export const isBookedForStudentPredicate = (student: StudentRef) =>
  (booking: Booking) => {
      if (isRegisteredUser(student)) {
          return isBookedForRegisteredStudent(booking, student as StudentId);
      }
      return isBookedForUnregisteredStudent(booking, student as UnregisteredUser);
  };
