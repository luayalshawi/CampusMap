const _state = {locationResult:{__status:null}}
export default function reducer(state=_state,action)
{
    switch (action.type)
    {
      case "LOCATION_RESULT_PENDING":
      {
        //console.log("pending");

        return {...state, locationResult:{__status:"pending"}}
      }
      case "LOCATION_RESULT_FULFILLED":
      {
        //console.log(action.payload);
        var obj={}
        obj.data = action.payload;
        obj.__status = "complete"
        return {
          ...state,
          locationResult:obj

        }
        return {...state, locationResult:action.payload}
      }
      case "LOCATION_RESULT":
      {
        // console.log(action.payload);
        var obj = {}
        //obj = action.payload;
        obj.__status = "inprogress"
        // console.log(obj);
        return {
          ...state,
          locationResult:obj

        }
        return {...state, locationResult:action.payload}
      }
      default:
        return state
    }
}
