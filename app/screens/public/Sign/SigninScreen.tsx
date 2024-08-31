import React, {useEffect} from 'react';
import {useLogin} from '../../../lib/react-query/auth';
import {Button, Text, TextInput} from 'react-native-paper';
import {ToastAndroid, View} from 'react-native';
import Input from '../../../components/Form/Input';
import {styles} from './styles';
import {EyeIconOpen, EyeIconClosed} from '../../../navigation/icons/EyeIcon';
import Layout from '../../Layout';

const SigninScreen = () => {
  const login = useLogin();
  const [email, setEmail] = React.useState('');
  const [emailErrorText, setEmailErrorText] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [passwordErrorText, setPasswordErrorText] = React.useState('');

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
      passwordErrorText && setPasswordErrorText('');
      ToastAndroid.show(
        errorResponse?.data?.errors[0]?.message,
        ToastAndroid.LONG,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login.error]);

  return (
    <Layout>
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
              error={emailErrorText.length > 0}
              style={styles.inputStyle}
              onChangeText={(val: string) => setEmail(val)}
            />
            {login.error && (
              <Text style={styles.errorText}>{emailErrorText}</Text>
            )}
            <Input
              label="Password"
              placeholder="Password"
              secureTextEntry={passwordVisible ? false : true}
              value={password}
              error={passwordErrorText.length > 0}
              style={styles.inputStyle}
              onChangeText={(val: string) => setPassword(val)}
              rightIcon={
                <TextInput.Icon
                  icon={passwordVisible ? EyeIconClosed : EyeIconOpen}
                  onPress={() => setPasswordVisible(prev => !prev)}
                />
              }
            />
            {login.error && (
              <Text style={styles.errorText}>{passwordErrorText}</Text>
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
    </Layout>
  );
};

export default SigninScreen;
