import React from 'react';
import {View} from 'react-native';
import {useCurrentUser} from '../../../hooks';
import {Button, Text} from 'react-native-paper';
import Layout from '../../Layout';

const TestScreen = ({navigation}: any) => {
  const {user} = useCurrentUser();
  return (
    <Layout>
      <View style={{margin: 20, alignItems: 'center'}}>
        <Text>coucou</Text>
        <Text>{user?.firstname || 'no user connected'}</Text>
        <Button onPress={() => navigation.navigate('Recipes')}>
          Go to Recipes
        </Button>
      </View>
    </Layout>
  );
};

export default TestScreen;
