const _state = {buildingsSearchResult:{__status:null}}
export default function reducer(state=_state,action)
{
    switch (action.type)
    {
      case "BUILDINGS_SEARCH_RESULT_PENDING":
      {
        return {...state, buildingsSearchResult:{__status:"pending"}}
      }
      case "BUILDINGS_SEARCH_RESULT_FULFILLED":
      {
        var obj = {}
        obj = action.payload;
        obj.__status = "complete"
        return {
          ...state,
          buildingsSearchResult:obj

        }
      }
      case "BUILDINGS_SEARCH_RESULT":
      {
        var obj={}
        obj.__status = "inprogress"
        return {
          ...state,
          buildingsSearchResult:obj
        }
      }
      case "BUILDINGS_SEARCH_ERROR":
      {
        console.log('BUILDINGS_SEARCH_RESULT_REJECTED');
        var obj={}
        obj.__status = "error"
        return {
          ...state,
          buildingsSearchResult:obj
        }
      }
      case "BUILDINGS_SEARCH_RESULT_REJECTED":
      {
        console.log('BUILDINGS_SEARCH_RESULT_REJECTED');
        var obj={}
        obj.__status = "error"
        obj.data = action.payload
        return {
          ...state,
          buildingsSearchResult:obj
        }
      }
      default:
        return state
    }
}
