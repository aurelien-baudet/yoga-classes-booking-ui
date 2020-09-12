

export abstract class PasswordService {
  async abstract requestPasswordReset(contact: string): Promise<void>;
  async abstract validateResetCode(code: string): Promise<void>;
  async abstract changePassword(code: string, newPassword: string): Promise<void>;
}