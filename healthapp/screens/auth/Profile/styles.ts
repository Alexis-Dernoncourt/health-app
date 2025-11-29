import { StyleSheet } from 'react-native';
import { COLORS } from '../../../lib/constants';

export const styles = StyleSheet.create({
  container: {
    // backgroundColor: COLORS.gray,
    alignItems: 'center',
    marginVertical: 5,
    paddingVertical: 10,
  },
  containerInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
  elementFlex: {
    flex: 1,
  },
  elementMargin: {
    marginVertical: 5,
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
    marginVertical: 10,
  },
  buttonStyles: {
    backgroundColor: COLORS.primary_accent,
    borderColor: COLORS.primary_accent,
  },
  buttonContentStyle: {
    color: COLORS.white,
    textTransform: 'uppercase',
  },
});
