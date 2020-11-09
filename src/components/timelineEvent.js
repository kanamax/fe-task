import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid  } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import imageBank from '../../assets/imageBank';

const useStyles = makeStyles({
  eventCard: {
    padding: '0.2rem',
    minWidth: '40%'
  },
  myImg: {
    height: '2rem',
    backgroundColor: 'white'
  },
  eventLabelM: {
    fontWeight: '600',
    fontSize: '1rem',
    paddingLeft: '0.5rem',
    color: "#B85888"
  },
  eventLabelE: {
    fontWeight: '600',
    fontSize: '1rem',
    paddingLeft: '0.5rem',
    color: "#FBB962"
  },
  eventLabelB: {
    fontWeight: '600',
    fontSize: '1rem',
    paddingLeft: '0.5rem',
    color: "#01579B"
  },
  dateBox: {
    color: 'rgb(163, 163, 163)',
    fontSize: '0.75rem'
  }
});

export default function TimelineEvent(props) {
  const classes = useStyles();
  const { eventData } = props;
  let category = '';
  switch (eventData.source_id) {
  case 'meiro_events':
    category = 'M';
    break;
  case 'mailchimp':
    category = 'E';
    break;
  case 'prestashop':
    category = 'B';
    break;
  default:
    category = '';
  }

  return (
    <Card className={classes.eventCard}>
      <Grid container alignItems="center" justify="space-between" wrap="nowrap">
        <Grid item container alignItems="center">
          <Grid item>
            <img
              alt="event icon"
              src={imageBank[eventData.source_id]}
              className={classes.myImg}
            />
          </Grid>
          <Grid item className={classes[`eventLabel${category}`]}>{eventData.title}</Grid>
        </Grid>
        <Grid item className={classes.dateBox}>{ new Date(eventData.datetime).toUTCString()}</Grid>
      </Grid>
    </Card>
  )
}

TimelineEvent.propTypes = {
  eventData: PropTypes.object.isRequired
}
