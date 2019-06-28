import React, {Component} from 'react'
import {Text, View, TextInput, TouchableOpacity, Dimensions, FlatList} from 'react-native'
import styles from '../styles'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DrawerHeader from './DrawerHeader'
import FlatListData from './FlatListData'
import { createAppContainer, createStackNavigator } from 'react-navigation';
import AddNote from './AddNote'
import EditNote from './EditNote'

let {width, height} = Dimensions.get('window')

class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      popUp:false,
      widthScreen:width,
      heightScreen:height
    }
  }
  static navigationOptions = {
    header:null,
    tabBarLabel: 'Home!',
  };
  
  getNoteData = (newId,newTitle,newNote,newCategory) =>{
    this.setState({
      id: newId,
      title: newTitle,
      note: newNote,
      category: newCategory
    })  
  }

  popUpHandler = () =>{
    let popUpState = this.state.popUp
    this.setState({
      popUp: !popUpState
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
                <FlatListData navigation={this.props.navigation} />
              </View>
            </View>
          </View>
          <View style={{padding:5, backgroundColor:'white', borderRadius:50, width:60, height:60, alignItems:'center', justifyContent:'center', position:'absolute', bottom:'3%', right:'5%', elevation:5}}>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('AddNote')}}>
            <FontAwesome style={{fontSize:35, color:'black'}} name="plus" />
            </TouchableOpacity>
          </View>

          {this.state.popUp?
            <View style={{width:width, height:height, position:'absolute'}}>
              <TouchableOpacity style={{backgroundColor:'black', width:this.state.widthScreen, height:this.state.heightScreen, position:'absolute', zIndex:3, opacity:0.6}} onPress={()=>this.popUpHandler()}>
                <View />
              </TouchableOpacity>

              <View style={{backgroundColor:'white', borderRadius:10, elevation:9, position:'absolute', right:'5%', zIndex:3, top:height/20, padding:20}}>
                <TouchableOpacity style={{padding:10}} onPress={()=>{console.warn('Tes Ascending')}}>
                <Text style={{fontSize:20}}><FontAwesome style={{fontSize:20}} name="arrow-up" /> Ascending</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop:5, padding:10}} onPress={()=>{console.warn('Tes Descending')}}>
                <Text style={{fontSize:20}}><FontAwesome style={{fontSize:20}} name="arrow-down" /> Descending</Text>
                </TouchableOpacity>
              </View>
            </View>
            :
            <View/>
          }
        </View>
    );
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

export default createAppContainer(AppNavigator);