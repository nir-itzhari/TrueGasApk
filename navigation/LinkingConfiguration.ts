import * as Linking from 'expo-linking';
import { AuthStackParamList, RootStackParamList } from '../types';
import { LinkingOptions } from '@react-navigation/native';

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
          Assignments: {
            screens: {
              AssignmentsListScreen: 'assignments-list',
              AddAssignmentsScreen: 'add-assignment',
              AddClientScreenModal: 'add-client',
              AssignmentCardScreen: 'assignment-card'
            },
          },
        },
      },
      NotFound: '*',
      Login: 'login'
    },
  },
};

export default linking;
