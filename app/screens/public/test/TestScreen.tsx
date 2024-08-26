import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {useCurrentUser} from '../../../hooks';
import {Text} from 'react-native-paper';
import useDarkMode from '../../../hooks/useDarkMode';
import {styles} from '../../auth/Home/styles';

const TestScreen = () => {
  const {isDarkMode, backgroundStyle} = useDarkMode();
  const {user} = useCurrentUser();
  return (
    <SafeAreaView style={{...backgroundStyle, ...styles.mainWrapper}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{margin: 20, alignItems: 'center'}}>
        <Text>coucou</Text>
        <Text>{user?.firstname || 'no user connected'}</Text>
      </View>
    </SafeAreaView>
  );
};

export default TestScreen;
