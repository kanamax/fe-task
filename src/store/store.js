import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import * as ATYPES from '../actions/actiontypes';
import getSearchResultsReducer from './partialreducers/getSearchResultsReducer';
import getEventDetailsReducer from './partialreducers/getEventDetailsReducer';
import toggleGroupReducer from './partialreducers/toggleGroupReducer';
import changePageReducer from './partialreducers/changePageReducer';
import saveToStoreReducer from './partialreducers/saveToStoreReducer';

const initState = {
  searchString: '',
  customers: [],
  page: 1,
  lastSearch: { offset: undefined, limit: undefined, search: undefined},
  customerDetails: {
    id: undefined,
    fullName: undefined,
    customer_events: [],
    eventsBySourceCounts: {
      meiro_events: 0,
      mailchimp: 0,
      prestashop:0
    },
    eventCountByCategoryDay: {},
    eventsByDate: {},
    timelineDates: []
  },
  groupStatus: {}
};

function reducer(state, action) {
  switch (action.type) {
  case ATYPES.SAVE_TO_STORE:
    return saveToStoreReducer(action.data, state);
  case ATYPES.GET_SEARCH_RESULTS:
    return getSearchResultsReducer(action.data, state);
  case ATYPES.GET_EVENT_DETAILS:
    return getEventDetailsReducer(action.data, state);
  case ATYPES.TOGGLE_GROUP:
    return toggleGroupReducer(action.data, state);
  case ATYPES.CHANGE_PAGE:
    return changePageReducer(action.data, state);
  default:
    return state;
  }
}

const middleware = applyMiddleware(thunk, createLogger());
const store = createStore(reducer, initState, middleware);

export default store;
