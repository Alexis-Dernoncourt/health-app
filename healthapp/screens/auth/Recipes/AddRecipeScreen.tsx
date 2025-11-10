import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HomeTabScreenProps} from '../../../navigation/types';
import {Button} from 'react-native-paper';
import Input from '../../../components/Form/Input';
import IngredientsForm from '../../../components/AddRecipe/IngredientsForm';
import Layout from '../../Layout';
import {COLORS} from '../../../lib/constants';
import ImagePicker from '../../../components/AddRecipe/ImagePicker';

const AddRecipeScreen = ({navigation}: HomeTabScreenProps<'AddRecipe'>) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [ingredients, setIngredients] = React.useState<
    {id: string; name: string; quantity: string; unit: string}[]
  >([]);
  const [ingredientArray, setIngredientArray] = React.useState([1, 2, 3]);
  console.log('🚀 ~ AddRecipeScreen ~ ingredients:', ingredients);

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <Text style={styles.title}>Ajoute une recette</Text>
        <Button
          labelStyle={styles.backButton}
          rippleColor={COLORS.primary}
          onPress={() => {
            Alert.alert(
              'Etes-vous sur de vouloir quitter cet écran ?',
              'Vos modifications pourraient être perdues.',
              [
                {text: 'Annuler', style: 'cancel'},
                {
                  text: 'Confirmer',
                  onPress: () => navigation.navigate('Recipes'),
                },
              ],
            );
          }}>
          Revenir en arrière
        </Button>

        <ImagePicker />

        <View style={styles.formWrapper}>
          <Input
            label="Titre de la recette"
            keyboardType="default"
            value={title}
            // error={emailErrorText.length > 0}
            style={styles.inputStyle}
            onChangeText={(val: string) => setTitle(val)}
          />
          {/* {title->error && (
              <Text style={styles.errorText}>{titleErrorText}</Text>
              )} */}
          <Input
            label="Description de la recette"
            multiline={true}
            keyboardType="default"
            value={description}
            // error={emailErrorText.length > 0}
            style={styles.descriptionInput}
            onChangeText={(val: string) => setDescription(val)}
          />
          {/* {title->error && (
              <Text style={styles.errorText}>{titleErrorText}</Text>
              )} */}

          <Text style={styles.titleIngredients}>
            Renseignez les ingrédients :
          </Text>
          {ingredientArray.map(item => {
            return (
              <IngredientsForm
                key={item}
                itemId={item}
                setIngredientArray={setIngredientArray}
                setIngredients={setIngredients}
              />
            );
          })}
          <Button
            mode="contained"
            style={styles.addIngredientButton}
            onPress={() => {
              setIngredientArray(prev => {
                if (!prev.length) {
                  return [1];
                }
                return [...prev, prev.at(-1)! + 1];
              });
            }}>
            Ajouter un autre ingrédient
          </Button>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default AddRecipeScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
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
});
