import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity ,
  View
} from 'react-native';
import Dimensions from 'Dimensions'



export default class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state={
      _list: false,
      _map:false
    }
  }
  render() {
    var {height, width} = Dimensions.get('window');
    var {navigator,route} = this.props

    return (
      <View style={{flex:1,flexDirection: 'row',alignItems:'flex-end',justifyContent:'space-between'}}>
        <TouchableOpacity  onPress={() => {
          if(route.index == 1)
            {
              navigator.jumpBack()
              //navigator.push({title: 'Map View', index: 1})
              //this.setState({_map:true})
            }
        }}>
          <Text style={{fontSize:20,padding:30}}>List View</Text>
        </TouchableOpacity >
        <TouchableOpacity  onPress={() => {
          if(route.index == 0 && this.state._map == false)
            {
              navigator.push({title: 'Map View', index: 1})
              this.setState({_map:true})
            }
          else if(route.index == 0 && this.state._map == true){
            navigator.jumpForward()
          }
            //navigator.jumpBack()
        }}>
          <Text style={{fontSize:20,padding:30}}>Map View</Text>
        </TouchableOpacity >
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eff0f2'
  },
  messages: {
    padding: 10,
    backgroundColor:'blue'
  },
  noMessageView:{
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
  },
  noMessageText:{
    color: 'green',
    fontSize: 25
  }
});
