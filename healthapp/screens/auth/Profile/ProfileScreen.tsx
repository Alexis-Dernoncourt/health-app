import React from 'react';
import { Text, Avatar, Button } from 'react-native-paper';
import { HomeTabScreenProps } from '../../../navigation/types';
import { styles } from './styles';
import { useLogout } from '../../../lib/react-query/auth';
import { useCurrentUser } from '../../../hooks/index';
import Layout from '../../Layout';
import { View } from 'react-native';

const Profile = ({ navigation }: HomeTabScreenProps<'Profile'>) => {
  const { user } = useCurrentUser();
  const logout = useLogout();

  const logoutMe = () => {
    logout.mutate('');
  };

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <View style={styles.container}>
        {user.image ? (
          <Avatar.Image source={{ uri: user.image }} size={120} />
        ) : (
          <Avatar.Text
            size={120}
            label={user.firstname.charAt(0) + user.lastname.charAt(0)}
          />
        )}
        <Text style={styles.name}>{`${user.firstname} ${user.lastname}`}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>{user.email}</Text>
        <Text style={[styles.text, styles.date]}>
          Membre depuis le {new Date(user.created_at).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.container}>
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
        <Text style={styles.text}>Mes recettes ajoutées :</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Mes recettes favorites :</Text>
      </View>
      <View style={styles.container}>
        <Text
          style={styles.text}
          onPress={() => navigation.navigate('EditProfile')}
        >
          Modifier mon profil
        </Text>
      </View>
    </Layout>
  );
};

export default Profile;
