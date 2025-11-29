// import type {CompositeScreenProps} from '@react-navigation/native';
import { NavigatorScreenParams } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// TODO: refactor : remove RootParamsGlobal & duplication if needed
export type RootStackParamList = {
  Tab: NavigatorScreenParams<HomeTabParamList>;
  AddRecipe: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type HomeTabBaseParamList = {
  Home: undefined;
  Profile: undefined;
  Recipes: undefined;
  RecipeDetails: { recipeId: string };
  Menus: undefined;
  AddRecipe: undefined;
  EditProfile: undefined;
};

export type HomeTabUnloggedParamList = {
  Home: undefined;
  SignIn: undefined;
  Register: undefined;
};

export type HomeTabParamList = HomeTabBaseParamList & HomeTabUnloggedParamList;

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  // CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, T>;
//   StackScreenProps<RootStackParamList>
// >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends HomeTabParamList {}
  }
}
