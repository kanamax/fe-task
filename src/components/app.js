import React from 'react';
import {
  withRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import * as ActionCreators from '../actions/actioncreators';
import SearchBar from './searchBar';
import SearchResultsTable from './searchResultsTable';
import CustomerDetails from './customerDetails';

class App extends React.Component {
  render(){
    const { getSearchResults, getEventDetails, toggleGroup, changePage, saveToStore, state } = this.props;
    const { customers, customerDetails, groupStatus, page, searchString } = state;
    return (
      <Container style={{paddingTop: '2rem'}}>
        <Switch>
          <Route 
            exact
            path="/"
            render={() => {
              return (
                <Redirect to="/search" />
              )
            }}
          />
          <Route 
            exact
            path="/search"
            render={() => {
              return (
                <div>
                  <SearchBar 
                    getSearchResults={getSearchResults} 
                    saveToStore={saveToStore}
                    searchString={searchString} 
                  />
                  { customers.length > 0 ? (
                    <SearchResultsTable 
                      customers={customers} 
                      getEventDetails={getEventDetails}
                      changePage={changePage}
                      page={page}
                    />
                  ) : null}
                </div> 
              )
            }}
          />
          <Route 
            exact
            path="/details"
            render={() => {
              return (
                <div>
                  <CustomerDetails 
                    customerDetails={customerDetails} 
                    toggleGroup={toggleGroup} 
                    groupStatus={groupStatus} 
                  />
                </div> 
              )
            }}
          />
        </Switch>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return { state };
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

App.propTypes = {
  getSearchResults: PropTypes.func.isRequired,
  saveToStore: PropTypes.func.isRequired,
  getEventDetails: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
  toggleGroup: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, mapActionCreatorsToProps)(App));
