/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import queryClient from './lib/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { clientPersister } from './lib/mmkv_store';
import { QueryClientProvider } from '@tanstack/react-query';

if (__DEV__) {
  import('./reactotron').then(() => console.log('Reactotron Configured'));
  // require('./reactotron.ts');
}

export default function Main() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: clientPersister }}
    >
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <NavigationContainer>
            <GestureHandlerRootView>
              <App />
            </GestureHandlerRootView>
          </NavigationContainer>
        </PaperProvider>
      </QueryClientProvider>
    </PersistQueryClientProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
