import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity ,
  View,
  InteractionManager,
  RecyclerViewBackedScrollView,
  ActivityIndicator,
  Linking
} from 'react-native';
import Dimensions from 'Dimensions'
import MapView from 'react-native-maps';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getbuildingcoordinates} from '../actions/getbuildingcoordinates.js'

class CampusMapView extends React.Component {
  constructor(props)
  {
    super(props)
    this.onMarkerPress = this.onMarkerPress.bind(this)
    this.onCalloutPress = this.onCalloutPress.bind(this)
    this.state = {
      renderPlaceholderOnly: true,
      initialPosition: 'unknown',
      lastPosition: 'unknown',
    };
    this.marker1 = null;
  }
  watchID: ?number = null;

  componentWillMount()
  {
    if(this.props.route.id !=undefined)
    {
      this.props.getbuildingcoordinates(this.props.route.id)
    }
  }
  _renderPlaceholderView() {
    // return (
    //   <View style={styles.centering}>
    //     <Text>Loading...</Text>
    //   </View>
    // );
    return (
      <ActivityIndicator
        animating={true}
        style={styles.centering}
        size={75}
      />
    );
  }
  componentWillUnmount() {
    //navigator.geolocation.clearWatch(this.watchID);
  }
  componentDidMount() {
    setTimeout( () => {
        this.setState({renderPlaceholderOnly: false});
    }, 4400);
    //   InteractionManager.runAfterInteractions(() => {
    //     this.setState({renderPlaceholderOnly: false});
    // });


    // Get geolocation API
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     var initialPosition = JSON.stringify(position);
    //     this.setState({initialPosition});
    //     //alert(initialPosition)
    //   },
    //   (error) => alert(JSON.stringify(error)),
    //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    // );
    // this.watchID = navigator.geolocation.watchPosition((position) => {
    //     var lastPosition = JSON.stringify(position);
    //     this.setState({lastPosition});
    // });
  }
  onMarkerPress(v)
  {
    // console.log(v);
    // console.log('this is a press');
    // console.log(this.marker1);
  }
  onCalloutPress(v)
  {
    const {latitude,longitude} = this.marker1.props.coordinate
    url='geo:?q='+latitude+','+longitude+ ' ('+this.props.route.title+')'
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        //Might need to show error to the user: Maybe
        console.log('Error openning' + url);
      }
    });
  }

  render() {

    if (this.state.renderPlaceholderOnly) {
      return this._renderPlaceholderView();
    }
     const { region, locationResult} = this.props;

     if(locationResult.__status == "pending")
     {
       //return null;
       return this._renderPlaceholderView()
     }
     else if(locationResult.__status =="complete")
     {
        for(var key in locationResult.data.locations)
        {
          if (Object.prototype.hasOwnProperty.call(locationResult.data.locations, key))
          {
           var value = locationResult.data.locations[key];
          }
        }
        myobj = value
        latitude = parseFloat(myobj.marker_location[1])
        longitude = parseFloat(myobj.marker_location[0])
        title= myobj.name
        console.log('longitude:'+latitude);
        console.log('longitude'+longitude);
     }
     else if(locationResult.__status =="error")
     {
       //Error
     }
     else if(locationResult.__status==null) {
       return (
         <View style={styles.noMessageView}>
           <Text style={styles.noMessageText}>Please Start Searching</Text>
         </View>
       )
     }else{
       //return null
       return this._renderPlaceholderView()
     }


     return (

         <MapView
           style={styles.map}
           region={{
             latitude: latitude,
             longitude: longitude,
             latitudeDelta: 0.0009,
             longitudeDelta: 0.0030,
           }}
         >
          <MapView.Marker
            coordinate={{latitude:latitude,longitude:longitude}}
            title={title}
            description="Click To Navigate"
            onPress={this.onMarkerPress}
            onCalloutPress={this.onCalloutPress}
            ref={ref => {
              //console.log(ref);
              if(ref!=null)
              {
                this.marker1=ref;ref.showCallout()
              }
            }}

          >
          </MapView.Marker>
         </MapView>
     );
   }
}
const styles = StyleSheet.create({
   container: {
     ...StyleSheet.absoluteFillObject,
     justifyContent: 'flex-end',
     alignItems: 'center',
     marginTop:56
   },
   map: {
     ...StyleSheet.absoluteFillObject,
   },
   centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 120,
  },
});
function mapStateToProps(state)
{
  return {
    locationResult: state.locationresult.locationResult
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({getbuildingcoordinates},dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(CampusMapView)
