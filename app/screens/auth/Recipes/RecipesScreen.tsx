import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Layout from '../../Layout';
import {useRecipes} from '../../../hooks/react-query/recipes';
import {Recipe} from '../../../lib/axios/types';
import {COLORS} from '../../../lib/constants';

const RecipesScreen = () => {
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
      <TouchableOpacity style={styles.buttonAddContainer} activeOpacity={0.7}>
        <Text style={styles.buttonAddPlus}>+</Text>
        <Text>Ajouter une recette</Text>
      </TouchableOpacity>
    </Layout>
  );
};

// const ListFooterComponent = () => <Text>ListFooterComponent</Text>;

const renderEmptyItem = () => <Text>Il n'y a pas de recettes</Text>;

const renderItem: ListRenderItem<Recipe> | undefined = ({item}) => (
  <View style={styles.flatListItemWrapper}>
    <Text>{item.title}</Text>
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
    alignItems: 'center',
  },
  flatListStyles: {
    width: '100%',
  },
  flatListItemWrapper: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'red',
    width: 250,
    marginVertical: 10,
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
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 50,
    padding: 10,
    textAlign: 'center',
    color: COLORS.white,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary_accent,
  },
});
