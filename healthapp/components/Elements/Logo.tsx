import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { COLORS } from '../../lib/constants';

export const AppLogo = () => {
  return (
    <View style={styles.logoContainer}>
      <Image
        source={require('../../assets/images/logo_round.webp')}
        style={styles.logoElement}
      />
      <Text variant="titleLarge" style={styles.logoText}>
        My Health App
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  logoElement: {
    width: 80,
    height: 80,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: COLORS.tertiary,
  },
});
