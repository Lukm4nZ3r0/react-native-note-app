import React, {Component} from 'react'
import {View, Text} from 'react-native'
import Drawer from './src/components/ScreenComponents/Drawer'
import { Provider } from 'react-redux'
import store from './src/publics/redux/store'

export default class App extends Component{
  render(){
    return(
      <Provider store={store}>
        <Drawer />
      </Provider>
    )
  }
}