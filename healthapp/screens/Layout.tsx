import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import useDarkMode from '../hooks/useDarkMode';
import { LayoutProps } from './types';

const Layout = ({ children }: LayoutProps) => {
  const { isDarkMode, backgroundStyle } = useDarkMode();
  return (
    <SafeAreaProvider style={{ ...backgroundStyle, ...styles.mainWrapper }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {children}
    </SafeAreaProvider>
  );
};

export default Layout;

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
