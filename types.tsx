/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type AuthStackParamList = {
  Login: undefined;
};


export type AssignmentsStackParamList = {
  AssignmentsListScreen: undefined;
  AddAssignmentScreen: undefined;
  AddClientScreenModal: undefined;
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  NotFound: undefined;
};

export type AssignmentsStackScreenProps<Screen extends keyof AssignmentsStackParamList> = NativeStackScreenProps<
  AssignmentsStackParamList,
  Screen
>;

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  Screen
>;


export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Home: { user_id: string };
  Reports: undefined;
  Assignments: NavigatorScreenParams<AssignmentsStackParamList> | undefined;
  AddAssignment: undefined;
  AddClientScreenModal: undefined;

};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
