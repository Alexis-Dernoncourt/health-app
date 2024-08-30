import {Dimensions, Image, StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import {ActivityIndicator, Text} from 'react-native-paper';
import {useRecipes} from '../../hooks/react-query/recipes';
import {Recipe} from '../../lib/axios/types';
import {useImage} from '../../hooks/react-query/images';
import {COLORS} from '../../lib/constants';

export const ISBImageItem = memo(({recipe}: {recipe: Recipe}) => {
  const {data: imageData, isLoading, error} = useImage(recipe.image);

  if (error) {
    return null;
  }

  return (
    <View style={styles.imageContainer}>
      {isLoading && <ActivityIndicator size="small" />}
      <Image
        style={styles.image}
        source={{
          uri: imageData?.image.url,
        }}
      />
      <Text style={styles.imageTitle}>{recipe.title}</Text>
    </View>
  );
});

const PaginationItem: React.FC<{
  index: number;
  backgroundColor: string;
  length: number;
  animValue: SharedValue<number>;
}> = props => {
  const {animValue, index, length, backgroundColor} = props;
  const width = 10;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
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
      ]}>
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
}: {
  setScrollEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const window = Dimensions.get('window');
  const PAGE_WIDTH = window.width;
  const progressValue = useSharedValue(0);
  const {data: recipesData, isLoading, error, isRefetching} = useRecipes();
  const CAROUSEL_ITEMS = recipesData?.recipes;

  const baseOptions = {
    width: PAGE_WIDTH,
    height: 220,
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
      {CAROUSEL_ITEMS && (
        <Carousel
          {...baseOptions}
          snapEnabled={true}
          panGestureHandlerProps={{activeOffsetX: [-10, 10]}}
          loop={false}
          vertical={false}
          onScrollBegin={() => setScrollEnabled(false)}
          // onScrollEnd={() => setScrollEnabled(true)}
          onProgressChange={(progress, absoluteProgress) => {
            if (!progress.toString().includes('.')) {
              setScrollEnabled(true);
            }
            return (progressValue.value = absoluteProgress);
          }}
          mode="parallax"
          data={CAROUSEL_ITEMS}
          renderItem={data => <ISBImageItem recipe={data.item} />}
          // customConfig={() => {
          //   return {type: 'negative', viewCount: 2};
          // }}
        />
      )}
      {!!progressValue && (
        <View style={styles.paginationContainer}>
          {CAROUSEL_ITEMS?.map((recipe, index) => {
            return (
              <PaginationItem
                backgroundColor={COLORS.primary_accent}
                animValue={progressValue}
                index={index}
                key={recipe.id}
                length={CAROUSEL_ITEMS.length}
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
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 20,
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
