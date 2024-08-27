import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },
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
    color: 'darkred',
  },
  signButton: {
    marginTop: 20,
  },
});
