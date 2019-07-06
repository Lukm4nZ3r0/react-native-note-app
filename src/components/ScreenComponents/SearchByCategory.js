import React, {Component} from 'react'
import {View,Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import DrawerHeader from './DrawerHeader'
//redux
import {searchNoteByCategory} from '../../publics/redux/actions/notes'
import {connect} from 'react-redux'

class SearchByCategory extends Component{
    constructor(props){
        super(props)
        this.state={
            result:[],
            loading:false
        }
    }
    componentDidMount(){
        this.getByCategory()
        this.subs = [
            this.props.navigation.addListener('willFocus', ()=>{
                this.setState({
                    loading:true
                })
                this.getByCategory()
            })
        ]
    }

    componentWillUnmount(){
        this.subs.forEach(sub=>{
            sub.remove()
        })
    }

    getByCategory = () =>{
        let allNotes = this.props.notes.data
        console.log('allNotes : ',allNotes)
        let searchResult = []
        for(let i = 0 ; i<allNotes.length ; i++){
            if(allNotes[i].category = this.props.navigation.state.params.categoryName){
                searchResult.push(allNotes[i])
            }
        }
        
        this.setState({
            result:searchResult
        })
    }

    renderItem=({item})=>{
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
            <TouchableOpacity style={{width:'50%', padding:5}}>
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

    render(){
        let categorySelected = this.props.navigation.state.params.categoryName
        return(
            <View style={{flex:1}}>
                <DrawerHeader navigation={this.props.navigation} home={false} title={categorySelected}/>
                <View style={{flex:1, alignItems:'center', justifyContent: 'center',}}>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:20, fontWeight:'bold'}}>Category : {categorySelected}</Text>
                    <Text>notes with {categorySelected}' s category, will be displayed here....</Text>
                    </View>
                    <View style={{flex:3}}>
                        <FlatList
                            style={styles.gridView}
                            data={this.state.result}
                            renderItem={this.renderItem}
                            numColumns={2}
                            keyExtractor={(item, index) => index}
                        />
                    </View>
                </View>
            </View>
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

export default connect(mapStateToProps)(SearchByCategory)