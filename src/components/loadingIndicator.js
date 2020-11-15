import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'block',
    position: 'fixed',
    zIndex:'1',
    left: '0',
    top: '0',
    width:'100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  hide: {
    display: 'none'
  },
  progress: {
    color: 'rgb(254, 127, 102)'
  },
  gridContainer: {
    height: '100%'
  }
});

export default function LoadingIndicator(props) {
  const classes = useStyles();
  const { show } = props;
  return (
    <div className={show ? classes.root : classes.hide}>
      <Grid container justify="center" alignItems="center" className={classes.gridContainer}>
        <Grid item>
          <CircularProgress size={60} thickness={6} className={classes.progress} />
        </Grid>
      </Grid>
    </div>
  );
}

LoadingIndicator.propTypes = {
  show: PropTypes.bool.isRequired
}
