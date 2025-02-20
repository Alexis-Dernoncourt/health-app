import React from 'react';
import {
  StyleProp,
  ViewStyle,
  Animated,
  StyleSheet,
  //   Platform,
  SafeAreaView,
  GestureResponderEvent,
  //   I18nManager,
} from 'react-native';
import {
  AnimatedFAB,
  AnimatedFABAnimateFrom,
  AnimatedFABIconMode,
} from 'react-native-paper';

type FabButtonProps = {
  icon: JSX.Element;
  label: string;
  extended: boolean;
  onPressEvent?: (e: GestureResponderEvent) => void;
  visible: boolean;
  animateFrom?: AnimatedFABAnimateFrom;
  iconMode: AnimatedFABIconMode;
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
};

const FabButton = ({
  //   animatedValue,
  visible,
  extended,
  label,
  animateFrom = 'right',
  style,
  icon,
  iconMode,
  onPressEvent,
}: FabButtonProps) => {
  //   const isIOS = Platform.OS === 'ios';

  const fabStyle = {[animateFrom]: 16};

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedFAB
        icon={() => icon}
        label={label}
        extended={extended}
        onPress={onPressEvent}
        visible={visible}
        animateFrom={animateFrom}
        iconMode={iconMode}
        style={[styles.fabStyle, style, fabStyle]}
      />
    </SafeAreaView>
  );
};

export default FabButton;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 35,
    right: 16,
    position: 'absolute',
  },
});
