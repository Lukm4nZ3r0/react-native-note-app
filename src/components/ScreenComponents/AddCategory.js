import React, {Component} from 'react'
import {View, Text} from 'react-native'
import styles from '../styles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import DrawerHeader from './DrawerHeader'

class AddCategory extends Component{
    static navigationOptions = {
        title: 'Add Category',
        drawerIcon: ({ focused }) => (
          <FontAwesome style={styles.drawerIcon} name="plus-circle" color={focused ? 'blue' : 'black'} />
        ),
      };
    render(){
        return(
            <View style={{flex:1}}>
                <DrawerHeader navigation={this.props.navigation} home={false} title="Add Category"/>
                <Text>AddCategory Page</Text>
            </View>
        )
    }
}

export default AddCategory