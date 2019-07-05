import React, {Componnet} from 'react'
import {View, Text, TouchableHighlight, Image, KeyboardAvoidingView, Dimensions, TouchableOpacity} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import styles from '../styles'

const DrawerHeader = ({navigation, home, title, popUpHandler}) =>{
  
  return(
        <View style={{flex:1, flexDirection:'row',backgroundColor:'white',elevation: 3, position:'absolute', top:0, padding:15, width:'100%'}}>
            <View style={{flex:1, alignItems:'center', justifyContent: 'center',}}>
            {home ? 
              <TouchableOpacity style={{flex:1}} onPress={()=>{navigation.toggleDrawer()}}>
                <Image source={require('../../../assets/images/abc.jpg')} style={styles.headerPhoto} />
              </TouchableOpacity> 
              : 
              <TouchableOpacity style={{flex:1}} onPress={()=>{navigation.goBack()}}>
                <FontAwesome name="arrow-left" style={{fontSize:25}}/>
              </TouchableOpacity>
            }
              
            </View>

            <View style={{flex:9, alignItems:'center', justifyContent: 'center'}}>
              <Text style={{fontWeight:'bold', color:'black', fontSize:18}}>{title}</Text>
            </View>

            <View style={{flex:1, alignItems:'center', justifyContent: 'center',}}>
              {home &&
              <TouchableOpacity onPress={()=>popUpHandler()}>
              <FontAwesome style={{fontSize:23}} name="list-ul" />
              </TouchableOpacity>
              }
            </View>
            
        </View>
    )
}

export default DrawerHeader