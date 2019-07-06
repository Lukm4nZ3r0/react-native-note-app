import React, {Component} from 'react'
import {View, TouchableOpacity, Text,Dimensions} from 'react-native'
//redux
import {deleteNote, getNotes} from '../../publics/redux/actions/notes'
import {connect} from 'react-redux'

let {width,height} = Dimensions.get('window')

class DeletePopUp extends Component{
    constructor(props){
        super(props)
    }
    deleteData = () =>{
        this.props.deletePopUpHandlerClose()
        this.props.dispatch(deleteNote(this.props.note))
        this.props.dispatch(getNotes())
    }
    render(){
        return(
            <View style={{width:width, height:height, position:'absolute'}}>
              <TouchableOpacity style={{backgroundColor:'black', width:width, height:height, position:'absolute', zIndex:3, opacity:0.6}} onPress={this.props.deletePopUpHandlerClose}>
                <View />
              </TouchableOpacity>

              <View style={{backgroundColor:'white', borderRadius:10, elevation:9, position:'absolute', zIndex:3, right:'20%', left:'20%', top:'40%', bottom:'40%', padding:20}}>
                <Text>Are you sure to delete this note ?</Text>
                <TouchableOpacity onPress={this.deleteData}>
                  <Text>YES</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.deletePopUpHandlerClose}>
                  <Text>NO</Text>
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
export default connect(mapStateToProps)(DeletePopUp)