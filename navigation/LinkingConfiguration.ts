import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { AuthStackParamList, RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList & AuthStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          Reports: {
            screens: {
              ReportsScreen: 'reports',
            },
          },
          Tasks: {
            screens: {
              TaskScreen: 'tasks',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
      Login: 'login'
    },
  },
};

export default linking;
