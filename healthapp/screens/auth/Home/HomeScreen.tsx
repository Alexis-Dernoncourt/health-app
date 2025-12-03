import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './styles';
import { useCurrentUser } from '../../../hooks/index';
import Layout from '../../Layout';
import HomeHeader from '../../../components/Home/HomeHeader';
import Slider from '../../../components/Home/Slider';
import HomeInfos from '../../../components/Home/HomeInfos';
import { AppLogo } from '../../../components/Elements/Logo';
import { recipeService } from '../../../services/recipeService';

// const Home = ({navigation}: HomeTabScreenProps<'Home'>) => {
const Home = () => {
  const { user } = useCurrentUser();
  console.log('🚀 ~ Home ~ user:', user);
  const [scrollEnabled, setScrollEnabled] = React.useState(true);
  const { data, isLoading, error, isRefetching } =
    recipeService.useGetRecipes();

  return (
    <Layout>
      <ScrollView
        contentContainerStyle={styles.container}
        scrollEnabled={scrollEnabled}
      >
        <AppLogo />
        <HomeHeader />
        <HomeInfos />
        <View style={styles.elementMargin}>
          <Text style={styles.titleSection}>
            {user?.user_favorites?.length
              ? 'Mes recettes favorites'
              : 'Les dernières recettes'}
          </Text>
          <Slider
            setScrollEnabled={setScrollEnabled}
            recipesData={data}
            isLoading={isLoading}
            error={error}
            isRefetching={isRefetching}
          />
        </View>
        <View style={{ margin: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
            {user?.firstname || 'no user'}
          </Text>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Home;
