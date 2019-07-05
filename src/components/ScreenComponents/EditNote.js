import React, {Component} from 'react'
import {View, Text, Dimensions, TextInput, Picker, TouchableOpacity} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import DummyCategoryData from '../../data/DummyCategoryData'
//redux
import {updateNote,getNotes} from '../../publics/redux/actions/notes'
import {getCategories} from '../../publics/redux/actions/categories'
import {connect} from 'react-redux'

let {width} = Dimensions.get('window')

class EditNote extends Component{
    constructor(props){
        super(props)
        this.state={
            id:props.navigation.state.params.id,
            title:props.navigation.state.params.title,
            note:props.navigation.state.params.note,
            category:props.navigation.state.params.category
        }
    }
    updateNotesBtn = () =>{
        const {id,title,note,category} = this.state
        if(title!=='' && note!== ''){
            this.props.dispatch(updateNote({id,title,note,category}))
            this.props.dispatch(getNotes())
            console.log('ini adalah addnotes', this.props.addNote)
        }
        this.props.navigation.goBack()
    }
    componentDidMount(){
        this.props.navigation.setParams({updateNotesBtn: this.updateNotesBtn})
        this.props.dispatch(getCategories())
    }
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Edit this Note',
            headerRight: (
            <TouchableOpacity onPress={navigation.getParam('updateNotesBtn')}>
                <FontAwesome name="check-circle-o" style={{marginRight:width/10, fontSize:24, fontWeight:'bold', color:'green'}}/>
            </TouchableOpacity>
            )
        }
    };

    // dummyCategoryData = () =>{
    //     let dummyData = []
    //     for(let i = 0 ; i<DummyCategoryData.length ; i++){
    //         dummyData.push(
    //             <Picker.Item key={i} label={DummyCategoryData[i].category} value={DummyCategoryData[i].category} />
    //         )
    //     }
    //     return dummyData
    // }
    categoryDataList = () =>{
        let categoryData = []
        for(let i = 0 ; i<this.props.categories.categoriesData.length ; i++){
            categoryData.push(
                <Picker.Item key={i} label={this.props.categories.categoriesData[i].category} value={this.props.categories.categoriesData[i].category} />
            )
        }
        return categoryData
    }
    
    render(){
        console.log('dapat di editnote')
        console.log(this.props.navigation.state.params)
        return(
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center', width:'90%'}}>
                <TextInput
                    multiline={true}
                    numberOfLines={8}
                    underlineColorAndroid="blue"
                    placeholder={this.state.title}
                    value={this.state.title}
                    onChangeText={(text)=>{this.setState({title:text})}}
                    style={{justifyContent:'flex-start', width:'100%'}}
                />
                </View>
                <View style={{flex:1, alignItems:'center', justifyContent:'center', width:'90%'}}>
                <TextInput
                    multiline={true}
                    numberOfLines={8}
                    underlineColorAndroid="blue"
                    placeholder={this.state.note}
                    value={this.state.note}
                    onChangeText={(text)=>{this.setState({note:text})}}
                    style={{justifyContent:'flex-start', width:'100%'}}
                />
                </View>
                <View style={{flex:1}}>
                    <Text style={{fontWeight:'bold',fontSize:20}}>CATEGORY</Text>
                    <Picker
                        selectedValue={this.state.category}
                        onValueChange={(itemValue,itemIndex)=>this.setState({category:itemValue})}
                        style={{height: 50, width: 200, backgroundColor:'white', padding:15, elevation:5}}
                    >
                        {this.categoryDataList()}
                        <Picker.Item label="ADD NEW CATEGORY" value="" />
                    </Picker>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        notes: state.notes,
        categories: state.categories
    }
}

export default connect(mapStateToProps)(EditNote)