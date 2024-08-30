import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

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
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
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
  },
});
