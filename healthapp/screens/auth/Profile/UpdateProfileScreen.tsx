import React, { useLayoutEffect } from 'react';
import { COLORS } from '../../../lib/constants';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import Input from '../../../components/Form/Input';
import { useCurrentUser } from '../../../hooks';
import { useForm, Controller } from 'react-hook-form';
import { Button, Modal, Portal, Text } from 'react-native-paper';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../../components/Header/Header';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { userService } from '../../../services/userService';

const UpdateProfileScreen = () => {
  const UserSchema = z
    .object({
      firstname: z.string({ message: 'Le prénom doit être valide' }).min(3, {
        message: 'Le prénom doit avoir au moins 3 caractères',
      }),
      lastname: z.string({ message: 'Le nom doit être valide' }).min(3, {
        message: 'Le nom doit avoir au moins 3 caractères',
      }),
      email: z.email({ message: "L'email doit être valide" }).optional(),
      password: z
        .string({ message: 'Le mot de passe doit être valide' })
        .optional(),
      passwordConfirm: z
        .string({ message: 'Le mot de passe de confirmation doit être valide' })
        .optional(),
    })
    .refine(data => !data.password || data.password === data.passwordConfirm, {
      message: 'Les mots de passe ne correspondent pas',
      path: ['password', 'passwordConfirm'],
    });
  type UserFormType = z.infer<typeof UserSchema>;
  type User = {
    firstname: string;
    lastname: string;
    email: string;
    password?: string | undefined;
  };
  const navigation = useNavigation();
  const { user, refetch } = useCurrentUser();
  const updateUser = userService.useUpdateUser(user!.id);
  const updateUserPassword = userService.useUpdateUserPassword(user!.id);
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<UserFormType>({
    defaultValues: {
      firstname: user?.firstname ?? '',
      lastname: user?.lastname ?? '',
      email: user?.email ?? '',
      password: '',
    },
    resolver: zodResolver(UserSchema),
  });
  console.log('🚀 ~ UpdateProfileScreen ~ errors, isValid:', errors, isValid);

  // Function to handle form submission
  const onSubmit = (data: UserFormType) => {
    // Filter data value equals to user default value
    const filteredFormData = Object.fromEntries(
      Object.entries(data).filter(
        ([key, value]) => value !== (user as User)[key as keyof User],
      ),
    ) as UserFormType;
    const { password, ...rest } = filteredFormData;
    if (data.password) {
      updateUserPassword.mutate({ password: password! });
      ToastAndroid.show(
        'Votre mot de passe a bien été mis à jour',
        ToastAndroid.LONG,
      );
    }
    if (rest) updateUser.mutate(rest);
    ToastAndroid.show('Votre profil a bien été mis à jour', ToastAndroid.LONG);
    refetch();
    navigation.navigate('Profile');
  };

  const handleAbort = () => {
    setPasswordVisible(false);
    reset();
    navigation.navigate('Profile');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: (props: BottomTabHeaderProps) =>
        Header(props, 'Profile', 'Modifier mon profil', reset),
    });
  }, [reset, navigation]);

  return (
    <View style={styles.formWrapper}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainerStyle}
        >
          <View style={styles.formWrapper}>
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Password"
                  style={styles.inputStyle}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.password}
                  placeholder="Entrez votre nouveau mot-de-passe"
                  secureTextEntry={passwordVisible}
                />
              )}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password.message}</Text>
            )}
            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Confirmer Password"
                  style={styles.inputStyle}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.passwordConfirm}
                  placeholder="Confirmez votre nouveau mot-de-passe"
                  secureTextEntry={passwordVisible}
                />
              )}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password.message}</Text>
            )}
          </View>
        </Modal>
      </Portal>
      <Controller
        name="firstname"
        control={control}
        rules={{ required: true, minLength: 3, maxLength: 128 }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Prénom"
            style={styles.inputStyle}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.firstname}
            placeholder="Entrez votre prénom"
          />
        )}
      />
      {errors.firstname && (
        <Text style={styles.error}>{errors.firstname.message}</Text>
      )}

      <Controller
        name="lastname"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Nom"
            style={styles.inputStyle}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.lastname}
            placeholder="Entrez votre nom"
          />
        )}
      />
      {errors.lastname && (
        <Text style={styles.error}>{errors.lastname.message}</Text>
      )}

      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Email"
            style={styles.inputStyle}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.email}
            placeholder="Entrez votre email"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Button mode="outlined" style={styles.margin} onPress={showModal}>
        Modifier password
      </Button>

      <Button
        mode="contained"
        disabled={isSubmitting}
        onPress={handleAbort}
        loading={isSubmitting}
        style={styles.abortBtnStyle}
        labelStyle={styles.abortBtnLabelStyle}
      >
        Annuler
      </Button>
      <Button
        mode="contained"
        disabled={!isValid || isSubmitting}
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
        style={styles.saveBtnStyle}
        labelStyle={styles.saveBtnLabelStyle}
      >
        Sauvegarder
      </Button>
    </View>
  );
};

export default UpdateProfileScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  margin: {
    marginVertical: 10,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  backButton: {
    color: COLORS.light_blue,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: 10,
    marginBottom: -5,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  titleIngredients: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  formWrapper: {
    width: '100%',
    alignItems: 'stretch',
    paddingHorizontal: 20,
  },
  inputStyle: {
    marginTop: 20,
  },
  descriptionInput: {
    minHeight: 100,
    marginTop: 10,
  },
  addIngredientButton: {
    marginTop: 10,
    backgroundColor: COLORS.primary_accent,
  },
  error: {
    color: COLORS.red,
  },
  saveBtnStyle: {
    marginTop: 20,
    backgroundColor: COLORS.primary_accent,
    borderColor: COLORS.primary_accent,
    borderRadius: 10,
  },
  saveBtnLabelStyle: {
    color: COLORS.white,
  },
  abortBtnStyle: {
    marginTop: 20,
    backgroundColor: COLORS.gray,
    borderColor: COLORS.gray,
    borderRadius: 10,
  },
  abortBtnLabelStyle: {
    color: COLORS.black,
  },
  modalContainerStyle: {
    backgroundColor: COLORS.white,
    padding: 20,
  },
});
