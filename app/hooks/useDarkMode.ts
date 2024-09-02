import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {COLORS} from '../lib/constants';

export default function useDarkMode() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : COLORS.background,
  };

  return {isDarkMode, backgroundStyle};
}
