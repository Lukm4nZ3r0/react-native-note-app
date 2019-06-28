import React, {Component} from 'react'
import {View, Text, Dimensions, TextInput, Picker} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import DummyCategoryData from '../../data/DummyCategoryData'

let {width} = Dimensions.get('window')

class EditNote extends Component{
    constructor(props){
        super(props)
        this.state={
            data:props.navigation.state.params
        }
    }
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
                    numberOfLines={8}
                    underlineColorAndroid="blue"
                    placeholder={this.state.data.title}
                    value={this.state.data.title}
                    style={{justifyContent:'flex-start', width:'100%'}}
                />
                </View>
                <View style={{flex:1, alignItems:'center', justifyContent:'center', width:'90%'}}>
                <TextInput
                    multiline={true}
                    numberOfLines={8}
                    underlineColorAndroid="blue"
                    placeholder={this.state.data.note}
                    value={this.state.data.note}
                    style={{justifyContent:'flex-start', width:'100%'}}
                />
                </View>
                <View style={{flex:1}}>
                    <Text style={{fontWeight:'bold',fontSize:20}}>CATEGORY</Text>
                    <Picker
                        selectedValue={this.state.data.category}
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

export default EditNote