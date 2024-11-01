import {StyleSheet} from 'react-native';
import {COLORS} from '../../../lib/constants';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  elementMargin: {
    marginVertical: 10,
  },
  titleSection: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
    marginBottom: -15,
    marginLeft: 10,
    color: COLORS.black,
  },
  sectionInfos: {
    width: '100%',
    height: 208,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 0,
    backgroundColor: COLORS.quaternary,
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
