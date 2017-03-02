import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity ,
  View,
  InteractionManager,
  RecyclerViewBackedScrollView,
  ActivityIndicator
} from 'react-native';
import Dimensions from 'Dimensions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getBuildingsSearchResult} from '../actions/getBuildingsSearchResult.js'
import {getbuildingcoordinates} from '../actions/getbuildingcoordinates.js'
import ErrorView from './ErrorView'


class LocationsListView extends Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this)
    this.state={
      ds:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }
  _onPressButton(rowData)
  {
    this.props.navigator.push({
      index: 2,
      title: rowData.name,
      id: rowData.id
    })
  }
  _renderPlaceholderView() {
    return (
      <ActivityIndicator
        animating={true}
        style={styles.centering}
        size={75}
      />
    );
  }
  renderRow(rowData)
  {
    return (
      <TouchableOpacity  onPress={this._onPressButton.bind(this,rowData)}>
        <View style={styles.messages}>
          <Text style={{fontSize:23,color:"black"}}>{rowData.name}</Text>
        </View>
      </TouchableOpacity >

    );
  }
  _renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    );
  }

  render() {

    const {buildingsSearchResult} = this.props
    if(buildingsSearchResult.__status == "pending")
    {
      return this._renderPlaceholderView()
    }
    else if(buildingsSearchResult.__status =="complete")
    {
      var searchResult = buildingsSearchResult
      if(searchResult.results.length == 0)
      {
          return (
            <View style={styles.noMessageView}>
              <Text style={styles.noMessageText}>No Results</Text>
            </View>
          )
      }
    }
    else if(buildingsSearchResult.__status =="error")
    {
      return (
        <ErrorView
          error={"Error - status: "+ buildingsSearchResult.data.status}
        />
      )
    }
    else if(buildingsSearchResult.__status==null) {
      return (
        <View style={styles.noMessageView}>
          <Text style={styles.noMessageText}>Please Start Searching</Text>
        </View>
      )
    }
    else{
      return this._renderPlaceholderView()
    }

    return (
      <View style={{flex:1}}>
        <ListView
          dataSource={this.state.ds.cloneWithRows(buildingsSearchResult.results)}
          renderRow={this.renderRow}
          // contentContainerStyle={StyleSheet.flatten([styles.container, {}])}
          // enableEmptySections={true}
          // renderSeparator={this._renderSeparator}
          // renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eff0f2',

  },
  messages: {
    padding: 10,
    backgroundColor:'white'
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
function mapStateToProps(state)
{
  return {
    buildingsSearchResult: state.buildingsearchresult.buildingsSearchResult
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({getBuildingsSearchResult,getbuildingcoordinates},dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(LocationsListView)
