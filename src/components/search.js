/* eslint-disable class-methods-use-this */
import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from './searchBar';
import SearchResultsTable from './searchResultsTable';
import LoadingIndicator from './loadingIndicator';
import CustomerDialog from './customerDialog';


class Search extends React.Component {

  componentDidMount(){
    const { location, getSearchResults, match } = this.props;
    if(location.search !== '') {
      getSearchResults({ query: location.search });
    }
    if(match.params.id !== '' && match.params.id !== undefined) {
      getSearchResults({ query: match.params.id });
    }
  }

  componentDidUpdate (prevProps) {
    const { location, getSearchResults } = this.props;
    if(prevProps.location.search !== location.search) {
      getSearchResults({ query: location.search });
    }
  }

  render() {
    const { getSearchResults, saveToStore, searchString, customers, showMoreData, upTo } = this.props;
    const { fetchingData, errorMessage, closeDialog, dialogOpen, history } = this.props;
    return (
      <div>
        <SearchBar 
          getSearchResults={getSearchResults}
          saveToStore={saveToStore}
          searchString={searchString}
          history={history}
        />
        { customers.length > 0 ? (
          <SearchResultsTable 
            customers={customers} 
            showMoreData={showMoreData}
            upTo={upTo}
          />
        ) : null}
        <LoadingIndicator show={fetchingData} />
        <CustomerDialog openState={dialogOpen} errorMessage={errorMessage} closeHandler={closeDialog} />
      </div> 
    );
  }
}

Search.propTypes = {
  getSearchResults: PropTypes.func.isRequired,
  saveToStore: PropTypes.func.isRequired,
  showMoreData: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired,
  searchString: PropTypes.string.isRequired,
  customers: PropTypes.array.isRequired,
  upTo: PropTypes.number.isRequired,
  fetchingData: PropTypes.bool.isRequired,
  dialogOpen: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default withRouter(Search);
