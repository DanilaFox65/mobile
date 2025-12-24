import notifee, { AuthorizationStatus } from '@notifee/react-native';

export const getNotificationPermission =
  async (): Promise<AuthorizationStatus> => {
    const settings = await notifee.getNotificationSettings();
    return settings.authorizationStatus;
  };
