import React from 'react';
import {Button, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';

export function Header(props: any) {
  console.log('🚀 ~ props:', props);
  return (
    <SafeAreaView style={styles.header}>
      {props.navigation.canGoBack() && (
        <Button onPress={() => props.navigation.goBack()}>⬅️</Button>
      )}
      <Text style={styles.headerText}>Header</Text>
    </SafeAreaView>
  );
}
