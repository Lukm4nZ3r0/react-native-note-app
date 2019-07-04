import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    image: {
      width:120,
      height: 120,
      borderRadius:60
    },
    drawerIcon:{
        flex:1,
        fontSize:24
    },
    profileMenu:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%',
        padding:20
    },
    headerPhoto:{
        height:40,
        width:40,
        borderRadius:120
    }
});

  export default styles