import React from 'react';
import {ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';
import {HomeTabScreenProps} from '../../../navigation/types';
import {styles} from './styles';
import {useCurrentUser} from '../../../hooks/index';
import Layout from '../../Layout';
import HomeHeader from '../../../components/Home/HomeHeader';
import Slider from '../../../components/Home/Slider';
import HomeInfos from '../../../components/Home/HomeInfos';

const Home = ({navigation}: HomeTabScreenProps<'Home'>) => {
  console.log('🚀 ~ Home ~ navigation:', navigation.canGoBack());
  const {user} = useCurrentUser();
  const [scrollEnabled, setScrollEnabled] = React.useState(true);

  return (
    <Layout>
      <ScrollView
        contentContainerStyle={styles.container}
        scrollEnabled={scrollEnabled}>
        <HomeHeader />
        <HomeInfos />
        <View style={styles.elementMargin}>
          <Text style={styles.titleSection}>
            {user?.user_favorites?.length
              ? 'Mes recettes favorites'
              : 'Les dernières recettes'}
          </Text>
          <Slider setScrollEnabled={setScrollEnabled} />
        </View>
        <View style={{margin: 20}}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            {user?.lastname || 'no user'}
          </Text>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Home;
