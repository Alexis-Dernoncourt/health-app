import {StyleSheet} from 'react-native';
import {COLORS} from '../../../lib/constants';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontWeight: 'bold',
    fontSize: 22,
    marginVertical: 30,
  },
  signinText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  elementMargin: {
    marginVertical: 10,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 30,
    marginTop: '40%',
  },
  formWrapper: {
    marginVertical: 20,
  },
  inputStyle: {
    marginTop: 20,
  },
  errorText: {
    color: COLORS.dark_red,
  },
  signButton: {
    width: 250,
    height: 50,
    justifyContent: 'center',
    backgroundColor: COLORS.black,
    borderRadius: 10,
    marginTop: 20,
  },
  signButtonText: {
    color: COLORS.white,
  },
  registerButton: {
    marginTop: 20,
  },
  registerButtonText: {
    color: COLORS.black,
  },
});
