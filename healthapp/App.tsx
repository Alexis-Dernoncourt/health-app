/**
 * @format
 */

import { AppState, AppStateStatus, Platform } from 'react-native';
import TabNavigator from './navigation/TabNavigator';
import { focusManager } from '@tanstack/react-query';
import { useEffect } from 'react';

function App() {
  function onAppStateChange(status: AppStateStatus) {
    console.log('🚀 ~ onAppStateChange ~ Platform:', Platform);
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  }

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => subscription.remove();
  }, []);

  // return <RootStack />;
  return <TabNavigator />;
}

export default App;
