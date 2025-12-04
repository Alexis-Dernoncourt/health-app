import React from 'react';
import { Text, Avatar, Button, ActivityIndicator } from 'react-native-paper';
import { HomeTabScreenProps } from '../../../navigation/types';
import { styles } from './styles';
import { useLogout } from '../../../lib/react-query/auth';
import { useCurrentUser } from '../../../hooks/index';
import Layout from '../../Layout';
import { ToastAndroid, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { userApi } from '../../../api/userApi';
import queryClient from '../../../lib/react-query';
import { COLORS } from '../../../lib/constants';
import Slider from '../../../components/Home/Slider';
import { ScrollView } from 'react-native-gesture-handler';
import { userService } from '../../../services/userService';

const Profile = ({ navigation }: HomeTabScreenProps<'Profile'>) => {
  const [scrollEnabled, setScrollEnabled] = React.useState(false);
  const { user, isLoading: userLoading } = useCurrentUser();
  const logout = useLogout();
  const { data, isLoading, error, isRefetching } =
    userService.useGetUserRecipes();

  const logoutMe = () => {
    logout.mutate('');
  };

  if (!user) {
    return null;
  }

  const handleImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        includeBase64: true,
        presentationStyle: 'fullScreen',
        maxWidth: 500,
        maxHeight: 500,
      });

      if (result.assets?.length && result.assets[0]) {
        const { fileName, type, uri, base64 } = result.assets[0];
        if (fileName && type && uri && base64) {
          const file = {
            uri: uri,
            name: fileName,
            type: type,
          };
          const formData = new FormData();
          formData.append('image', file);
          await userApi.updateUserImage(formData);
          ToastAndroid.show(
            'Votre avatar a bien été mis à jour',
            ToastAndroid.LONG,
          );
          queryClient.invalidateQueries({ queryKey: ['user_' + user.id] });
          queryClient.invalidateQueries({ queryKey: ['user'] });
        }
      }
    } catch (error) {
      console.error('🚀 ~ error:', error);
    }
  };

  if (userLoading) {
    return (
      <Layout>
        <View style={styles.container}>
          <ActivityIndicator size="large" color={COLORS.light_blue} />
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <ScrollView scrollEnabled={scrollEnabled}>
        <View style={styles.container}>
          {user.image ? (
            <>
              <Avatar.Image source={{ uri: user.image }} size={120} />
            </>
          ) : (
            <>
              <Avatar.Text size={120} label={user.firstname.charAt(0)} />
            </>
          )}
          <Button
            mode="outlined"
            style={[styles.elementMargin]}
            onPress={handleImage}
          >
            Modifier mon avatar
          </Button>
          <Text style={styles.name}>{`${user.firstname} ${
            user.lastname || ''
          }`}</Text>
        </View>

        <View style={styles.containerInline}>
          <Button
            mode="outlined"
            style={styles.elementFlex}
            onPress={() => {
              navigation.navigate('EditProfile');
            }}
          >
            Modifier mes infos
          </Button>
          <Button
            style={[styles.elementMargin, styles.buttonStyles]}
            labelStyle={styles.buttonContentStyle}
            onPress={logoutMe}
            disabled={logout.isPending}
          >
            Me déconnecter
          </Button>
        </View>

        <View style={styles.container}>
          <Text style={styles.text}>{user.email}</Text>
          <Text style={[styles.text, styles.date]}>
            Membre depuis le {new Date(user.created_at).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.text}>Mes 4 dernières recettes ajoutées :</Text>
          {data && (
            <Slider
              setScrollEnabled={setScrollEnabled}
              recipesData={data}
              isLoading={isLoading}
              error={error}
              isRefetching={isRefetching}
              height={150}
              width={350}
              maxDataValue={4}
              key="ProfileSlider"
            />
          )}
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>Mes recettes favorites :</Text>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Profile;
