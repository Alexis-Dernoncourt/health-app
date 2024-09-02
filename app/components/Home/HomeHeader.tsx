import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../lib/constants';

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Header</Text>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 210,
    marginVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: COLORS.black,
  },
});
