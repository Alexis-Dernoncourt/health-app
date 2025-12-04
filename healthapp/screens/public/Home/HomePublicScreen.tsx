import React from 'react';
import { Button, Text } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import { styles } from '../../auth/Home/styles';
// import {HomeTabScreenProps} from '../../../navigation/types';
import Config from 'react-native-config';
import Layout from '../../Layout';
import HomeHeader from '../../../components/Home/HomeHeader';
import Slider from '../../../components/Home/Slider';
import HomeInfos from '../../../components/Home/HomeInfos';
// import { authService } from '../../../services/authService';
import { useLogin } from '../../../lib/react-query/auth';
import { userService } from '../../../services/userService';

// const HomePublic = ({navigation}: HomeTabScreenProps<'Home'>) => {
const HomePublic = () => {
  const { data, isLoading, error, isRefetching } =
    userService.useGetUserRecipes();
  const [scrollEnabled, setScrollEnabled] = React.useState(true);
  const login = useLogin();

  function loginTest() {
    return login.mutate({
      email: Config.REACT_APP_TEST_MAIL as string,
      password: Config.REACT_APP_TEST_PASS as string,
    });
  }

  return (
    <Layout>
      <ScrollView
        contentContainerStyle={styles.container}
        scrollEnabled={scrollEnabled}
      >
        <HomeHeader />
        <HomeInfos />
        <View style={styles.elementMargin}>
          <Text style={styles.titleSection}>Les dernières recettes</Text>
          {data && (
            <Slider
              setScrollEnabled={setScrollEnabled}
              recipesData={data}
              isLoading={isLoading}
              error={error}
              isRefetching={isRefetching}
              maxDataValue={3}
              key="HomePublicSlider"
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.buttonStyles}
            labelStyle={styles.buttonContentStyle}
            onPress={() => loginTest()}
            // disabled={login.isPending}
          >
            Test login
          </Button>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default HomePublic;
