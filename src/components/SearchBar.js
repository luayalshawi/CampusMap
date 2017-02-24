import React, { Component } from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity ,
  View
} from 'react-native';
import Dimensions from 'Dimensions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getBuildingsSearchResult} from '../actions/getBuildingsSearchResult.js'

class SearchBar extends Component {

  render() {
    return (
      <View>
        <TextInput
          style={styles.textInput}
          onSubmitEditing={(event) => {
            this.props.getBuildingsSearchResult(event.nativeEvent.text)
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput:{
    height: 50,
    fontSize:25
  }
});
function mapDispatchToProps(dispatch) {
  return bindActionCreators({getBuildingsSearchResult},dispatch)
}
export default connect(null,mapDispatchToProps)(SearchBar)
