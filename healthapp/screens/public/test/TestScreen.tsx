import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import Layout from '../../Layout';

const TestScreen = ({}: any) => {
  return (
    <Layout>
      <View style={{ margin: 20, alignItems: 'center' }}>
        <Text>coucou</Text>
        <Text>{'no user connected'}</Text>
      </View>
    </Layout>
  );
};

export default TestScreen;
