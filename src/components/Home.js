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
  Spinner,Picker,Grid,Row,H1 ,Col,
  Container, Header, Title, Content,
  Footer, FooterTab, Button, Left,
  Right, Body, Icon
} from 'native-base';
// import SideBar from './sideBar'
import Dimensions from 'Dimensions'
import LocationsListView from './LocationsListView'
import TabBar from './TabBar'
import CampusMapView from './CampusMapView'
import SearchBar from './SearchBar'
import FirstTime from './FirstTime'
import Ionicons from 'react-native-vector-icons/Ionicons';


export default class Home extends Component {
  constructor()
  {
    super()
    this.renderScene   = this.renderScene.bind(this)
    this.goTo          = this.goTo.bind(this)
    this.Routes = [
      {title: 'List View', index: 0},
    ];
    this.state = {
      startNavigation:null,
      loading:true
    }
  }
  renderScene(route,navigator)
  {
    var index = route.index;
    switch (index) {
      case 0:
        return (
          <Container>
              <Header>
                  <Left>
                      <Button transparent>
                          <Icon name='menu' />
                      </Button>
                  </Left>
                  <Body>
                      <Title>Header</Title>
                  </Body>
                  <Right />
              </Header>
              <Content>
                <SearchBar/>
                <LocationsListView navigator={navigator}/>
              </Content>
          </Container>
        )
      case 2:
        return(
          // <View style={{flex:1}}>
          //   <Ionicons.ToolbarAndroid
          //     style={styles.toolbar}
          //     title={route.title}
          //     titleColor="white"
          //     navIconName="md-arrow-back"
          //     onIconClicked={navigator.pop}
          //     actions={[]}
          //     overflowIconName="md-arrow-back"
          //   />
          //   <CampusMapView
          //     navigator={navigator}
          //     route={route}
          //   />
          // </View>
          <Container>
              <Header>
                  <Left>
                      <Button transparent onPress={() => {navigator.pop}}>
                          <Icon name='arrow-back' />
                      </Button>
                  </Left>
                  <Body>
                      <Title>Header</Title>
                  </Body>
                  <Right />
              </Header>
              <CampusMapView
                navigator={navigator}
                route={route}
              />
          </Container>
        )
      default:
        return null
    }
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
        const val = (value!=null ? true:false);
        this.setState({
          startNavigation:val
        })
      })
    } catch (error) {
      // Error retrieving data
      console.error(error);
    }
  }
  componentDidMount()
  {
    setTimeout( () => {
      this.setState({
        loading:false
      })
    }, 1500);
  }
  render() {

    const {startNavigation,loading} = this.state
    if (loading ==true || startNavigation==null){
      return(
        <Container>
          <Grid>
              <Row size={40}>
                <Col></Col>
                <Col><Text style={styles.loadingText}>CampusMap</Text></Col>
                <Col></Col>
              </Row>
              <Row size={60}>
                <Col></Col>
                <Col><Spinner color='blue' /></Col>
                <Col></Col>
              </Row>
          </Grid>
        </Container>
      )
    }
    switch (startNavigation) {
      case true:
        return (
          <Navigator
            initialRouteStack={this.Routes}
            renderScene={this.renderScene}
            configureScene={(route, routeStack) => Navigator.SceneConfigs.FadeAndroid}
          />
        );
      case false:
      return (
       <FirstTime onpress={this.goTo}/>
      )
      default:
        return null

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
  loadingText:{
    textAlign: 'center',
    alignItems: 'center',
    fontSize:20,
    fontWeight:'bold',
    color:'black'
  }


});
