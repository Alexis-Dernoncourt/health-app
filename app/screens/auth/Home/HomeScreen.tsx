import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import useDarkMode from '../../../hooks/useDarkMode';
import {HomeTabScreenProps} from '../../../navigation/types';
import {styles} from './styles';
import {useLogout} from '../../../lib/react-query/auth';
import {useCurrentUser} from '../../../hooks/index';

const Home = ({navigation}: HomeTabScreenProps<'Home'>) => {
  const {isDarkMode, backgroundStyle} = useDarkMode();
  const logout = useLogout();
  const {user} = useCurrentUser();

  const logoutTest = () => {
    return logout.mutate();
  };

  return (
    <SafeAreaView style={{...backgroundStyle, ...styles.mainWrapper}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        <Text>Welcome Home</Text>
        <View style={styles.elementMargin}>
          <Text>Section header</Text>
        </View>
        <View style={styles.elementMargin}>
          <Text>Section infos</Text>
        </View>
        <View style={styles.elementMargin}>
          <Text>Section recettes favorites (slider)</Text>
        </View>
        <View style={{margin: 20}}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            {user?.lastname || 'no user'}
          </Text>
        </View>
        <Button onPress={() => navigation.navigate('Details')}>
          Go to Details
        </Button>
        <Button style={styles.elementMargin} onPress={() => logoutTest()}>
          Test logout
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Home;
