/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import notifee, { EventType } from '@notifee/react-native';
import { Linking } from 'react-native';

AppRegistry.registerComponent(appName, () => App);

notifee.onBackgroundEvent(async ({ type, detail }) => {
  if (type === EventType.PRESS) {
    const url = detail.notification?.data?.deepLink;

    if (url) {
      Linking.openURL(url);
    }
  }
});
