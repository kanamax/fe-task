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

export function getSearchResults(data) {
  let target = '';
  if(data.includes('offset') || data.includes('limit') || data === '' ) {
    target = `${apiLink}/customers?${data}`
  } else {
    target = `${apiLink}/customers/${data}`
  }
  return (dispatch) => {
    return Axios.get(target)
      .then((response) => {
        let dataToSend = {}
        if(data.includes('offset') || data.includes('limit') || data === '') {
          dataToSend = { ... response.data};
        } else {
          dataToSend.customers = [response.data.customer];
          dataToSend.selection_settings = {id: data};
        };
        dispatch(getSearchResultsSuccess(dataToSend));
      })
      .catch(() => { dispatch(getSearchResultsError({ customers: [], selection_settings: {}})); });
  };
}

export function getEventDetailsSuccess(data) {
  return {
    type: ATYPES.GET_EVENT_DETAILS,
    data
  };
}

export function getEventDetails(data) {
  return (dispatch) => {
    return Axios.get(`${apiLink}/customers/${data.id}/events`)
      .then((response) => {
        dispatch(getEventDetailsSuccess({ ... data , customer_events: response.data.customer_events }));
      })
      .catch((err) => { throw (err); });
  };
}

export function toggleGroup(data) {
  return {
    type: ATYPES.TOGGLE_GROUP,
    data
  };
}

export function changePage(data) {
  return {
    type: ATYPES.CHANGE_PAGE,
    data
  };
}