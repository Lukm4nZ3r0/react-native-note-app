import React, {Component} from 'react'
import {View, Text, StyleSheet, Dimensions, FlatList, TouchableHighlight, TouchableOpacity} from 'react-native'
import DummyData from '../../data/DummyData'
//redux
import {getNotes,getTheNextPage} from '../../publics/redux/actions/notes'
import {connect} from 'react-redux'
//store
import store from '../../publics/redux/store'

class FlatListData extends Component{
    constructor(props){
        super(props)
        this.state={
            notes:[],
            loading:false,
            nextPage:2
        }
    }
    setDefaultNextPage = () =>{
        this.setState({
            nextPage:2
        })
    }
    componentDidMount(){
        this.props.dispatch(getNotes())
    }
    renderItem = ({item}) =>{
        // get format time
        let noteTimes = new Date(item.time).toString().split(' ')
        noteTimes = noteTimes[2]+' '+noteTimes[1]

        // get bgcolor
        let bgColor
        switch(item.category){
            case 'technology':
                bgColor='red'
                break;
            case 'lifestyle':
                bgColor='blue'
                break;
            case 'sport':
                bgColor='purple'
                break;
            case 'programming':
                bgColor='green'
                break;
            case 'school':
                bgColor='yellow'
                break;
            default:
                bgColor='black'
        }
        return(
            <TouchableOpacity 
                style={{width:'50%', padding:5}} 
                onPress={()=>this.props.navigation.navigate('EditNote',item)} 
                note={item.note} 
                onLongPress={()=>this.props.deletePopUpHandlerOpen(item)}
            >
                <View style={[styles.itemContainer, { backgroundColor: bgColor, elevation:10 }]}>
                    <View style={{position:'absolute',right:'5%', top:'5%'}}>
                        <Text style={{fontSize:17, fontWeight:'300', color:'#fff'}}>{noteTimes}</Text>
                    </View>
                    <View style={{marginTop:15}}>
                        <Text style={{fontSize:20, fontWeight:'bold', color:'#fff'}}>{item.title}</Text>
                        <Text style={{fontSize:14, fontWeight:'200', color:'#fff'}} numberOfLines={4}>{item.note}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    nextPage = () =>{
        this.props.dispatch(getTheNextPage(this.state.nextPage, this.props.notes.sort))
        this.setState({
            nextPage: this.state.nextPage+1
        })
    }
    _onRefresh = () =>{
        this.props.dispatch(getNotes())
        this.setDefaultNextPage()
    }
    render(){
        console.log('dapat data ' ,this.props.notes.data)
        return(
            <FlatList
                style={styles.gridView}
                data={this.props.notes.data}
                renderItem={this.renderItem}
                numColumns={2}
                keyExtractor={(item, index) => index}
                refreshing={this.props.notes.isLoading}
                onRefresh={this._onRefresh}
                onEndReached={()=>this.state.nextPage<=this.props.notes.totalPages&&this.nextPage()}
                onEndReachedThreshold={0.1}
            />
        )
    }
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

const mapStateToProps = (state) =>{
    return{
        notes: state.notes
    }
}
export default connect(mapStateToProps)(FlatListData)