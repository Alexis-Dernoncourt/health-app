import {StyleSheet} from 'react-native';
import {COLORS} from '../../../lib/constants';

export const styles = StyleSheet.create({
  container: {
    // backgroundColor: COLORS.gray,
    alignItems: 'center',
    marginVertical: 5,
    paddingVertical: 10,
  },
  elementMargin: {
    marginVertical: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
    color: COLORS.black,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: COLORS.black,
  },
  date: {
    color: COLORS.primary_accent,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonStyles: {
    backgroundColor: COLORS.primary_accent,
    borderColor: COLORS.primary_accent,
    borderRadius: 10,
    padding: 10,
  },
  buttonContentStyle: {
    color: COLORS.white,
    textTransform: 'uppercase',
  },
});
