import {
  Alert,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, { useLayoutEffect } from 'react';
import { HomeTabScreenProps } from '../../../navigation/types';
import { ActivityIndicator, Button } from 'react-native-paper';
import Input from '../../../components/Form/Input';
import Layout from '../../Layout';
import { COLORS } from '../../../lib/constants';
import { launchImageLibrary } from 'react-native-image-picker';
import { ImagePlus, LucideCamera } from 'lucide-react-native';
import { Header } from '../../../components/Header/Header';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { recipeService } from '../../../services/recipeService';
import FabButton from '../../../components/Elements/FAB';
import CameraCapture from '../../../components/Elements/CameraCapture';
import { ScrollView } from 'react-native-gesture-handler';
import { IaRecipeType } from '../../types';
import client from '../../../api/client';

const AddRecipeScreen = ({ navigation }: HomeTabScreenProps<'AddRecipe'>) => {
  const AddRecipeSchema = z.object({
    title: z
      .string({ message: 'Le titre est requis' })
      .min(3, { message: 'Le titre doit avoir au moins 3 caractères' }),
    description: z.string({ message: 'Le champ est invalide' }).optional(),
    ingredients: z
      .string({ message: 'Les ingrédients sont requis' })
      .min(5, { message: 'Les ingrédients sont requis' }),
    steps: z
      .string({ message: 'Les étapes sont requises' })
      .min(5, { message: 'Les étapes sont requises' }),
    image: z.any().optional(),
    calories: z.string({ message: 'Le champ est invalide' }).optional(),
    prep_time: z.string({ message: 'Le champ est invalide' }).optional(),
    cook_time: z.string({ message: 'Le champ est invalide' }).optional(),
    servings: z.string({ message: 'Le champ est invalide' }).optional(),
  });

  type AddRecipeFormType = z.infer<typeof AddRecipeSchema>;

  const [iaCapture, setIaCapture] = React.useState(false);
  const [iaLoading, setIaLoading] = React.useState(false);
  const [imageFile, setImageFile] = React.useState<{
    uri: string;
    name: string;
    type: string;
  } | null>(null);
  const [isExtended, setIsExtended] = React.useState(true);
  const createRecipe = recipeService.useCreateRecipe();

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition =
      Math.floor(event.nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 10);
  };

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<AddRecipeFormType>({
    defaultValues: {
      title: '',
      description: '',
      ingredients: '',
      steps: '',
      image: null,
      calories: '',
      prep_time: '',
      cook_time: '',
      servings: '',
    },
    resolver: zodResolver(AddRecipeSchema),
  });
  const handlePhotoTaken = async (file: {
    name: string;
    type: string;
    uri: string;
  }) => {
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append('image', file);
      setIaLoading(true);
      const { data } = await client.post('/ai/analyze-recipe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const structuredRecipe: IaRecipeType = data;
      setValue('image', structuredRecipe.image ?? null);
      setValue('title', structuredRecipe.title);
      setValue('description', structuredRecipe.description);
      setValue('ingredients', structuredRecipe.ingredients);
      setValue('steps', structuredRecipe.steps.join('$').replace(/\$/g, '\n'));
      setValue('calories', structuredRecipe.calories);
      setValue('prep_time', structuredRecipe.prep_time);
      setValue('cook_time', structuredRecipe.cook_time);
      setValue('servings', structuredRecipe.servings);
    } catch (err: any) {
      Alert.alert('Erreur', err.message);
    } finally {
      setIaCapture(false);
      setIaLoading(false);
      ToastAndroid.show(
        "Les informations ont bien été extraites. 🚀 Verifiez-les avant d'ajouter la recette !",
        ToastAndroid.LONG,
      );
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: (props: BottomTabHeaderProps) =>
        Header(props, 'Recipes', 'Ajouter une recette', () => {
          reset();
          setImageFile(null);
        }),
    });
  }, [navigation, reset]);

  const renderIcon = (color: keyof typeof COLORS = 'black') => {
    return <ImagePlus color={COLORS[color]} />;
  };

  const handleImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        presentationStyle: 'fullScreen',
        maxWidth: 500,
        maxHeight: 500,
      });

      if (result.assets?.length && result.assets[0]) {
        const { fileName, type, uri } = result.assets[0];
        if (fileName && type && uri) {
          setImageFile({ uri, name: fileName, type });
          ToastAndroid.show("L'image a bien été ajoutée", ToastAndroid.LONG);
        }
      }
    } catch (error) {
      console.error('🚀 ~ error:', error);
    }
  };

  const onSubmit = (data: AddRecipeFormType) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('ingredients', data.ingredients);
    formData.append('steps', data.steps);
    formData.append('calories', data.calories);
    formData.append('prep_time', data.prep_time);
    formData.append('cook_time', data.cook_time);
    formData.append('servings', data.servings);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      createRecipe.mutate(formData);
      reset();
      setImageFile(null);
      ToastAndroid.show('Votre recette a bien été ajoutée', ToastAndroid.LONG);
      navigation.navigate('Recipes');
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error);
    }
  };

  return (
    <Layout>
      {iaCapture ? (
        iaLoading ? (
          <View style={styles.loading}>
            <Text>
              Le traitement de l'image est en cours, veuillez patienter...
            </Text>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <CameraCapture onPhotoTaken={handlePhotoTaken} />
        )
      ) : (
        <>
          <ScrollView onScroll={onScroll} scrollEventThrottle={16}>
            {imageFile?.uri && (
              <View style={styles.imageWrapper}>
                <Image
                  resizeMode="contain"
                  key={imageFile.uri}
                  alt=""
                  accessibilityLabel="image de la recette"
                  source={{ uri: imageFile.uri }}
                  style={styles.image}
                />
              </View>
            )}
            <Button
              onPress={handleImage}
              mode="contained"
              style={styles.button}
              textColor={COLORS.black}
              icon={() => renderIcon('black')}
            >
              {imageFile?.uri ? "Modifier l'image" : 'Ajouter une image'}
            </Button>

            <View style={styles.formWrapper}>
              <Controller
                name="title"
                control={control}
                rules={{ required: true, minLength: 3, maxLength: 128 }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Titre de la recette"
                    style={styles.inputStyle}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={!!errors.title}
                    placeholder="Entrez le titre de la recette"
                  />
                )}
              />
              {errors.title && (
                <Text style={styles.error}>{errors.title.message}</Text>
              )}

              <Controller
                name="description"
                control={control}
                rules={{ required: true, minLength: 3, maxLength: 128 }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Description de la recette"
                    style={styles.inputStyle}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={!!errors.description}
                    placeholder="Entrez la description de la recette"
                  />
                )}
              />
              {errors.description && (
                <Text style={styles.error}>{errors.description.message}</Text>
              )}

              <Text style={styles.titleInput}>
                Renseignez les INGREDIENTS de la recette en les séparant par une
                virgule :
              </Text>
              <Controller
                name="ingredients"
                control={control}
                rules={{ required: true, minLength: 3, maxLength: 128 }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Ingrédients de la recette"
                    multiline={true}
                    style={styles.inputStyle}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value.toString()}
                    error={!!errors.ingredients}
                    placeholder="Entrez les ingrédients de la recette"
                  />
                )}
              />
              {errors.ingredients && (
                <Text style={styles.error}>{errors.ingredients.message}</Text>
              )}

              <Text style={styles.titleInput}>
                Renseignez les ETAPES de la recette en les séparant d'un retour
                à la ligne :
              </Text>
              <Controller
                name="steps"
                control={control}
                rules={{ required: true, minLength: 3, maxLength: 128 }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Etapes de la recette"
                    multiline={true}
                    style={styles.inputStyle}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value.toString()}
                    error={!!errors.steps}
                    placeholder="Entrez les etapes de la recette"
                  />
                )}
              />
              {errors.steps && (
                <Text style={styles.error}>{errors.steps.message}</Text>
              )}

              <Controller
                name="prep_time"
                control={control}
                rules={{ required: true, minLength: 3, maxLength: 128 }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Temps de preparation"
                    style={styles.inputStyle}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={!!errors.prep_time}
                    placeholder="Entrez le temps de preparation"
                  />
                )}
              />
              {errors.prep_time && (
                <Text style={styles.error}>{errors.prep_time.message}</Text>
              )}

              <Controller
                name="cook_time"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Temps de cuisson"
                    style={styles.inputStyle}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={!!errors.cook_time}
                    placeholder="Entrez le temps de cuisson"
                  />
                )}
              />
              {errors.cook_time && (
                <Text style={styles.error}>{errors.cook_time.message}</Text>
              )}

              <Controller
                name="servings"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Nombre de personnes"
                    keyboardType="numeric"
                    style={styles.inputStyle}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={!!errors.servings}
                    placeholder="Entrez le nombre de personnes"
                  />
                )}
              />
              {errors.servings && (
                <Text style={styles.error}>{errors.servings.message}</Text>
              )}
            </View>

            <Button
              labelStyle={styles.saveRecipeButtonLabel}
              style={
                !isValid || isSubmitting
                  ? styles.saveRecipeButtonDisabled
                  : styles.saveRecipeButton
              }
              rippleColor={COLORS.primary}
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || isSubmitting}
              loading={isSubmitting}
            >
              Enregistrer
            </Button>
          </ScrollView>
          <FabButton
            visible={true}
            extended={isExtended}
            label="Scanner une recette via l'IA"
            textColor={COLORS.white}
            style={styles.fabStyle}
            icon={<LucideCamera color={COLORS.white} size={30} />}
            iconMode="dynamic"
            onPressEvent={() => setIaCapture(true)}
          />
        </>
      )}
    </Layout>
  );
};

export default AddRecipeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    marginTop: 40,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  button: {
    backgroundColor: COLORS.light_blue,
    marginTop: 20,
    marginHorizontal: 20,
  },
  backButton: {
    color: COLORS.primary_accent,
    fontSize: 14,
  },
  backButtonContent: {
    marginTop: 10,
    marginHorizontal: 80,
  },
  imageWrapper: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 5,
    marginVertical: 10,
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
  titleInput: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    color: COLORS.primary_accent,
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
  saveRecipeButton: {
    marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor: COLORS.primary_accent,
  },
  saveRecipeButtonDisabled: {
    marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor: COLORS.gray,
  },
  saveRecipeButtonLabel: {
    color: COLORS.white,
  },
  error: {
    color: 'red',
  },
  fabStyle: {
    backgroundColor: COLORS.black,
    textTransform: 'none',
    bottom: 70,
  },
});
