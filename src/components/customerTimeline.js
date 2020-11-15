import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container  } from '@material-ui/core';
import TimelineDay from './timelineDay';

const useStyles = makeStyles({
  root: {
    paddingTop: '2rem'
  }
});

export default function CustomerTimeline(props) {
  const classes = useStyles();
  const { eventCountByCategoryDay, groupStatus, toggleGroup, timelineDates, eventsByDate } = props;

  const timelineDays = timelineDates.map((item, i) => (
    <TimelineDay 
      dayData={eventCountByCategoryDay[item]} 
      eventData={eventsByDate[item]} 
      toggleGroup={toggleGroup} 
      groupStatus={groupStatus[item]} 
      date={item} 
      key={`daycard${item}`}
      last={i+1 === timelineDates.length}
      first={i === 0}
      single={timelineDates.length===1}
    />
  ));

  return (
    <Container className={classes.root}>
      {timelineDays}    
    </Container>
  )
}

CustomerTimeline.propTypes = {
  eventCountByCategoryDay: PropTypes.object.isRequired,
  eventsByDate: PropTypes.object.isRequired,
  toggleGroup: PropTypes.func.isRequired,
  groupStatus: PropTypes.object.isRequired,
  timelineDates: PropTypes.array.isRequired
}