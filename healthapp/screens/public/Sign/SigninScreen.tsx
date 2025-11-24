/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useLogin } from '../../../lib/react-query/auth';
import { Button, Text, TextInput } from 'react-native-paper';
import { ToastAndroid, View } from 'react-native';
import Input from '../../../components/Form/Input';
import { styles } from './styles';
import { EyeIconOpen, EyeIconClosed } from '../../../navigation/icons/EyeIcon';
import Layout from '../../Layout';
import { HomeTabScreenProps } from '../../../navigation/types';
import { authService } from '../../../services/authService';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

const SigninScreen = ({ navigation }: HomeTabScreenProps<'SignIn'>) => {
  const LoginSchema = z.object({
    email: z.email({ message: "L'email doit être valide" }).nonoptional({
      message: "L'email est requis",
    }),
    password: z
      .string()
      .min(8, { message: 'Le mot de passe doit avoir au moins 8 caractères' })
      .nonoptional({ message: 'Le mot de passe est requis' }),
  });

  type LoginFormData = z.infer<typeof LoginSchema>;
  const login = useLogin();
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
    ToastAndroid.show('Connexion en cours...', ToastAndroid.LONG);
    // await authService.login(data.email, data.password);
  };

  console.log('errors:', errors);

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome !</Text>
        <View style={styles.formContainer}>
          <Text style={styles.signinText}>Sign in</Text>
          <View style={styles.formWrapper}>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Email"
                  placeholder="Email"
                  keyboardType="email-address"
                  value={value}
                  error={!!errors.email}
                  style={styles.inputStyle}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.email && (
              <Text style={styles.error}>{errors.email.message}</Text>
            )}

            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Password"
                  placeholder="Password"
                  secureTextEntry={passwordVisible ? false : true}
                  value={value}
                  error={!!errors.password}
                  style={styles.inputStyle}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  rightIcon={
                    <TextInput.Icon
                      icon={passwordVisible ? EyeIconClosed : EyeIconOpen}
                      onPress={() => setPasswordVisible(prev => !prev)}
                    />
                  }
                />
              )}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password.message}</Text>
            )}
          </View>
        </View>

        <Button
          style={
            !isValid
              ? { ...styles.signButton, ...styles.signButtonDisabled }
              : styles.signButton
          }
          labelStyle={styles.signButtonText}
          disabled={!isValid || isSubmitting || login.isPending}
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        >
          Me connecter
        </Button>
        <Button
          style={styles.registerButton}
          labelStyle={styles.registerButtonText}
          onPress={() => navigation.navigate('Register')}
          // disabled={login.isLoading || login.isFetching}
        >
          Je veux créer un compte
        </Button>
      </View>
    </Layout>
  );
};

export default SigninScreen;
