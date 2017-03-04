import React, { Component } from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity ,
  View
} from 'react-native';
import {
  Spinner,Picker,Grid,Row,H1 ,
  Container, Header, Title, Content,
  Footer, FooterTab, Button, Left,
  Right, Body, Icon
} from 'native-base';
const Item = Picker.Item;

export default class FirstTime extends Component {
  constructor()
  {
    super()
    this.onValueChange = this.onValueChange.bind(this)
    this.state = {
      selected: 'osu',
    }
  }
  onValueChange (value: string) {
    this.setState({
        selected : value
    });
  }
  render() {
    return (
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
                  <Button full onPress={this.props.onpress}>
                      <H1>Save</H1>
                  </Button>

              </FooterTab>
          </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  mainContent:{
    textAlign:'center',
    fontSize:25,
    fontWeight:'bold',
  },
  pickerItem:{
    width:300
  }
});
