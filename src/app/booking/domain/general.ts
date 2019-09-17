export type Instant = number;

export interface DateRange {
    start: Instant;
    end: Instant;
}

export const isSameDay = (a: Instant, b: Instant) => {
    const aDate = new Date(a);
    const bDate = new Date(b);
    return aDate.getDate() === bDate.getDate()
        && aDate.getMonth() === bDate.getMonth()
        && aDate.getFullYear() === bDate.getFullYear();
};
export const sameDayPredicate = (a: Instant) => (b: Instant) => isSameDay(a, b);

export enum SocialAuthenticator {
    GOOGLE = 'google',
    FACEBOOK = 'facebook'
}

export type ErrorCode = string;

export class ApplicationError extends Error {
    constructor(public code: ErrorCode, public message: string, public cause?: Error) {
        super(message);
    }
}

export interface BackendError {
    status: number;
    error: {
        code: ErrorCode;
        message: string;
        timestamp: number;
        data: {
            [key: string]: string;
        }
    };
}

export const matchesErrorCode = (e: string | Error | ApplicationError | BackendError, code: string) => {
    if (typeof e === 'string') {
        return e === code;
    }
    const appError = e as ApplicationError;
    if (appError.code) {
        return appError.code === code;
    }
    const backendError = e as BackendError;
    if (backendError.error && backendError.error.code) {
        return backendError.error.code === code;
    }
    return false;
}
