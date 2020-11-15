import Axios from 'axios';
import * as ATYPES from './actiontypes';

const apiLink = 'http://localhost:5000'

export function saveToStore(data) {
  return {
    type: ATYPES.SAVE_TO_STORE,
    data
  };
}

export function getSearchResultsSuccess(data) {
  return {
    type: ATYPES.GET_SEARCH_RESULTS,
    data
  };
}

export function getSearchResultsError(data) {
  return {
    type: ATYPES.GET_SEARCH_RESULTS,
    data
  };
}

export function updateFetchingStatus(data) {
  return {
    type: ATYPES.UPDATE_FETCHING_STATUS,
    data
  };
}

export function getSearchResults(data) {

  const { query } = data;
  console.log(query);
  console.log(`${apiLink}/customers/${query}`)


  return (dispatch) => {
    dispatch(updateFetchingStatus(true));
    setTimeout(() => {  
      return Axios.get(`${apiLink}/customers/${query}`)
        .then((response) => {
          console.log(response)
          let dataToSend = {}
          if(data.query === '' || data.query.includes('limit') || data.query.includes('offset') ) {
            dataToSend = { customers: response.data.customers, isError: false };
          } else {
            dataToSend = { customers: [response.data.customer], isError: false };
          };
          dispatch(getSearchResultsSuccess(dataToSend));
        })
        .catch((err) => { 
          dispatch(getSearchResultsError({
            customers: [], 
            isError: true, 
            errorMessage: err.response.data.message
          }
          )); 
      	});
    }, 1000);
  };
}

export function showMoreData(data) {
  return {
    type: ATYPES.SHOW_MORE_DATA,
    data
  };
}

export function closeDialog() {
  return {
    type: ATYPES.CLOSE_DIALOG
  };
}