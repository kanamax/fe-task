import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { Grid, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import CustomerDetailsBar from './customerDetailsBar';
import CustomerTimeline from './customerTimeline';


const useStyles = makeStyles({
  myButon: {
    color: 'rgb(163, 163, 163)'
  },
  myGrid: {
    color: 'rgb(163, 163, 163)'
  },
  arrow: {
    fontSize: '2rem'
  }
});

export default function CustomerDetails(props) {
  const classes = useStyles();
  const history = useHistory();
  const { customerDetails, toggleGroup, groupStatus } = props;
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
      <CustomerDetailsBar customerDetails={customerDetails} />
      <CustomerTimeline customerDetails={customerDetails} toggleGroup={toggleGroup} groupStatus={groupStatus} />
    </div>
  );
}

CustomerDetails.propTypes = {
  customerDetails: PropTypes.object.isRequired,
  toggleGroup: PropTypes.func.isRequired,
  groupStatus: PropTypes.object.isRequired
}