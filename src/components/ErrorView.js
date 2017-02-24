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
  render() {
    var {height, width} = Dimensions.get('window');
    var {navigator,route,error} = this.props
    return (
      <View style={styles.centerView}>
        <Text style={styles.text}>{error}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eff0f2'
  },
  centerView:{
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
  },
  text:{
    color: 'black',
    fontSize: 20
  }
});
