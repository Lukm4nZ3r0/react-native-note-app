import React, {Component} from 'react'
import {ScrollView, Image, Text, View, TouchableOpacity, Dimensions, Modal, TextInput, Button} from 'react-native'
import {DrawerItems, SafeAreaView} from 'react-navigation'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import styles from '../styles'
//redux
import {getCategories, addCategory} from '../../publics/redux/actions/categories'
import {connect} from 'react-redux'

const {width,height} = Dimensions.get('window')

class HeaderMenu extends Component{
  constructor(props){
    super(props)
    this.state={
      modalVisible: false,
      categoryRoutes:[
        {id:0, name:'personal', label:'Personal', icon:'user'},
        {id:1, name:'work', label:'Work', icon:'suitcase'},
        {id:2, name:'wish list', label:'Wish List', icon:'list-alt'}
      ],
      categoryName:'',
      categoryIcon:''
    }
  }
  componentWillMount(){
    this.props.dispatch(getCategories())
  }
  getCategoryRoutesButton = () =>{
    return this.props.categories.categoriesData.map(item=>(
      <TouchableOpacity key={item.id} style={{flex:1, flexDirection:'row', padding:15}} onPress={()=>this.props.navigation.navigate('SearchByCategory',{categoryName:item.category})}>
        <View style={{flex:1, alignItems:'center', justifyContent: 'center',}}>
          <FontAwesome style={styles.drawerIcon} name='user'/>
        </View>
        <Text style={{flex:4, fontSize:20, fontWeight:'400'}}>{item.category}</Text>
      </TouchableOpacity>
    ))
  }
  setModalVisible = (visible) =>{
    this.setState({
      modalVisible:visible,
      categoryName:'',
      categoryIcon:''
    })
  }
  addCategoryRoutes = () =>{
    if(this.state.categoryName !== ''){
      // let categoryItem = this.state.categoryRoutes.concat({
      //   id:this.state.categoryRoutes.length + 1,
      //   name:this.state.categoryName.toLowerCase(),
      //   label:this.state.categoryName,
      //   icon:this.state.categoryIcon
      // })
      // this.setState({
      //   categoryRoutes: categoryItem
      // })
      let {categoryName, categoryIcon} = this.state
      this.props.dispatch(addCategory({category:categoryName, image:categoryIcon}))
      this.setModalVisible(false)
    }
  }
  render(){
    console.log('ini adalah kumpulan categories', this.props.categories.categoriesData)
    return(
        <SafeAreaView
          style={{backgroundColor:'white', flex:1}}
          forceInset={{ top: 'always', horizontal: 'never' }}>
          <View style={styles.profileMenu}>
              <Image
              style={styles.image}
              source={require('../../../assets/images/IMG_42692.jpg')}
              />
              <Text style={{fontWeight:'bold', marginTop:10, fontSize:20}}>Asep Lukman Hakim</Text>
          </View>
          <View style={{flex:2}}>
            <ScrollView>
            {this.getCategoryRoutesButton()}

            <TouchableOpacity style={{flex:1, flexDirection:'row', padding:15}} onPress={()=>this.setModalVisible(true)}>
              <View style={{flex:1, alignItems:'center', justifyContent: 'center',}}>
                <FontAwesome style={styles.drawerIcon} name="plus-circle"/>
              </View>
              <Text style={{flex:3, fontSize:20, fontWeight:'400'}}>Add Category</Text>
            </TouchableOpacity>

              <Modal animationType="slide" visible={this.state.modalVisible} transparent={true} onRequestClose={()=>console.warn('closed')}>
                  <View style={{alignItems: 'center', justifyContent:'center',marginTop:height/3}}>
                    <View style={{backgroundColor:'white', padding:35, borderRadius:10, elevation:5, width:300}}>
                      <TextInput underlineColorAndroid='blue' placeholder="Category Name" onChangeText={(text) => this.setState({categoryName: text})} />
                      <TextInput underlineColorAndroid='blue' placeholder="Image Url" onChangeText={(text) => this.setState({categoryIcon: text})}/>
                      <TouchableOpacity style={{padding:5, backgroundColor:'blue', borderRadius:10}} onPress={()=>{this.addCategoryRoutes()}}>
                        <Text style={{fontWeight:'bold', fontSize:18, color:'white'}}>Add</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{marginTop:10, padding:5, backgroundColor:'blue', borderRadius:10}} onPress={()=>{this.setModalVisible(!this.state.modalVisible)}}>
                        <Text style={{fontSize:18, color:'white'}}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
              </Modal>
              </ScrollView>
            </View>
        </SafeAreaView>
    )
  }
}
const mapStateToProps = (state) =>{
  return{
      categories: state.categories
  }
}

export default connect(mapStateToProps)(HeaderMenu)