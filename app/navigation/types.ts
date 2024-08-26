import type {CompositeScreenProps} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

// TODO: refactor : remove RootParamsGlobal & duplication if needed
export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

export type RootStackParamListUnlogged = {
  HomePublic: undefined;
  Toto: undefined;
};

export type RootParamsGlobal = RootStackParamList & RootStackParamListUnlogged;

export type RootStackScreenProps<T extends keyof RootParamsGlobal> =
  StackScreenProps<RootParamsGlobal, T>;

export type HomeTabBaseParamList = {
  Home: undefined;
  Details: undefined;
};

export type HomeTabUnloggedParamList = {
  HomePublic: undefined;
  SignIn: undefined;
  Register: undefined;
};

export type HomeTabParamList = HomeTabBaseParamList & HomeTabUnloggedParamList;

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    RootStackScreenProps<keyof RootParamsGlobal>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootParamsGlobal {}
  }
}
