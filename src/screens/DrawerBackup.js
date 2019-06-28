import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {
  createDrawerNavigator,
  createAppContainer,
  createStackNavigator
} from 'react-navigation';
import Home from '../components/ScreenComponents/Home'
import Profile from '../components/ScreenComponents/Profile'
import HeaderMenu from '../components/ScreenComponents/HeaderMenu'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
  
// const AppNavigator = createStackNavigator(
// {
//     Home,
//     Profile
// },
// {
//     defaultNavigationOptions:({navigation})=>{
//         return {
//             headerLeft:(
//             <FontAwesome style={{paddingLeft:10, fontWeight:'bold', fontSize:20}} name="bars" onPress={() => navigation.openDrawer()} />
//             ),
//             headerRight:(
//             <FontAwesome style={{paddingRight:10, fontWeight:'bold', fontSize:20}} name="arrow-left" onPress={()=>navigation.goBack()} />
//             )
//         }
//     }
// }
// );

const navigator = createDrawerNavigator(
  {
    Home,
    Profile
  },
  {
    // drawerType: 'back',
    // drawerPosition: 'right',
    // drawerWidth: 200,
    // drawerBackgroundColor: 'orange',
    contentComponent: HeaderMenu
  }
);

export default createAppContainer(navigator);

