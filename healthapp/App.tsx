/**
 * @format
 */

import { AppStateStatus, Platform } from 'react-native';
import TabNavigator from './navigation/TabNavigator';
import { focusManager } from '@tanstack/react-query';
import { useOnlineManager } from './hooks/useOnlineManager';
import { useAppState } from './hooks/useAppState';
import { useMMKVListener } from 'react-native-mmkv';
import { storage } from './lib/mmkv_store';

function onAppStateChange(status: AppStateStatus) {
  console.log('🚀 ~ onAppStateChange ~ Platform:', Platform);
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

function App() {
  useOnlineManager();
  useAppState(onAppStateChange);
  useMMKVListener(k => {
    console.log(`${k} changed! New size: ${storage.size}`);
  });
  // return <RootStack />;
  return <TabNavigator />;
}

export default App;
