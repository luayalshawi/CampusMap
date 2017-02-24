export function getbuildingcoordinates(locationId)
{
  return (dispatch) => {
    return fetch('http://oregonstate.edu/campusmap/map/element?location=&locations='+locationId)
      .then((response) => {
        dispatch({type:"LOCATION_RESULT",payload:response.json()})
      })
      .then((responseJson) => {
        dispatch({type:"LOCATION_RESULT",payload:responseJson})
      })
      .catch((error) => {
        dispatch({type:"LOCATION_RESULT",payload:error})
      });
  }
}
