export type Authentication = string;

export abstract class AuthenticationStorage {
    async abstract store(authentication: Authentication): Promise<void>;
    async abstract clear(): Promise<void>;
    async abstract get(): Promise<Authentication>;
}