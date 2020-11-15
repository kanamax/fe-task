function showMoreDataReducer(data, state) {
  
  let { upTo } = data;
  const { total } = data;
  if (upTo !== total) {
    upTo = Math.min(upTo + 5, total)
  }
  return { ... state, upTo };

}

export default showMoreDataReducer;
