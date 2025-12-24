import notifee, { AuthorizationStatus } from '@notifee/react-native';

export const requestNotificationsPermission = async (): Promise<{
  granted: boolean;
}> => {
  const settings = await notifee.requestPermission();

  return {
    granted:
      settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
      settings.authorizationStatus === AuthorizationStatus.PROVISIONAL,
  };
};
