import * as OHActions from '../actions/OHActions';

const initState = {
  projectList:{},
  pojectUsers: {},
  userData: {},
  source: ""
}
    
const OHReducer = (state=initState, action) => {
  switch(action.type) {
    case OHActions.GET_PROJECTLIST:
      return {
        ...state,
        projectList: action.payload.projectList
      }
    case OHActions.GET_USERS:
      return {
        ...state,
        source: action.payload.source,
        projectUsers: action.payload.projectUsers
      }
    case OHActions.GET_USER_DATA:
      return {
        ...state,
        userData: action.payload.userData
      }
    default:
      return state;
  }
}

export default OHReducer;
