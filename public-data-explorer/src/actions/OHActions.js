export const GET_PROJECTLIST = 'GET_PROJECTLIST';
export const GET_USERS = 'GET_USERS';
export const GET_USER_DATA = 'GET_USER_DATA';


/**
 * returns a list of all the projects currently available on openhumans

 */
export function getProjectList()  {
  return dispatch => {
    fetch("https://www.openhumans.org/api/public-data/members-by-source.json")
    .then(response => response.json())
    .then(json => {
      let projectList = json.results;
      const action = {
        type: GET_PROJECTLIST,
        payload: {
          projectList
        }
      }
      dispatch(action);
      })
    .catch(error => {
      throw(error);
    })
  }
}

/**
 * Takes the project URL and fetches the users that have joined the project
 * 
 * @param {string} url - The URL of the project
 */
export function getUsers(url)  {
  return dispatch => {
    if (url) {
      fetch(url)
      .then(response => response.json())
      .then(json => {
        let source = json.results[0].source;
        let projectUsers = json.results[0].usernames;
        const action = {
          type: GET_USERS,
          payload: {
            source, 
            projectUsers
          }
        }
        dispatch(action);
        })
      .catch(error => {
        throw(error);
      })
    }
  }
}

/**
 * Takes the url for the user in the specific project and loads the users data
 * 
 * @param {string} url - The url for the user for that project
 */
export function getUserData(url)  {
  return dispatch => {
    if (url) {
      fetch(url)
      .then(response => response.json())
      .then(json => {
        let userData = json.results;
        const action = {
          type: GET_USER_DATA,
          payload: {
            userData
          }
        }
        dispatch(action);
        })
      .catch(error => {
        throw(error);
      })
    }
  }
}

