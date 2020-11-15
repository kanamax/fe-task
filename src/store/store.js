import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import * as ATYPES from '../actions/actiontypes';
import getSearchResultsReducer from './partialreducers/getSearchResultsReducer';
import showMoreDataReducer from './partialreducers/showMoreDataReducer';
import saveToStoreReducer from './partialreducers/saveToStoreReducer';
import updateFetchingStatusReducer from './partialreducers/updateFetchingStatusReducer';
import closeDialogReducer from './partialreducers/closeDialogReducer';

const initState = {
  searchString: '',
  customers: [],
  isError: false,
  errorMessage: '',
  dialogOpen: false,
  fetchingData: false,
  upTo: 5
};

function reducer(state, action) {
  switch (action.type) {
  case ATYPES.SAVE_TO_STORE:
    return saveToStoreReducer(action.data, state);
  case ATYPES.GET_SEARCH_RESULTS:
    return getSearchResultsReducer(action.data, state);
  case ATYPES.SHOW_MORE_DATA:
    return showMoreDataReducer(action.data, state);
  case ATYPES.UPDATE_FETCHING_STATUS:
    return updateFetchingStatusReducer(action.data, state);
  case ATYPES.CLOSE_DIALOG:
    return closeDialogReducer( state);
  default:
    return state;
  }
}

const middleware = applyMiddleware(thunk, createLogger());
const store = createStore(reducer, initState, middleware);

export default store;
