import React, {Component} from 'react'
import {View, Text, StyleSheet, Dimensions, FlatList, TouchableHighlight} from 'react-native'
import DummyData from '../../data/DummyData'

const FlatListData = ({navigation}) =>{
    return(

    <FlatList
        style={styles.gridView}
        data={DummyData}
        renderItem={({item}) => 
        <TouchableHighlight style={{width:'50%', padding:5}} onPress={()=>navigation.navigate('EditNote',item)} note={item.note}>
            <View style={[styles.itemContainer, { backgroundColor: item.code, elevation:10 }]}>
                <View style={{position:'absolute',right:'5%', top:'5%'}}>
                    <Text style={{fontSize:17, fontWeight:'300', color:'#fff'}}>{item.time}</Text>
                </View>
                <View style={{marginTop:15}}>
                    <Text style={{fontSize:20, fontWeight:'bold', color:'#fff'}}>{item.title}</Text>
                    <Text style={{fontSize:14, fontWeight:'200', color:'#fff'}} numberOfLines={4}>{item.note}</Text>
                </View>
            </View>
        </TouchableHighlight>
        }
        numColumns={2}
        keyExtractor={(item, index) => index}
    />
    )
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
export default FlatListData