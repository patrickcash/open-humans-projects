export const GET_PROJECTLIST = 'GET_PROJECTLIST';
export const GET_USERS = 'GET_USERS';
export const GET_USER_DATA = 'GET_USER_DATA';


/**
 * returns a list of all the projects currently available on openhumans
 */
export function getProjectList()  {
  return dispatch => {
    // hard coding lists from open humans API page until I can ask them about that
    // const projectList = [
    //   {
    //     "source": "direct-sharing-128",
    //     "name": "23andMe Upload"
    //   },
    //   {
    //     "source": "direct-sharing-134",
    //     "name": "American Gut Project"
    //   },
    //   {
    //     "source": "direct-sharing-129",
    //     "name": "AncestryDNA Upload"
    //   },
    //   {
    //     "source": "direct-sharing-133",
    //     "name": "Data Selfies"
    //   },
    //   {
    //     "source": "direct-sharing-135",
    //     "name": "Data sharing and ethical oversight"
    //   },
    //   {
    //     "source": "direct-sharing-120",
    //     "name": "FamilyTreeDNA integration"
    //   },
    //   {
    //     "source": "direct-sharing-102",
    //     "name": "Fitbit Connection"
    //   },
    //   {
    //     "source": "direct-sharing-40",
    //     "name": "Gencove"
    //   },
    //   {
    //     "source": "direct-sharing-131",
    //     "name": "Genome/Exome Upload"
    //   },
    //   {
    //     "source": "direct-sharing-182",
    //     "name": "Google Location History Upload"
    //   },
    //   {
    //     "source": "direct-sharing-42",
    //     "name": "GoViral"
    //   },
    //   {
    //     "source": "direct-sharing-24",
    //     "name": "GoViral (2014-2016)"
    //   },
    //   {
    //     "source": "direct-sharing-139",
    //     "name": "Harvard Personal Genome Project"
    //   },
    //   {
    //     "source": "direct-sharing-147",
    //     "name": "Jawbone Connection"
    //   },
    //   {
    //     "source": "direct-sharing-138",
    //     "name": "Moves connection"
    //   },
    //   {
    //     "source": "direct-sharing-141",
    //     "name": "mPower study"
    //   },
    //   {
    //     "source": "direct-sharing-45",
    //     "name": "Nightscout Data Commons"
    //   },
    //   {
    //     "source": "direct-sharing-31",
    //     "name": "Nightscout Data Transfer"
    //   },
    //   {
    //     "source": "direct-sharing-118",
    //     "name": "Nokia Health (Withings) Connection"
    //   },
    //   {
    //     "source": "direct-sharing-14",
    //     "name": "Open Humans Healthkit Integration"
    //   },
    //   {
    //     "source": "direct-sharing-43",
    //     "name": "OpenAPS Data Commons"
    //   },
    //   {
    //     "source": "direct-sharing-55",
    //     "name": "openSNP"
    //   },
    //   {
    //     "source": "direct-sharing-184",
    //     "name": "Oura Connect"
    //   },
    //   {
    //     "source": "direct-sharing-186",
    //     "name": "Overland connection"
    //   },
    //   {
    //     "source": "direct-sharing-71",
    //     "name": "Personal Data Notebooks"
    //   },
    //   {
    //     "source": "direct-sharing-149",
    //     "name": "RescueTime connection"
    //   },
    //   {
    //     "source": "direct-sharing-140",
    //     "name": "Runkeeper connection"
    //   },
    //   {
    //     "source": "direct-sharing-176",
    //     "name": "Spotify integration"
    //   },
    //   {
    //     "source": "direct-sharing-70",
    //     "name": "Twitter Archive Analyzer"
    //   },
    //   {
    //     "source": "direct-sharing-132",
    //     "name": "uBiome Upload"
    //   },
    //   {
    //     "source": "direct-sharing-142",
    //     "name": "Wild Life of Our Homes"
    //   }
    //   ];;
    // const action = {
    //   type: GET_PROJECTLIST,
    //   payload: {
    //     projectList
    //   }
    // }
    // dispatch(action);

    // https://www.openhumans.org/api/public-data/members-by-source?format=json seems to return sources that are not available in other api calls
    fetch("https://www.openhumans.org/api/public-data/members-by-source?format=json")
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

