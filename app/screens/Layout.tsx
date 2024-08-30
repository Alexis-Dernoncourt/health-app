import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import useDarkMode from '../hooks/useDarkMode';
import {LayoutProps} from './types';

const Layout = ({children}: LayoutProps) => {
  const {isDarkMode, backgroundStyle} = useDarkMode();
  return (
    <SafeAreaView style={{...backgroundStyle, ...styles.mainWrapper}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {children}
    </SafeAreaView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },
});
