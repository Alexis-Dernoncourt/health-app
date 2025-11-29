import { useColorScheme } from 'react-native';
import { COLORS } from '../lib/constants';

export default function useDarkMode() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? COLORS.black : COLORS.background,
  };

  return { isDarkMode, backgroundStyle };
}
