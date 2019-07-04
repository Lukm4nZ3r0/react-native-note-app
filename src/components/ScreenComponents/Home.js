import React, {Component} from 'react'
import {Text, View, TextInput, TouchableOpacity, Dimensions, FlatList} from 'react-native'
import styles from '../styles'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DrawerHeader from './DrawerHeader'
import FlatListData from './FlatListData'
import { createAppContainer, createStackNavigator } from 'react-navigation';
import AddNote from './AddNote'
import EditNote from './EditNote'
import SortingModal from './SortingModal'
import DeletePopUp from './DeletePopUp'

let {width, height} = Dimensions.get('window')

class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      popUp:false,
      deletePopUp:false,
      note:[]
    }
  }
  static navigationOptions = {
    header:null,
    tabBarLabel: 'Home!',
  };

  popUpHandler = () =>{
    let popUpState = this.state.popUp
    this.setState({
      popUp: !popUpState
    })
  }

  deletePopUpHandlerOpen = (item) =>{
    this.setState({
      deletePopUp: true,
      note: item
    })
  }

  deletePopUpHandlerClose = () =>{
    this.setState({
      deletePopUp: false
    })
  }

  render() {
    return (
        <View style={{flex:1}}>
          <DrawerHeader 
            style={{flex:1}} navigation={this.props.navigation} home={true} 
            title="NOTE APP" 
            popUpHandler={this.popUpHandler}
          />
          <View style={{flex:6}}>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
              <View style={{borderWidth:1, flexDirection:'row', borderRadius:50, borderColor:'black', backgroundColor:'white', height:60, width:'95%', marginTop:80, alignItems:'center', justifyContent:'center', elevation:5}}>
                <TextInput 
                  style={{width:'80%'}} 
                  placeholder="Search..."
                />
                <FontAwesome 
                  style={{fontSize:30, fontWeight:'bold'}} 
                  name="search"
                />
              </View>
              <View style={{flex:9, marginTop:10, width:'100%'}}>
                <FlatListData navigation={this.props.navigation} deletePopUpHandlerOpen={this.deletePopUpHandlerOpen}/>
              </View>
            </View>
          </View>
          <View style={{padding:5, backgroundColor:'white', borderRadius:50, width:60, height:60, alignItems:'center', justifyContent:'center', position:'absolute', bottom:'3%', right:'5%', elevation:5}}>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('AddNote')}}>
            <FontAwesome style={{fontSize:35, color:'black'}} name="plus" />
            </TouchableOpacity>
          </View>

          {this.state.popUp? <SortingModal popUpHandler={this.popUpHandler}/> : <View/>}

          {this.state.deletePopUp? <DeletePopUp deletePopUpHandlerClose={this.deletePopUpHandlerClose} note={this.state.note} />:<View />}
        </View>
    )
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
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