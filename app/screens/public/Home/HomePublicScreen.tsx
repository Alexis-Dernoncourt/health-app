import React from 'react';
import {useLogin} from '../../../lib/react-query/auth';
import {Button, Text} from 'react-native-paper';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {styles} from '../../auth/Home/styles';
import {HomeTabScreenProps} from '../../../navigation/types';
import Config from 'react-native-config';
import useDarkMode from '../../../hooks/useDarkMode';

const HomePublic = ({navigation}: HomeTabScreenProps<'HomePublic'>) => {
  const {isDarkMode, backgroundStyle} = useDarkMode();
  const login = useLogin();

  function loginTest() {
    return login.mutate({
      email: Config.REACT_APP_TEST_MAIL,
      password: Config.REACT_APP_TEST_PASS,
    });
  }

  return (
    <SafeAreaView style={{...backgroundStyle, ...styles.mainWrapper}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        <Text>You are not logged in</Text>
        <Button
          style={{marginTop: 30}}
          onPress={() => navigation.navigate('Toto')}>
          Go to TOTO page
        </Button>
        <Button style={{marginTop: 30}} onPress={() => loginTest()}>
          Test login
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default HomePublic;
