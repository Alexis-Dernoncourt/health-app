import React from 'react';
import { Text } from 'react-native-paper';
import { styles } from './styles';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { HomeTabBaseParamList } from '../../navigation/types';

export function Header(
  props: BottomTabHeaderProps,
  navigationName: Partial<keyof HomeTabBaseParamList>,
  headerText: string,
  customAction?: () => void,
) {
  const canGoBack = props.navigation.canGoBack();

  const handleNavigation = () => {
    customAction && customAction();
    props.navigation.navigate(navigationName);
  };

  return (
    <View style={styles.header}>
      {canGoBack && (
        <ArrowLeft
          style={styles.backButton}
          color="white"
          size={30}
          onPress={handleNavigation}
          accessibilityLabel={`Go back to ${navigationName.toLowerCase()}`}
        />
      )}
      <Text style={styles.headerText}>{headerText}</Text>
    </View>
  );
}
