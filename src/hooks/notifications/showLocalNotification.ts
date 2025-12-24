import notifee from '@notifee/react-native';

export const showLocalNotification = async (id: string) => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default',
  });

  await notifee.displayNotification({
    title: `Персонаж #${id}`,
    body: 'Открыть страницу персонажа',
    android: {
      channelId,
      pressAction: {
        id: 'open-character',
      },
    },
    data: {
      deepLink: `voronchukDaniil://character/${id}`,
    },
  });
};
