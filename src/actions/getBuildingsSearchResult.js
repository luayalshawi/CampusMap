export function getBuildingsSearchResult(buildingName)
{
  return (dispatch) => {
    return fetch('http://oregonstate.edu/campusmap/search/'+buildingName)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          dispatch({type:"BUILDINGS_SEARCH_RESULT",payload:response.json()})
        } else {
          var error = new Error(response.statusText)
          error.response = response
          dispatch({type:"BUILDINGS_SEARCH_RESULT_REJECTED",payload:error.response})

          throw error
        }
      })
      .then((responseJson) => {
        dispatch({type:"BUILDINGS_SEARCH_RESULT",payload:responseJson})
      })
      .catch((error) => {
        return Promise.resolve()
      });
  }
}
