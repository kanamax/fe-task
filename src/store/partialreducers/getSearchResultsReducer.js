/* eslint-disable camelcase */
function getSearchResultsReducer(data, state) {
  const { customers, selection_settings } = data;
  const newState = { ...state, customers, lastSearch: selection_settings, page: 1 };
  return newState;
}

export default getSearchResultsReducer;