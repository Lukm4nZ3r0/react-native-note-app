import React, {Component} from 'react'
import {View, Text, Dimensions, TextInput, Picker, TouchableOpacity} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import DummyCategoryData from '../../data/DummyCategoryData'
//redux
import {addNotes} from '../../publics/redux/actions/notes'
import {getCategories} from '../../publics/redux/actions/categories'
import {connect} from 'react-redux'

let {width} = Dimensions.get('window')

class AddNote extends Component{
    constructor(props){
        super(props)
        this.state={
            title:'',
            note:'',
            category:'',
            errorMessage:''
        }
    }
    addNotesBtn = () =>{
        const {title,note,category} = this.state
        if(title!=='' && note!== '' && category!==''){
            this.props.dispatch(addNotes({title,note,category}))
            this.setState({
                errorMessage:''
            })
            this.props.navigation.goBack()
        }
        else{
            this.setState({
                errorMessage:'Please fill in the form below'
            })
        }
    }
    componentDidMount(){
        this.props.navigation.setParams({addNotesBtn: this.addNotesBtn})
        this.props.dispatch(getCategories())
    }
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Add New Note',
            headerRight: (
            <TouchableOpacity onPress={navigation.getParam('addNotesBtn')}>
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
        return(
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center', width:'90%'}}>
                <Text>{this.state.errorMessage}</Text>
                <TextInput
                    multiline={true}
                    underlineColorAndroid="blue"
                    numberOfLines={8}
                    placeholder="ADD TITLE..."
                    style={{justifyContent:'flex-start', width:'100%'}}
                    onChangeText={(text)=>{this.setState({title:text})}}
                />
                </View>
                <View style={{flex:1, alignItems:'center', justifyContent:'center', width:'90%'}}>
                <TextInput
                    multiline={true}
                    underlineColorAndroid="blue"
                    numberOfLines={8}
                    placeholder="ADD DESCRIPTION..."
                    style={{justifyContent:'flex-start', width:'100%'}}
                    onChangeText={(text)=>{this.setState({note:text})}}
                />
                </View>
                <View style={{flex:1, flexDirection:'row'}}>
                    <View style={{flex:1,marginLeft:15}}>
                    <Text style={{fontWeight:'bold',fontSize:20}}>CATEGORY</Text>
                    <Picker
                        style={{height: 50, width: 200, backgroundColor:'white', padding:15, elevation:5}}
                        onValueChange={(itemValue,itemIndex)=>this.setState({category:itemValue})}
                        selectedValue={this.state.category}
                    >
                        {this.categoryDataList()}
                        <Picker.Item label="ADD NEW CATEGORY" value="" />
                    </Picker>
                    </View>
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

export default connect(mapStateToProps)(AddNote)