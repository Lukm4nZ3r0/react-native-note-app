import React, {Component} from 'react'
import {View, TouchableOpacity, Text, Dimensions} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//redux
import {itemSorting} from '../../publics/redux/actions/notes'
import {connect} from 'react-redux'

let {width, height} = Dimensions.get('window')

class SortingModal extends Component{
    constructor(props){
        super(props)
    }
    sortingData = (value) =>{
        this.props.dispatch(itemSorting(value))
        this.props.popUpHandler
        console.log('ini adalah sorting', this.props.notes.data)
    }
    render(){
        return(
            <View style={{width:width, height:height, position:'absolute'}}>
              <TouchableOpacity style={{backgroundColor:'black', width:width, height:height, position:'absolute', zIndex:3, opacity:0.6}} onPress={this.props.popUpHandler}>
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
        )
    }
}
const mapStateToProps = (state) =>{
    return{
        notes: state.notes
    }
}
export default connect(mapStateToProps)(SortingModal)