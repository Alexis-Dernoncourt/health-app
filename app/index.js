/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import App from './App';
import {name as appName} from './app.json';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './lib/react-query';
import {NavigationContainer} from '@react-navigation/native';

export default function Main() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
