import { ErrorCode, matchesErrorCode } from 'src/app/booking/domain/general';
import { StudentRef } from 'src/app/account/domain/student';

export interface SendFailure {
  code: ErrorCode;
  message: string;
}

export interface MessageStatus {
  sent: boolean;
  failure?: SendFailure;
}

export interface SendReport {
  student: StudentRef;
  sending: boolean;
  pushNotification: MessageStatus;
  email: MessageStatus;
  sms: MessageStatus;
}

export const getFailureText = (failure: SendFailure): string => {
  if (matchesErrorCode(failure.code, 'UnreachableUserException')) {
    return `L'élève n'a ni email ni numéro de téléphone`;
  }
  return `L'envoi a échoue (${failure.message})`;
};
