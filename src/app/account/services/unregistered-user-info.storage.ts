import { UnregisteredUser } from '../domain/unregistered';

export abstract class UnregisteredUserInfoStorage {
    async abstract store(user: UnregisteredUser): Promise<void>;
    async abstract clear(): Promise<void>;
    async abstract get(): Promise<UnregisteredUser | null>;
}