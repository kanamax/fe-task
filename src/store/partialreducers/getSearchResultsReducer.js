function getSearchResultsReducer(data, state) {
  const { isError } = data;
  const newState = { ...state, ...data, fetchingData: false, upTo: 5, dialogOpen: isError };
  return newState;
}

export default getSearchResultsReducer;