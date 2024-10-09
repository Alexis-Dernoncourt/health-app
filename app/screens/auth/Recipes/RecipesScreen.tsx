import {
  FlatList,
  Image,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Layout from '../../Layout';
import {useRecipes} from '../../../hooks/react-query/recipes';
import {Recipe} from '../../../lib/axios/types';
import {COLORS} from '../../../lib/constants';
import {HomeTabScreenProps} from '../../../navigation/types';

const RecipesScreen = ({navigation}: HomeTabScreenProps<'Recipes'>) => {
  const {
    data: recipesData,
    // isLoading,
    error,
    isRefetching,
    refetch,
  } = useRecipes();

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

  return (
    <Layout>
      <View style={styles.container}>
        <Text>Les recettes</Text>
        <FlatList
          //   ListHeaderComponent={ListHeaderComponent}
          //   ListFooterComponent={ListFooterComponent}
          contentContainerStyle={styles.flatListWrapper}
          style={styles.flatListStyles}
          data={recipesData?.recipes}
          refreshing={isRefetching}
          ListEmptyComponent={renderEmptyItem}
          onRefresh={refetch}
          keyExtractor={item => {
            return item.id.toString();
          }}
          renderItem={renderItem}
        />
      </View>
      <Pressable
        style={styles.buttonAddContainer}
        android_ripple={{
          color: COLORS.primary,
          borderless: true,
          radius: 60,
          foreground: true,
        }}
        onPress={() => navigation.navigate('AddRecipe')}>
        <View style={styles.buttonAddPlus}>
          <Text style={styles.buttonAddPlusText}>+</Text>
        </View>
        <View style={styles.buttonAddTextContainer}>
          <Text style={styles.buttonAddText}>Ajouter une recette</Text>
        </View>
      </Pressable>
    </Layout>
  );
};

// const ListHeaderComponent = () => <Text>ListHeaderComponent</Text>;
// const ListFooterComponent = () => <Text>ListFooterComponent</Text>;

const renderEmptyItem = () => <Text>Il n'y a pas de recettes</Text>;

const renderItem: ListRenderItem<Recipe> | undefined = ({item}) => (
  <View style={styles.flatListItemWrapper}>
    <Image
      style={styles.image}
      source={{
        uri: item.image?.url,
      }}
    />
    <View style={styles.flatListItemContent}>
      <Text>{item.title}</Text>
    </View>
  </View>
);
export default RecipesScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  flatListWrapper: {
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  flatListStyles: {
    width: '100%',
  },
  flatListItemWrapper: {
    borderRadius: 4,
    backgroundColor: 'red',
    width: '100%',
    height: 200,
    marginVertical: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  flatListItemContent: {
    padding: 20,
  },
  errorText: {
    marginTop: 20,
    fontSize: 16,
    color: COLORS.red,
  },
  buttonAddContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'transparent',
    borderColor: COLORS.primary_accent,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonAddPlus: {
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary_accent,
  },
  buttonAddPlusText: {
    fontSize: 32,
    lineHeight: 35,
    fontWeight: 'thin',
    color: COLORS.black,
  },
  buttonAddTextContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 2,
    marginTop: 5,
    padding: 5,
  },
  buttonAddText: {
    color: COLORS.black,
    fontSize: 12,
  },
});
