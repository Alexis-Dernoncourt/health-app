import React from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {HomeTabScreenProps} from '../../../navigation/types';
import {styles} from './styles';
import {useLogout} from '../../../lib/react-query/auth';
import {useCurrentUser} from '../../../hooks/index';
import Layout from '../../Layout';
import HomeHeader from '../../../components/Home/HomeHeader';
import Slider from '../../../components/Home/Slider';

const Home = ({navigation}: HomeTabScreenProps<'Home'>) => {
  const logout = useLogout();
  const {user} = useCurrentUser();
  const [scrollEnabled, setScrollEnabled] = React.useState(true);

  const logoutTest = () => {
    return logout.mutate();
  };

  return (
    <Layout>
      <ScrollView
        contentContainerStyle={styles.container}
        scrollEnabled={scrollEnabled}>
        <HomeHeader />
        <View style={[styles.sectionInfos, styles.elementMargin]}>
          <Text>Section infos</Text>
        </View>
        <View style={styles.elementMargin}>
          <Text style={styles.titleSection}>Mes recettes favorites</Text>
          <Slider setScrollEnabled={setScrollEnabled} />
        </View>
        <View style={{margin: 20}}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            {user?.lastname || 'no user'}
          </Text>
        </View>
        <Button onPress={() => navigation.navigate('Profile')}>
          Go to Details
        </Button>
        <Button
          style={styles.elementMargin}
          onPress={() => logoutTest()}
          disabled={logout.isLoading}>
          Test logout
        </Button>
      </ScrollView>
    </Layout>
  );
};

export default Home;
