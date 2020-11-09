function toggleGroupReducer(data, state) {

  const newGroupStatus = { ... state.groupStatus};
  if (newGroupStatus[data]) {
    newGroupStatus[data] = false
  } else {
    newGroupStatus[data] = true
  }

  return { ... state, groupStatus: { ... newGroupStatus}};

}

export default toggleGroupReducer;
