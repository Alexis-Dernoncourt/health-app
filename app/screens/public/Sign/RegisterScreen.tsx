import React, {useEffect} from 'react';
import {useRegister} from '../../../lib/react-query/auth';
import {Button, Text, TextInput} from 'react-native-paper';
import {ToastAndroid, View} from 'react-native';
import Input from '../../../components/Form/Input';
import {styles} from './styles';
import {EyeIconOpen, EyeIconClosed} from '../../../navigation/icons/EyeIcon';
import Layout from '../../Layout';
import {HomeTabScreenProps} from '../../../navigation/types';

const RegisterScreen = ({navigation}: HomeTabScreenProps<'Register'>) => {
  const register = useRegister();
  const [firstname, setFirstname] = React.useState('');
  const [firstnameErrorText, setFirstnameErrorText] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [lastnameErrorText, setLastnameErrorText] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [emailErrorText, setEmailErrorText] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [passwordErrorText, setPasswordErrorText] = React.useState('');

  const loginUser = async () => {
    await register.mutate({
      email,
      password,
    });
  };

  useEffect(() => {
    const errorResponse = register.error?.response;
    if (errorResponse?.status === 422) {
      setFirstnameErrorText(
        errorResponse?.data?.errors.filter(
          (error: any) => error.field === 'firstname',
        )[0]?.message ?? '',
      );
      setLastnameErrorText(
        errorResponse?.data?.errors.filter(
          (error: any) => error.field === 'lastname',
        )[0]?.message ?? '',
      );
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
  }, [register.error]);

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome !</Text>
        <View style={styles.formRegisterContainer}>
          <Text style={styles.signinText}>Create an account</Text>
          <View style={styles.formWrapper}>
            <Input
              label="Firstname"
              placeholder="Firstname"
              keyboardType="default"
              value={firstname}
              error={firstnameErrorText.length > 0}
              style={styles.inputStyle}
              onChangeText={(val: string) => setFirstname(val)}
            />
            {register.error && (
              <Text style={styles.errorText}>{firstnameErrorText}</Text>
            )}
            <Input
              label="Lastname"
              placeholder="Lastname"
              keyboardType="default"
              value={lastname}
              error={lastnameErrorText.length > 0}
              style={styles.inputStyle}
              onChangeText={(val: string) => setLastname(val)}
            />
            {register.error && (
              <Text style={styles.errorText}>{lastnameErrorText}</Text>
            )}
            <Input
              label="Email"
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              error={emailErrorText.length > 0}
              style={styles.inputStyle}
              onChangeText={(val: string) => setEmail(val)}
            />
            {register.error && (
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
            {register.error && (
              <Text style={styles.errorText}>{passwordErrorText}</Text>
            )}
          </View>
        </View>

        <Button
          style={styles.signButton}
          labelStyle={styles.signButtonText}
          onPress={() => loginUser()}
          disabled={register.isLoading}>
          Me connecter
        </Button>
        <Button
          style={styles.registerButton}
          labelStyle={styles.registerButtonText}
          onPress={() => navigation.navigate('SignIn')}
          disabled={register.isLoading || register.isFetching}>
          J'ai déjà un compte
        </Button>
      </View>
    </Layout>
  );
};

export default RegisterScreen;
