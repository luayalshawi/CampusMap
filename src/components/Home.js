import React, { Component } from 'react';
import {
  Navigator,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  ToolbarAndroid,
  AsyncStorage
} from 'react-native';
import {
  Spinner,Picker,Grid,Row,H1 ,
  Container, Header, Title, Content,
  Footer, FooterTab, Button, Left,
  Right, Body, Icon
} from 'native-base';
import SideBar from './sideBar'
import Dimensions from 'Dimensions'
import LocationsListView from './LocationsListView'
import TabBar from './TabBar'
import CampusMapView from './CampusMapView'
import SearchBar from './SearchBar'
import Ionicons from 'react-native-vector-icons/Ionicons';
const Item = Picker.Item;

export default class Home extends Component {
  constructor()
  {
    super()
    this.renderScene   = this.renderScene.bind(this)
    this.goTo          = this.goTo.bind(this)
    this.onValueChange = this.onValueChange.bind(this)
    this.Routes = [
      {title: 'List View', index: 0},
    ];
    this.state = {
      selected: 'osu',
      startNavigation:null
    }
  }
  onPick(navigator)
  {
    //
    // try {
    //   AsyncStorage.setItem('@CampusMap:firstTime1', '1');
    //   navigator.push({
    //     index: 1,
    //   })
    //   this.goTo()
    // } catch (error) {
    //   // Error saving data
    //   console.error(error);
    // }
  }
  renderScene(route,navigator)
  {
    var index = route.index;

    if(index==-1)
    {
      // This view is not used. Will be removed after completing the home page
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
    else if(index == 0)
    {
      return (
        <View style={{flex:1}}>
          <Ionicons.ToolbarAndroid
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
          <Ionicons.ToolbarAndroid
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
  onValueChange (value: string) {
    this.setState({
        selected : value
    });
  }
  goTo()
  {
    try {
      AsyncStorage.setItem('@CampusMap:firstTime', '1');
      this.setState({
        startNavigation:true
      })
    } catch (error) {
      // Error saving data
      console.error(error);
      //display error can't go on
    }

  }
  componentWillMount()
  {
    try {
      const value =  AsyncStorage.getItem('@CampusMap:firstTime').then( (value) => {
        if(value!=null)
        {
          this.setState({
            startNavigation:true
          })
        }
        else {
          this.setState({
            startNavigation:false
          })
        }
      })
    } catch (error) {
      // Error retrieving data
      console.error(error);
    }
  }
  render() {

    const {startNavigation} = this.state
    if(startNavigation==true)
    {
      return (
        <Navigator
          initialRouteStack={this.Routes}
          renderScene={this.renderScene}
          configureScene={(route, routeStack) => Navigator.SceneConfigs.FadeAndroid}
        />
      );
    }
    else if(startNavigation==false){
      return(
        <Container>
            <Header>
                <Body>
                    <Title>Campus Map</Title>
                </Body>
                <Right />
            </Header>

            <Content >
              <Grid>
                  <Row style={{ backgroundColor: '#635DB7', height: 200 }}>
                    <Text style={styles.mainContent}>Welcome To Campus Map</Text>
                  </Row>
                  <Row style={{ backgroundColor: '#00CE9F',height: 50}}>
                    <Text style={styles.mainContent}>Please pick a University</Text>
                  </Row>
                  <Picker
                      iosHeader="Select one"
                      mode="dropdown"
                      selectedValue={this.state.selected}
                      onValueChange={(value) => {this.onValueChange(value)}}>
                      <Item label="Oregon State University" value="osu" />
                      <Item label="ATM Card" value="key1" />
                      <Item label="Debit Card" value="key2" />
                      <Item label="Credit Card" value="key3" />
                      <Item label="Net Banking" value="key4" />
                 </Picker>

              </Grid>

            </Content>

            <Footer>
                <FooterTab>
                    <Button full onPress={this.goTo}>
                        <H1>Save</H1>
                    </Button>

                </FooterTab>
            </Footer>
        </Container>
      )
    }
    else {
      return(
        <Container>
            <Content>
                <Spinner color='blue' />
            </Content>
        </Container>
      )
    }


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
  },
  mainContent:{
    textAlign:'center',
    fontSize:25,
    fontWeight:'bold',
  },
  pickerItem:{
    width:300
  }

});
