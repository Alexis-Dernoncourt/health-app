import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  HomeTabBaseParamList,
  HomeTabParamList,
} from '../../../navigation/types';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Layout from '../../Layout';
import { COLORS } from '../../../lib/constants';
import { Image } from 'react-native';
import { ActivityIndicator, Appbar, Avatar, Button } from 'react-native-paper';
import { ArrowLeft, CookingPot, ForkKnife } from 'lucide-react-native';
import useDarkMode from '../../../hooks/useDarkMode';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { FlatList } from 'react-native';
import { recipeService } from '../../../services/recipeService';
import { useCurrentUser } from '../../../hooks';

const arrowLeftIcon = () => {
  return <ArrowLeft color={COLORS.black} size={30} />;
};
const RecipeDetailsScreen = () => {
  const { backgroundStyle } = useDarkMode();
  const navigation = useNavigation<BottomTabNavigationProp<HomeTabParamList>>();
  const { params } =
    useRoute<RouteProp<HomeTabBaseParamList, 'RecipeDetails'>>();
  const viewRef = React.useRef<ScrollView>(null);
  const { user, isLoading: userIsLoading } = useCurrentUser();

  useFocusEffect(() => {
    if (viewRef.current) {
      viewRef.current.scrollTo({
        x: 0,
        y: 0,
        animated: true,
      });
    }
  });

  const {
    data: recipeData,
    isLoading,
    error,
  } = recipeService.useGetRecipe(params.recipeId);

  if (error) {
    return (
      <Layout>
        <View style={styles.container}>
          <Text style={styles.errorText}>
            {error.message ?? 'Une erreur est survenue'}
          </Text>
        </View>
      </Layout>
    );
  }

  if (isLoading || !recipeData) {
    return (
      <Layout>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <View style={[styles.container, { flex: 1 }]}>
          <ActivityIndicator size="large" color={COLORS.primary_accent} />
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      {navigation.canGoBack() && (
        <Appbar.Header
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            backgroundColor: backgroundStyle.backgroundColor,
            elevation: 5,
          }}
        >
          <Appbar.Action
            isLeading={true}
            accessibilityLabel="Go to recipes screen"
            importantForAccessibility="yes"
            onPress={() => {
              navigation.navigate('Recipes');
            }}
            icon={arrowLeftIcon}
          />
          <Appbar.Content title="Détail de la recette" />
        </Appbar.Header>
      )}
      <ScrollView
        contentContainerStyle={styles.container}
        ref={viewRef}
        scrollsToTop={true}
      >
        <Text style={styles.recipeTitle}>{recipeData.title}</Text>
        {recipeData.image && (
          <Image
            style={styles.image}
            source={{
              uri: recipeData.image,
            }}
          />
        )}
        <Button
          mode="contained"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ backgroundColor: COLORS.secondary, marginVertical: 10 }}
          labelStyle={{ color: COLORS.black }}
          onPress={() => {
            console.log('Ajouter la recette au menu de la semaine');
          }}
        >
          Ajouter au menu
        </Button>

        {user?.id === recipeData.userId && !userIsLoading && (
          <Button
            mode="contained"
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ backgroundColor: COLORS.black, marginVertical: 10 }}
            labelStyle={{ color: COLORS.white }}
            onPress={() => {
              console.log('Modifier la recette');
            }}
          >
            Modifier
          </Button>
        )}

        {recipeData.servings && recipeData.cook_time && (
          <View style={styles.iconContainer}>
            <View style={styles.iconContent}>
              <Avatar.Icon
                // eslint-disable-next-line react/no-unstable-nested-components
                icon={() => <ForkKnife />}
                size={30}
                color={COLORS.primary_accent}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ backgroundColor: 'transparent' }}
              />
              <Text style={styles.iconTextContent}>{recipeData.servings}</Text>
            </View>
            <View style={styles.iconContent}>
              <Avatar.Icon
                // eslint-disable-next-line react/no-unstable-nested-components
                icon={() => <CookingPot />}
                size={30}
                color={COLORS.primary_accent}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ backgroundColor: 'transparent' }}
              />
              <Text style={styles.iconTextContent}>{recipeData.cook_time}</Text>
            </View>
          </View>
        )}
        {recipeData.description &&
        recipeData.description.split('+').length === 1 ? (
          <Text style={styles.text}>{recipeData.description}</Text>
        ) : (
          <>
            <Text style={styles.text}>
              {recipeData.description.split('+')[0]}
            </Text>
            <Text style={styles.text}>
              {recipeData.description.split('+')[1]}
            </Text>
          </>
        )}
        {recipeData.ingredients && (
          <>
            <Text style={styles.textIngredientTitle}>INGREDIENTS</Text>
            <View style={styles.ingredientsContainer}>
              <FlatList
                scrollEnabled={false}
                numColumns={2}
                data={recipeData.ingredients
                  .split(', ')
                  .map(ingredient => ingredient.trim())}
                renderItem={({ item }) => (
                  <View style={styles.ingredientItem}>
                    <Text>●</Text>
                    <Text>{`${item.toUpperCase()}`}</Text>
                  </View>
                )}
              />
            </View>
          </>
        )}
        {recipeData.steps && (
          <>
            <Text style={styles.textIngredientTitle}>Les étapes</Text>
            <View style={styles.stepsContainer}>
              {recipeData.steps.split('\n').map((step, index) => {
                return (
                  <Text key={step + index} style={styles.textSteps}>
                    <>{step}</>
                  </Text>
                );
              })}
            </View>
          </>
        )}
      </ScrollView>
    </Layout>
  );
};

export default RecipeDetailsScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 15,
    width: '100%',
  },
  iconContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTextContent: {
    fontSize: 16,
    fontWeight: '500',
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark_red,
  },
  mainTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  recipeTitle: {
    marginVertical: 10,
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: COLORS.black,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: COLORS.black,
  },
  ingredientsContainer: {
    marginVertical: 15,
    flexWrap: 'wrap',
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ingredientItem: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 5,
    flex: 1,
    gap: 10,
    marginStart: 10,
    marginEnd: 10,
  },
  stepsContainer: {
    marginTop: 10,
    marginBottom: 35,
    marginHorizontal: 30,
    flexWrap: 'wrap',
    gap: 10,
    flexDirection: 'row',
  },
  textIngredientTitle: {
    backgroundColor: COLORS.light_blue,
    padding: 10,
    borderRadius: 5,
    transform: [{ skewY: '1.5deg' }],
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: COLORS.black,
    marginTop: 20,
  },
  textIngredient: {
    fontSize: 16,
    color: COLORS.black,
  },
  textSteps: {
    fontSize: 18,
    color: COLORS.black,
  },
  image: {
    width: '90%',
    height: 200,
    borderRadius: 10,
    objectFit: 'cover',
  },
});
