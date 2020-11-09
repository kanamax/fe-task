import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid  } from '@material-ui/core';

const useStyles = makeStyles({
  connector: {
    borderLeft: '2px solid rgb(163, 163, 163)',
    height:'2rem',
    left: '50%',
    margin: '-1rem 0',
    top:'0'
  }
});

export default function TimelineConnector() {
  const classes = useStyles();
  return (
    <Grid container justify="center">
      <div className={classes.connector} />
    </Grid>
  )
}
