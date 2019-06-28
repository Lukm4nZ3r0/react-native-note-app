import React, {Component} from 'react'
import {View, Text, Dimensions, TextInput, Picker} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import DummyCategoryData from '../../data/DummyCategoryData'

let {width} = Dimensions.get('window')

class AddNote extends Component{
    static navigationOptions = {
        title: 'Add New Note',
        headerRight: <FontAwesome name="check-circle-o" style={{marginRight:width/10, fontSize:24, fontWeight:'bold'}}/>
    };

    dummyCategoryData = () =>{
        let dummyData = []
        for(let i = 0 ; i<DummyCategoryData.length ; i++){
            dummyData.push(
                <Picker.Item key={i} label={DummyCategoryData[i].category} value={DummyCategoryData[i].category} />
            )
        }
        return dummyData
    }
    
    render(){
        return(
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center', width:'90%'}}>
                <TextInput
                    multiline={true}
                    underlineColorAndroid="blue"
                    numberOfLines={8}
                    placeholder="ADD TITLE..."
                    style={{justifyContent:'flex-start', width:'100%'}}
                />
                </View>
                <View style={{flex:1, alignItems:'center', justifyContent:'center', width:'90%'}}>
                <TextInput
                    multiline={true}
                    underlineColorAndroid="blue"
                    numberOfLines={8}
                    placeholder="ADD DESCRIPTION..."
                    style={{justifyContent:'flex-start', width:'100%'}}
                />
                </View>
                <View style={{flex:1}}>
                    <Text style={{fontWeight:'bold',fontSize:20}}>CATEGORY</Text>
                    <Picker
                        style={{height: 50, width: 200, backgroundColor:'white', padding:15, elevation:5}}
                    >
                        {this.dummyCategoryData()}
                        <Picker.Item label="ADD NEW CATEGORY" value="" />
                    </Picker>
                </View>
            </View>
        )
    }
}

export default AddNote