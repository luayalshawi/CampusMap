import {combineReducers} from 'redux'
import buildingsearchresult from './buildingsearchresult.js'
import locationresult from './locationresult.js'

export default combineReducers(
  {
    buildingsearchresult,
    locationresult
  }
)
