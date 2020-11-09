import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container  } from '@material-ui/core';
import TimelineDay from './timelineDay';

const useStyles = makeStyles({
  root: {
    paddingTop: '2rem'
  },
  connector: {
    borderLeft: '6px solid green',
    height:'5rem',
    left: '50%',
    marginLeft: '-3px',
    top:'0'
  }
});

export default function CustomerTimeline(props) {
  const classes = useStyles();
  const { customerDetails, groupStatus, toggleGroup} = props;
  const { eventCountByCategoryDay, timelineDates, eventsByDate } = customerDetails;


  const timelineDays = timelineDates.map((item, i) => (
    <TimelineDay 
      dayData={eventCountByCategoryDay[item]} 
      eventData={eventsByDate[item]} 
      toggleGroup={toggleGroup} 
      groupStatus={groupStatus[item]} 
      date={item} 
      key={`daycard${item}`}
      last={i+1 === timelineDates.length}
    />
  ));

  return (
    <Container className={classes.root}>
      {timelineDays}    
    </Container>
  )
}

CustomerTimeline.propTypes = {
  customerDetails: PropTypes.object.isRequired,
  toggleGroup: PropTypes.func.isRequired,
  groupStatus: PropTypes.object.isRequired
}