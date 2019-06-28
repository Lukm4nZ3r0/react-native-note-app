import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {
  createDrawerNavigator,
  createAppContainer,
  createStackNavigator
} from 'react-navigation';
import Home from './Home'
import SearchByCategory from './SearchByCategory'
import AddCategory from './AddCategory'
import HeaderMenu from './HeaderMenu'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const navigator = createDrawerNavigator(
  {
    Home,
    AddCategory,
    SearchByCategory
  },
  {
    // drawerType: 'back',
    // drawerPosition: 'right',
    // drawerWidth: 200,
    // drawerBackgroundColor: 'orange',
    contentComponent: HeaderMenu
  }
);

const Drawer = createAppContainer(navigator)

export default Drawer

