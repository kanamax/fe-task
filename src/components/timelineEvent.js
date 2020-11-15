import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid  } from '@material-ui/core';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles({
  eventCard: {
    padding: '0.2rem',
    minWidth: '40%'
  },
  myImg: {
    height: '2rem',
    backgroundColor: 'white'
  },
  eventLabel: (props) => ({
    fontWeight: '600',
    fontSize: '1rem',
    paddingLeft: '0.5rem',
    color: props.color
  }),
  dateBox: {
    color: 'rgb(163, 163, 163)',
    fontSize: '0.75rem'
  }
});

export default function TimelineEvent(props) {
  const { eventData } = props;
  const classes = useStyles({ color: eventData.color });

  return (
    <Card className={classes.eventCard}>
      <Grid container alignItems="center" justify="space-between" wrap="nowrap">
        <Grid item container alignItems="center">
          <Grid item>
            <img
              alt="event icon"
              src={`../../assets/source_logos/${eventData.source_id}.png`}
              className={classes.myImg}
            />
          </Grid>
          <Grid item className={classes.eventLabel}>{eventData.title}</Grid>
        </Grid>
        <Grid item className={classes.dateBox}>{ new Date(eventData.datetime).toUTCString()}</Grid>
      </Grid>
    </Card>
  )
}

TimelineEvent.propTypes = {
  eventData: PropTypes.object.isRequired
}
