function saveToStoreReducer(data, state) {

  const newGroupStatus = { ... state.groupStatus};
  if (newGroupStatus[data]) {
    newGroupStatus[data] = false
  } else {
    newGroupStatus[data] = true
  }

  return { ... state, searchString: data};

}

export default saveToStoreReducer;
