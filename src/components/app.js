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
import Search from './search';
import CustomerDetails from './customerDetails';
import LoadingIndicator from './loadingIndicator';

class App extends React.Component {
  render(){
    const { getSearchResults, saveToStore, showMoreData, state, closeDialog } = this.props;
    const { customers, searchString, fetchingData, upTo, isError, errorMessage, dialogOpen } = state;
    return (
      <Container style={{ paddingTop: '2rem' }}>
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
                <Search 
                  getSearchResults={getSearchResults}
                  saveToStore={saveToStore}
                  searchString={searchString}
                  customers={customers} 
                  showMoreData={showMoreData}
                  fetchingData={fetchingData}
                  isError={isError}
                  errorMessage={errorMessage}
                  closeDialog={closeDialog}
                  dialogOpen={dialogOpen}
                  upTo={upTo}
                />
              )
            }}
          />
          <Route 
            path="/details/:id"
            render={() => {
              return (
                <div>
                  <CustomerDetails />
                </div> 
              )
            }}
          />
        </Switch>
        <LoadingIndicator show={fetchingData} />
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
  showMoreData: PropTypes.func.isRequired,
  saveToStore: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, mapActionCreatorsToProps)(App));
