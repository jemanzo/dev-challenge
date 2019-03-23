import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';

import UserScene from './UserScene';
import UsersScene from './UsersScene';
import CompanyScene from './CompanyScene';
import CompaniesScene from './CompaniesScene';

const HomeScene = createBottomTabNavigator(
  {
    UsersScene,
    CompaniesScene
  },
  {
    initialRouteName: 'UsersScene',
    headerMode: 'screen'
  }
);

export default createStackNavigator(
  {
    HomeScene,
    UserScene,
    CompanyScene
  },
  {
    initialRouteName: 'HomeScene',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#CCCCCC'
      }
    }
  }
);
