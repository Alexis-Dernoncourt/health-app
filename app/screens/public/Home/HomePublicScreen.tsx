import React from 'react';
import {useLogin} from '../../../lib/react-query/auth';
import {Button, Text} from 'react-native-paper';
import {ScrollView, View} from 'react-native';
import {styles} from '../../auth/Home/styles';
import {HomeTabScreenProps} from '../../../navigation/types';
import Config from 'react-native-config';
import Layout from '../../Layout';
import HomeHeader from '../../../components/Home/HomeHeader';
import Slider from '../../../components/Home/Slider';

const HomePublic = ({navigation}: HomeTabScreenProps<'Home'>) => {
  const [scrollEnabled, setScrollEnabled] = React.useState(true);
  const login = useLogin();

  function loginTest() {
    return login.mutate({
      email: Config.REACT_APP_TEST_MAIL,
      password: Config.REACT_APP_TEST_PASS,
    });
  }

  return (
    <Layout>
      <ScrollView
        contentContainerStyle={styles.container}
        scrollEnabled={scrollEnabled}>
        <HomeHeader />
        <View style={[styles.sectionInfos, styles.elementMargin]}>
          <Text>You are not logged in</Text>
          <Text>Section infos</Text>
        </View>
        <View style={styles.elementMargin}>
          <Text style={styles.titleSection}>Les dernières recettes</Text>
          <Slider setScrollEnabled={setScrollEnabled} />
        </View>
        <View style={styles.container}>
          <Button
            style={{marginTop: 30}}
            onPress={() => navigation.navigate('SignIn')}>
            Go to TOTO page
          </Button>
          <Button
            style={{marginTop: 30}}
            onPress={() => loginTest()}
            disabled={login.isLoading}>
            Test login
          </Button>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default HomePublic;
