import { StyleSheet } from 'react-native';
import { COLORS } from '../../lib/constants';

export const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary_accent,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    paddingBottom: 5,
  },
  backButton: {
    marginBottom: 5,
  },
});
