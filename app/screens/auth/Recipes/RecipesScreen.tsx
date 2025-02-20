import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
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
import {HomeTabParamList, HomeTabScreenProps} from '../../../navigation/types';
import FabButton from '../../../components/Elements/FAB';
import {Plus} from 'lucide-react-native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

const RecipesScreen = ({navigation}: HomeTabScreenProps<'Recipes'>) => {
  const [isExtended, setIsExtended] = React.useState(true);
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition =
      Math.floor(event.nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 10);
  };
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
        <Text style={styles.topTitle}>Les recettes</Text>
        <FlatList
          //   ListHeaderComponent={ListHeaderComponent}
          //   ListFooterComponent={ListFooterComponent}
          contentContainerStyle={styles.flatListWrapper}
          style={styles.flatListStyles}
          data={recipesData}
          refreshing={isRefetching}
          ListEmptyComponent={renderEmptyItem}
          onRefresh={refetch}
          keyExtractor={item => {
            return item.id.toString();
          }}
          renderItem={({item}) => renderItem({item, navigation})}
          onScroll={onScroll}
        />
      </View>
      <FabButton
        visible={true}
        extended={isExtended}
        label="Ajouter une recette"
        style={styles.fabStyle}
        icon={<Plus color={COLORS.primary_accent} size={32} />}
        iconMode="dynamic"
        onPressEvent={() => navigation.navigate('AddRecipe')}
      />
    </Layout>
  );
};

// const ListHeaderComponent = () => <Text>ListHeaderComponent</Text>;
// const ListFooterComponent = () => <Text>ListFooterComponent</Text>;

const renderEmptyItem = () => <Text>Il n'y a pas de recettes</Text>;

const renderItem = ({
  item,
  navigation,
}: {
  item: Recipe;
  navigation: BottomTabNavigationProp<HomeTabParamList, 'Recipes', undefined>;
}) => {
  return (
    <TouchableOpacity
      style={styles.flatListItemWrapper}
      onPress={() => {
        navigation.navigate('RecipeDetails', {recipeId: item.id});
      }}
      activeOpacity={0.8}
      key={item.id.toString()}>
      <Image
        style={styles.image}
        source={{
          uri: item.image,
        }}
      />
      <View style={styles.flatListItemContent}>
        <Text style={styles.flatListItemTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default RecipesScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  topTitle: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: COLORS.black,
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
    marginVertical: 15,
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
  flatListItemTitle: {
    color: COLORS.white,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 40,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  errorText: {
    marginTop: 20,
    fontSize: 16,
    color: COLORS.red,
  },
  fabStyle: {
    backgroundColor: COLORS.primary,
    color: COLORS.dark_red,
  },
});
