/* eslint-disable class-methods-use-this */
import React from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import CustomerDetailsBar from './customerDetailsBar';
import getEventsBySourceCounts from './datafunctions/transformEventData';
import LoadingIndicator from './loadingIndicator';
import CustomerTimeline from './customerTimeline';
import CustomerDialog from './customerDialog';


const styles = {
  myButon: {
    color: 'rgb(163, 163, 163)'
  },
  myGrid: {
    color: 'rgb(163, 163, 163)'
  },
  arrow: {
    fontSize: '2rem'
  }
};

class CustomerDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      errorMessage: '',
      dialogOpen: false,
      fullName: '',
      eventsBySource: [],
      eventCountByCategoryDay: {},
      eventsByDate: {},
      timelineDates: [],
      groupStatus: {}
    }
    this.closeDialog = this.closeDialog.bind(this);
    this.toggleGroup = this.toggleGroup.bind(this);
  }

  componentDidMount(){
    const { match } = this.props;
    if(match.params.id !== '') {
      this.getCustomerDetails(match.params.id);
    }
  }

  componentDidUpdate (prevProps) {
    const { match } = this.props;
    if(prevProps.match.params.id !== match.params.id) {
      this.getCustomerDetails(match.params.id);
    }
  }

  getCustomerDetails(customerID){
    const data = { errorInfo: { isEerror: false } };
    this.setState({
      isLoaded: false,
      dialogOpen: false,
      errorMessage: '',
      fullName: '',
      eventsBySource: [],
      eventCountByCategoryDay: {},
      eventsByDate: {},
      timelineDates: [],
      groupStatus: {}
    });
    setTimeout(() => {
      Axios.get('http://localhost:5000/sources').then((res1) => {
        data.sources = res1.data.sources;
        return Axios.get('http://localhost:5000/events').then((res2) => {
          data.eventTypes = res2.data.events;
          return Axios.get(`http://localhost:5000/customers/${customerID}/events`).then((res3) => {
            data.customerEvents = res3.data.customer_events;
            return Axios.get(`http://localhost:5000/customers/${customerID}`).then((res4) => {
              data.fullName = `${res4.data.customer.name} ${res4.data.customer.surname}`;
              this.setState({
                fullName: data.fullName, 
                ... getEventsBySourceCounts(data.customerEvents, data.eventTypes, data.sources),
                isLoaded: true
              });
            }).catch((err) => {
              this.setState( { isLoaded: true, errorMessage: err.response.data.message, dialogOpen: true })
            });
          }).catch((err) => {
            this.setState( { isLoaded: true, errorMessage: err.response.data.message, dialogOpen: true })
          });
        }).catch((err) => {
          this.setState({ isLoaded: true, errorMessage: err.response.data.message, dialogOpen: true })
        });
      }).catch((err) => {
        this.setState({ isLoaded: true, errorMessage: err.response.data.message, dialogOpen: true })
      });
    }, 2000)
  }

  closeDialog(){
    this.setState({ dialogOpen: false })
  }

  toggleGroup(date){
    const { groupStatus } = this.state;
    const newGroupStatus = { ... groupStatus };
    if (newGroupStatus[date]) {
      newGroupStatus[date] = false
    } else {
      newGroupStatus[date] = true
    }
    this.setState( { groupStatus: newGroupStatus });
  }

  render() {
    const { classes, history } = this.props;
    const { eventsBySource, fullName, eventCountByCategoryDay, isLoaded, errorMessage, dialogOpen } = this.state;
    const { groupStatus, timelineDates, eventsByDate } = this.state;
    return (
      <div className={classes.root}>
        <Grid container alignItems="center" className={classes.myGrid}>
          <Grid item onClick={()=>history.push('/search')}>
            <Button className={classes.myButon}>
              <FontAwesomeIcon icon={faAngleLeft} className={classes.arrow} />
            </Button>
          </Grid>
          <Grid item onClick={()=>history.push('/search')}>Back to search</Grid>
        </Grid>
        <CustomerDetailsBar eventsBySource={eventsBySource} fullName={fullName} />
        <LoadingIndicator show={!isLoaded} />
        <CustomerDialog openState={dialogOpen} errorMessage={errorMessage} closeHandler={this.closeDialog} />
        <CustomerTimeline
          eventCountByCategoryDay={eventCountByCategoryDay}
          eventsByDate={eventsByDate}
          toggleGroup={this.toggleGroup}
          groupStatus={groupStatus}
          timelineDates={timelineDates}
        />
      </div>
    );
  }
}

CustomerDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(CustomerDetails));
