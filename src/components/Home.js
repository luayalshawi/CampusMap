import React, { Component } from 'react';
import {
  Navigator,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  ToolbarAndroid,
  Picker,
  AsyncStorage
} from 'react-native';
import Dimensions from 'Dimensions'
import LocationsListView from './LocationsListView'
import TabBar from './TabBar'
import CampusMapView from './CampusMapView'
import SearchBar from './SearchBar'
import Icon from 'react-native-vector-icons/Ionicons';
import cacheApi from '../api/cache';
const Item = Picker.Item;

export default class Home extends Component {
  constructor()
  {
    super()
    this.renderScene = this.renderScene.bind(this)
    // this.onPick = this.onPick.bind(this)
    this.Routes = [
      {title: 'List View', index: 0},
    ];
  }
  onPick(navigator)
  {
    // navigator.push({
    //   index: 1,
    // })
    try {
     async AsyncStorage.setItem('@CampusMap:firstTime1', '1');
    } catch (error) {
      // Error saving data
    }
  }
  renderScene(route,navigator)
  {
    var index = route.index;

    //TODO: first time login should see another View
    // The view will force the user to pick a University from a drop down list
    if (index == -100)
    {
      try {
        const value = async AsyncStorage.getItem('@CampusMap:firstTime1');
        if (value !== null){
          // We have data!!
          console.log(value);
          index = index + 1;
          console.log(value);
        }
      } catch (error) {
        // Error retrieving data
      }
      //1. check if cache exists
      //    create one if does not exist
      //2.  upon cahce existing set increment index

    }

    if(index==0)
    {
      return (
        <View style={styles.firstcontainer}>
          <View style={styles.flex1}>
            <Text style={styles.welcomemsg}>Welcome To Campus Map</Text>
          </View>
          <View style={styles.picker}>
            <Text style={styles.pickerText}>Please Choose a University</Text>
            <Picker>
              <Item label="Oregon State University - Corvallis" value="OSU" />
              <Item label="world" value="key1" />
            </Picker>
          </View>
          <View style={styles.flex3}>
            <TouchableOpacity style={styles.button} onPress={this.onPick.bind(this,navigator)}>
              <Text style={styles.pickerText}>Go</Text>
            </TouchableOpacity>
          </View>

        </View>
      )
    }
    else if(index == 1)
    {
      return (
        <View style={{flex:1}}>
          <Icon.ToolbarAndroid
            style={styles.toolbar}
            title="Home"
            titleColor="white"
            navIconName="md-menu"
            onIconClicked={null}
            actions={[]}
            overflowIconName="md-menu"
          />
          <SearchBar/>
          <LocationsListView navigator={navigator}/>
        </View>
      )
    }
    else if(index == 2)
    {
      return(
        <View style={{flex:1}}>
          <Icon.ToolbarAndroid
            style={styles.toolbar}
            title={route.title}
            titleColor="white"
            navIconName="md-arrow-back"
            onIconClicked={navigator.pop}
            actions={[]}
            overflowIconName="md-arrow-back"
          />
          <CampusMapView
            navigator={navigator}
            route={route}
          />
        </View>
      )
    }
  }
  render() {
    return (
      <Navigator
        initialRouteStack={this.Routes}
        renderScene={this.renderScene}
        configureScene={(route, routeStack) => Navigator.SceneConfigs.FadeAndroid}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  navbarText:{
    fontSize: 20
  },
  title:{
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 25
  },
  toolbar: {
  backgroundColor: '#a9a9a9',
  height: 56,
  },
  firstcontainer: {
    flex: 1,
    flexDirection:'column',
    backgroundColor:'#3D9970',
  },
  picker:{
    flex:0.3,
  },
  flex1:{
    flex:0.6
  },
  welcomemsg:{
    fontSize:35,
    fontWeight: 'bold',
    textAlign:'center'
  },
  pickerText:{
    fontSize:25,
    fontWeight:'bold',
    textAlign:'center'
  },
  flex3:{
    flex:1
  },
  button:{
    borderRadius:10,
    borderColor:'green',
    borderStyle:'solid'
  }

});
