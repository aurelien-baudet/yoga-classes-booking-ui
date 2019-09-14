import { User } from 'src/app/account/domain/user';
export abstract class PushNotificationService {
  async abstract registerCurrentDeviceForUser(user: User): Promise<void>;
  async abstract unregisterCurrentDeviceForUser(user: User): Promise<void>;
}
