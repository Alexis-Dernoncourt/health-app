import React from 'react';
import { useRegister } from '../../../lib/react-query/auth';
import { Button, Text, TextInput } from 'react-native-paper';
import { ToastAndroid, View } from 'react-native';
import Input from '../../../components/Form/Input';
import { styles } from './styles';
import { EyeIconOpen, EyeIconClosed } from '../../../navigation/icons/EyeIcon';
import Layout from '../../Layout';
import { HomeTabScreenProps } from '../../../navigation/types';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const RegisterScreen = ({ navigation }: HomeTabScreenProps<'Register'>) => {
  const RegisterSchema = z.object({
    firstname: z
      .string({ message: 'Le prénom doit avoir au moins 3 caractères' })
      .min(3, { message: 'Le prénom doit avoir au moins 3 caractères' })
      .nonoptional({ message: 'Le prénom est requis' }),
    lastname: z
      .string({ message: 'Le nom doit avoir au moins 3 caractères' })
      .min(3, { message: 'Le nom doit avoir au moins 3 caractères' })
      .nonoptional({ message: 'Le nom est requis' }),
    email: z.email({ message: "L'email doit être valide" }).nonoptional({
      message: "L'email est requis",
    }),
    password: z
      .string({ message: 'Le mot de passe doit avoir au moins 8 caractères' })
      .min(8, { message: 'Le mot de passe doit avoir au moins 8 caractères' })
      .nonoptional({ message: 'Le mot de passe est requis' }),
  });

  type RegisterFormData = z.infer<typeof RegisterSchema>;
  const register = useRegister();
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { email, password, firstname, lastname } = data;
      register.mutate({
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        email: email.trim(),
        password: password.trim(),
      });
      ToastAndroid.show(
        'Votre compte a bien été crée. Vérifiez votre boite mail pour valider votre compte !',
        ToastAndroid.LONG,
      );
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error);
      ToastAndroid.show('Une erreur est survenue', ToastAndroid.SHORT);
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome !</Text>
        <View style={styles.formRegisterContainer}>
          <Text style={styles.signinText}>Create an account</Text>
          <Controller
            name="firstname"
            rules={{
              required: true,
            }}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Votre prénom"
                placeholder="Entrez votre prénom"
                keyboardType="default"
                value={value}
                error={!!errors.firstname}
                style={styles.inputStyle}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.firstname && (
            <Text style={styles.errorText}>{errors.firstname.message}</Text>
          )}

          <Controller
            name="lastname"
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Votre nom"
                placeholder="Entrez votre nom"
                keyboardType="default"
                value={value}
                error={!!errors.lastname}
                style={styles.inputStyle}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.lastname && (
            <Text style={styles.errorText}>{errors.lastname.message}</Text>
          )}

          <Controller
            name="email"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
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
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}

          <Controller
            name="password"
            control={control}
            rules={{
              required: true,
            }}
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
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  />
                }
              />
            )}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}
        </View>

        <Button
          style={
            !isValid
              ? { ...styles.signButton, ...styles.signButtonDisabled }
              : styles.signButton
          }
          labelStyle={styles.signButtonText}
          onPress={handleSubmit(onSubmit)}
          disabled={register.isPending || !isValid || isSubmitting}
        >
          Me connecter
        </Button>
        <Button
          style={styles.registerButton}
          labelStyle={styles.registerButtonText}
          onPress={() => navigation.navigate('SignIn')}
          disabled={register.isPending || isSubmitting}
        >
          J'ai déjà un compte
        </Button>
      </View>
    </Layout>
  );
};

export default RegisterScreen;
