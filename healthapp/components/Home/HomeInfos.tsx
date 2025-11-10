import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../lib/constants';

const HomeInfos = () => {
  return (
    <View style={[styles.sectionInfos, styles.elementMargin]}>
      {/* <Text style={styles.titleSection}>Section infos</Text> */}
      <Text style={styles.text}>Consultez nos</Text>

      <Text style={styles.textBold}>recettes simples et gourmandes.</Text>
      <Text style={[styles.text, styles.marginTop]}>
        Ajoutez vos propres recettes et
      </Text>
      <Text style={styles.textBold}>créez vos menus !</Text>
    </View>
  );
};

export default HomeInfos;

const styles = StyleSheet.create({
  sectionInfos: {
    width: '100%',
    height: 208,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 0,
    backgroundColor: COLORS.quaternary,
  },
  elementMargin: {
    marginVertical: 10,
  },
  marginTop: {
    marginTop: 10,
  },
  text: {
    color: COLORS.black,
    fontSize: 18,
  },
  textBold: {
    color: COLORS.dark_red,
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  titleSection: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    color: COLORS.black,
  },
});
