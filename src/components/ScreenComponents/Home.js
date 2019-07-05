import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen'
import AddNote from './AddNote'
import EditNote from './EditNote'

const AppNavigator = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
  },
  AddNote: {
    screen: AddNote,
  },
  EditNote: {
    screen: EditNote,
    navigationOptions:({navigation})=>({
      title:'Edit This Note'
    })
  }
});

const HomeContainer = createAppContainer(AppNavigator)

export default HomeContainer