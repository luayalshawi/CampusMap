import React,{Component} from 'react';
import { syncHistoryWithStore } from 'react-router-redux';
import {Provider} from 'react-redux'
import store from "./store.js"
import Home from './components/Home';
export default class App extends Component {
  render()
  {
    return(
      <Provider store={store} >
        <Home/>
      </Provider>
    );
  }
}
