import React, {useEffect} from 'react';
import {useLogin} from '../../../lib/react-query/auth';
import {Button, Text} from 'react-native-paper';
import {SafeAreaView, StatusBar, ToastAndroid, View} from 'react-native';
import useDarkMode from '../../../hooks/useDarkMode';
import Input from '../../../components/Form/Input';
import {styles} from './styles';

const SigninScreen = () => {
  const {isDarkMode, backgroundStyle} = useDarkMode();
  const login = useLogin();
  const [email, setEmail] = React.useState('');
  const [emailErrorText, setEmailErrorText] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailPasswordErrorText, setPasswordErrorText] = React.useState('');

  const loginUser = async () => {
    await login.mutate({
      email,
      password,
    });
  };

  useEffect(() => {
    const errorResponse = login.error?.response;
    if (errorResponse?.status === 422) {
      setEmailErrorText(
        errorResponse?.data?.errors.filter(
          (error: any) => error.field === 'email',
        )[0]?.message ?? '',
      );
      setPasswordErrorText(
        errorResponse?.data?.errors.filter(
          (error: any) => error.field === 'password',
        )[0]?.message ?? '',
      );
    }

    if (errorResponse?.status === 400) {
      emailErrorText && setEmailErrorText('');
      emailPasswordErrorText && setPasswordErrorText('');
      ToastAndroid.show(
        errorResponse?.data?.errors[0]?.message,
        ToastAndroid.LONG,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login.error]);

  return (
    <SafeAreaView style={{...backgroundStyle, ...styles.mainWrapper}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome !</Text>
        <View style={styles.formContainer}>
          <Text style={styles.signinText}>Sign in</Text>
          <View style={styles.formWrapper}>
            <Input
              label="Email"
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              error={login.isError}
              style={styles.inputStyle}
              onChangeText={(val: string) => setEmail(val)}
            />
            {login.error && (
              <Text style={styles.errorText}>{emailErrorText}</Text>
            )}
            <Input
              label="Password"
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              error={login.isError}
              style={styles.inputStyle}
              onChangeText={(val: string) => setPassword(val)}
              // rightIcon={<EyeIcon />}
            />
            {login.error && (
              <Text style={styles.errorText}>{emailPasswordErrorText}</Text>
            )}
          </View>
        </View>

        <Button
          style={styles.signButton}
          onPress={() => loginUser()}
          disabled={login.isLoading}>
          Me connecter
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default SigninScreen;
