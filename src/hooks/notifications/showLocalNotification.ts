// hooks/notifications/showLocalNotification.ts
import notifee from '@notifee/react-native';

/**

 * @param id - id персонажа
 */
export const showLocalNotification = async (id: string) => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.displayNotification({
    title: 'Персонаж',
    body: 'Открыть страницу персонажа',
    android: {
      channelId,
      pressAction: {
        id: 'open-character',
      },
    },
    data: {
      deepLink: `VoronchukDaniil://character/${id}`,
    },
  });
};
