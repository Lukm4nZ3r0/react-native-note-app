import React, {Component} from 'react'
import {Text, View, TextInput, TouchableOpacity, Dimensions, FlatList, StyleSheet} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DrawerHeader from './DrawerHeader'
// import FlatListData from './FlatListData'
// import SortingModal from './SortingModal'
// import DeletePopUp from './DeletePopUp'
import _ from 'lodash'
//redux
import {itemSorting,getNotes,getTheNextPage,deleteNote,searchNote} from '../../publics/redux/actions/notes'
import {connect} from 'react-redux'

let {width,height} = Dimensions.get('window')

class HomeScreen extends Component {
    constructor(props){
      super(props)
      this.state={
        popUp:false,
        deletePopUp:false,
        searchKey:'',
        note:[],
        loading:false,
        nextPage:2
      }
    }
    componentDidMount(){
        this.props.dispatch(getNotes())

        this.subs = [
            this.props.navigation.addListener('willFocus', ()=>{
                console.log('will focus dashboard')
                this.setState({
                    loading:true
                })
                this.props.dispatch(getNotes())
            })
        ]
    }

    componentWillUnmount(){
        this.subs.forEach(sub=>{
            sub.remove()
        })
    }
    static navigationOptions = {
      header:null,
      tabBarLabel: 'Home!',
    };

    searchFunction = (text) =>{
        this.setState({
            searchKey:text
        })
        this.props.dispatch(searchNote(this.state.searchKey, 'DESC'))
    }
  
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

    // ---------------------------------- FlatList function ---------------------------
    setDefaultNextPage = () =>{
        this.setState({
            nextPage:2
        })
    }
    renderItem = ({item}) =>{
        // get format time
        let noteTimes = new Date(item.time).toString().split(' ')
        noteTimes = noteTimes[2]+' '+noteTimes[1]

        // get bgcolor
        let bgColor
        switch(item.category){
            case 'technology':
                bgColor='red'
                break;
            case 'lifestyle':
                bgColor='blue'
                break;
            case 'sport':
                bgColor='purple'
                break;
            case 'programming':
                bgColor='green'
                break;
            case 'school':
                bgColor='yellow'
                break;
            default:
                bgColor='black'
        }
        return(
            <TouchableOpacity 
                style={{width:'50%', padding:5}} 
                onPress={()=>this.props.navigation.navigate('EditNote',item)} 
                note={item.note} 
                onLongPress={()=>this.deletePopUpHandlerOpen(item)}
            >
                <View style={[styles.itemContainer, { backgroundColor: bgColor, elevation:10 }]}>
                    <View style={{position:'absolute',right:'5%', top:'5%'}}>
                        <Text style={{fontSize:17, fontWeight:'300', color:'#fff'}}>{noteTimes}</Text>
                    </View>
                    <View style={{marginTop:15}}>
                        <Text style={{fontSize:20, fontWeight:'bold', color:'#fff'}}>{item.title}</Text>
                        <Text style={{fontSize:14, fontWeight:'200', color:'#fff'}} numberOfLines={4}>{item.note}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    nextPage = () =>{
        this.props.dispatch(getTheNextPage(this.state.nextPage, this.props.notes.sort))
        this.setState({
            nextPage: this.state.nextPage+1
        })
    }
    _onRefresh = () =>{
        this.props.dispatch(getNotes())
        this.setDefaultNextPage()
    }
    // ---------------------------------- End FlatList function ---------------------------

    // ---------------------------------- Sorting Modal function -------------------------
    sortingData = (value) =>{
        this.props.dispatch(itemSorting(value))
        this.popUpHandler()
        this.setState({
            nextPage:2
        })
    }
    // ---------------------------------- End Sorting Modal function -------------------

    // ---------------------------------- DeletePopUp function -------------------------
    deleteData = () =>{
        this.props.dispatch(deleteNote(this.state.note))
        this.deletePopUpHandlerClose()
    }
    // ---------------------------------- End deletePopUp function --------------------
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
                    onChangeText={this.searchFunction}
                  />
                  <FontAwesome 
                    style={{fontSize:30, fontWeight:'bold'}} 
                    name="search"
                  />
                </View>
                <View style={{flex:9, marginTop:10, width:'100%'}}>




                  {/* <FlatListData navigation={this.props.navigation} deletePopUpHandlerOpen={this.deletePopUpHandlerOpen}/> */}
                  <FlatList
                    style={styles.gridView}
                    data={this.state.searchKey == ''? this.props.notes.data : this.props.notes.searchResult}
                    renderItem={this.renderItem}
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                    refreshing={this.props.notes.isLoading}
                    onRefresh={this._onRefresh}
                    onEndReached={()=>this.state.nextPage<=this.props.notes.totalPages&&this.nextPage()}
                    onEndReachedThreshold={0.1}
                  />




                </View>
              </View>
            </View>
            <View style={{padding:5, backgroundColor:'white', borderRadius:50, width:60, height:60, alignItems:'center', justifyContent:'center', position:'absolute', bottom:'3%', right:'5%', elevation:5}}>
              <TouchableOpacity onPress={() => {this.props.navigation.navigate('AddNote')}}>
              <FontAwesome style={{fontSize:35, color:'black'}} name="plus" />
              </TouchableOpacity>
            </View>
  






            {this.state.popUp? 
            // <SortingModal popUpHandler={this.popUpHandler}/> 
            <View style={{width:width, height:height, position:'absolute'}}>
              <TouchableOpacity style={{backgroundColor:'black', width:width, height:height, position:'absolute', zIndex:3, opacity:0.6}} onPress={this.popUpHandler}>
                <View />
              </TouchableOpacity>

              <View style={{backgroundColor:'white', borderRadius:10, elevation:9, position:'absolute', right:'5%', zIndex:3, top:height/20, padding:20}}>
                <TouchableOpacity style={{padding:10}} onPress={()=>this.sortingData('DESC')}>
                <Text style={{fontSize:20}}><FontAwesome style={{fontSize:20}} name="arrow-up" /> Ascending</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop:5, padding:10}} onPress={()=>this.sortingData('ASC')}>
                <Text style={{fontSize:20}}><FontAwesome style={{fontSize:20}} name="arrow-down" /> Descending</Text>
                </TouchableOpacity>
              </View>
            </View>
            : 
            <View/>
            }
  






            {this.state.deletePopUp?
            // <DeletePopUp deletePopUpHandlerClose={this.deletePopUpHandlerClose} note={this.state.note} />
            <View style={{width:width, height:height, position:'absolute'}}>
              <TouchableOpacity style={{backgroundColor:'black', width:width, height:height, position:'absolute', zIndex:3, opacity:0.6}} onPress={this.deletePopUpHandlerClose}>
                <View />
              </TouchableOpacity>

              <View style={{backgroundColor:'white', borderRadius:10, elevation:9, position:'absolute', zIndex:3, right:'20%', left:'20%', top:'40%', bottom:'40%', padding:20}}>
                <Text>Are you sure to delete this note ?</Text>
                <View style={{flex:1, flexDirection:'row', marginTop:20}}>
                    <TouchableOpacity style={{flex:1,alignItems:'center', justifyContent:'center'}} onPress={this.deleteData}>
                    <Text>YES</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1,alignItems:'center', justifyContent:'center'}} onPress={this.deletePopUpHandlerClose}>
                    <Text>NO</Text>
                    </TouchableOpacity>
                </View>
              </View>
            </View>
            :
            <View />
            }
          </View>
      )
    }
  }

const styles = StyleSheet.create({
gridView: {
    marginTop: 20,
    flex: 1,
},
itemContainer: {
    justifyContent: 'flex-start',
    borderRadius: 5,
    padding: 10,
    height: 150,
},
itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
},
itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
},
})

const mapStateToProps = (state) =>{
    return{
        notes: state.notes
    }
}

export default connect(mapStateToProps)(HomeScreen)