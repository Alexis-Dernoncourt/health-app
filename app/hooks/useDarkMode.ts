import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default function useDarkMode() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : '#F2FAFF',
  };

  return {isDarkMode, backgroundStyle};
}
