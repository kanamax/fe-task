import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid  } from '@material-ui/core';

const useStyles = makeStyles({
  rootGrid: {
    padding: '0 1rem'
  },
  myImg: {
    height: '3rem'
  },
  myLabel: {
    padding: '0 0.5rem'
  },
  eventName: {
    fontWeight: '700'
  },
  eventCategory: {
    color: 'rgb(163, 163, 163)'
  }
});

export default function TimelineWidget(props) {
  const classes = useStyles();
  const { widgetData } = props;
  return (
    <Grid container alignItems="center" justify="center" direction="row" wrap="nowrap" className={classes.rootGrid}>
      <Grid item>
        <img
          alt="event_icon"
          src={`../../assets/source_logos/${widgetData.source_id}.png`}
          className={classes.myImg}
        />
      </Grid>
      <Grid item container direction="column" className={classes.myLabel} alignItems="flex-start" justify="center">
        <Grid item className={classes.eventName}>{`${widgetData.count}x ${widgetData.short_title}`}</Grid>
        <Grid item className={classes.eventCategory}>{widgetData.source_name}</Grid>
      </Grid>
    </Grid>
  )
}

TimelineWidget.propTypes = {
  widgetData: PropTypes.object.isRequired
}
