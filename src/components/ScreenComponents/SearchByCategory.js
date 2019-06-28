import React, {Component} from 'react'
import {View,Text} from 'react-native'
import DrawerHeader from './DrawerHeader'

const SearchByCategory = props =>{
    let categorySelected = props.navigation.state.params.categoryName
    return(
        <View style={{flex:1}}>
            <DrawerHeader navigation={props.navigation} home={false} title={categorySelected}/>
            <View style={{flex:1, alignItems:'center', justifyContent: 'center',}}>
                <Text style={{fontSize:20, fontWeight:'bold'}}>Category : {categorySelected}</Text>
                <Text>notes with {categorySelected}' s category, will be displayed here....</Text>
            </View>
        </View>
    )
}

export default SearchByCategory