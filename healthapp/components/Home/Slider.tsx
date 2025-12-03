import { Dimensions, Image, StyleSheet, View } from 'react-native';
import React, { memo } from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { ActivityIndicator, Text } from 'react-native-paper';
import { Recipe } from '../../api/types';
import { COLORS } from '../../lib/constants';
import { useCurrentUser } from '../../hooks';
import { Pressable } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { HomeTabParamList } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';

export const ISBImageItem = memo(({ recipe }: { recipe: Recipe }) => {
  const navigation = useNavigation<BottomTabNavigationProp<HomeTabParamList>>();
  const { user } = useCurrentUser();

  if (!recipe.image) {
    return null;
  }

  return (
    <Pressable
      style={styles.imageContainer}
      onPress={() => {
        if (user) {
          navigation.navigate('RecipeDetails', { recipeId: recipe.id });
        }
      }}
    >
      <ActivityIndicator size="small" />
      <Image
        style={styles.image}
        source={{
          uri: recipe.image,
        }}
      />
      <Text style={styles.imageTitle}>{recipe.title}</Text>
    </Pressable>
  );
});

const PaginationItem: React.FC<{
  index: number;
  backgroundColor: string;
  length: number;
  animValue: SharedValue<number>;
}> = props => {
  const { animValue, index, length, backgroundColor } = props;
  const width = 10;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width / 2, 0, width / 2];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <View
      style={[
        styles.paginationItem,
        {
          width,
          height: width,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.paginationItemAnimated,
          {
            backgroundColor,
          },
          animStyle,
        ]}
      />
    </View>
  );
};

const Slider = ({
  setScrollEnabled,
  recipesData,
  isLoading,
  error,
  isRefetching,
  height = 220,
  width,
}: {
  setScrollEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  recipesData: Recipe[] | undefined;
  isLoading: boolean;
  error: any;
  isRefetching: boolean;
  height?: number;
  width?: number;
}) => {
  const window = Dimensions.get('window');
  const PAGE_WIDTH = window.width;
  const progressValue = useSharedValue(0);

  const baseOptions = {
    width: width ?? PAGE_WIDTH,
    height: height,
    autoPlay: false,
  };

  if (error) {
    return (
      <View style={styles.EorLcontainer}>
        <Text>Il n'y a pas de recettes à afficher.</Text>
      </View>
    );
  }

  if (isLoading || isRefetching) {
    return (
      <View style={styles.EorLcontainer}>
        <ActivityIndicator size="large" color={COLORS.light_blue} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {recipesData && (
        <Carousel
          {...baseOptions}
          snapEnabled={true}
          // panGestureHandlerProps={{ activeOffsetX: [-10, 10] }}
          loop={false}
          vertical={false}
          onScrollStart={() => setScrollEnabled(false)}
          // onScrollEnd={() => setScrollEnabled(true)}
          onProgressChange={(progress, absoluteProgress) => {
            if (!progress.toString().includes('.')) {
              setScrollEnabled(true);
            }
            return (progressValue.value = absoluteProgress);
          }}
          mode="parallax"
          data={recipesData}
          renderItem={data => <ISBImageItem recipe={data.item} />}
          // customConfig={() => {
          //   return {type: 'negative', viewCount: 2};
          // }}
        />
      )}
      {!!progressValue && (
        <View style={styles.paginationContainer}>
          {recipesData?.map((recipe, index) => {
            return (
              <PaginationItem
                backgroundColor={COLORS.primary_accent}
                animValue={progressValue}
                index={index}
                key={recipe.id}
                length={recipesData.length}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  EorLcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    width: '90%',
    height: '100%',
    left: -35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  imageTitle: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: '90%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    color: COLORS.white,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 80,
    alignItems: 'center',
  },
  paginationItem: {
    backgroundColor: COLORS.gray,
    borderRadius: 50,
    overflow: 'hidden',
  },
  paginationItemAnimated: {
    borderRadius: 50,
    flex: 1,
  },
});
