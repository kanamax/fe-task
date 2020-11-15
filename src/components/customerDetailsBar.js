import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid  } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    margin: '0',
    border: '1px solid rgb(180, 180, 180)',
    borderRadius: '6px',
    backgroundColor: 'rgb(260, 260, 260)',
    height: '4rem'
  },
  nameTag: {
    fontSize: '1.5rem',
    fontWeight: '700',
    paddingLeft: '1.5rem'
  },
  myImg: {
    height: '3rem'
    
  },
  whiteImg: {
    height: '2.3rem',
    margin: '0.35rem',
    backgroundColor: 'rgb(180, 180, 180)',
    borderRadius: '50%'
  },
  iconLabel: {
    padding: '0 1rem',
    fontWeight: '700'
  }
});

export default function CustomerDetailsBar(props) {
  const classes = useStyles();
  const { eventsBySource, fullName } = props;

  const imgs = []
  eventsBySource.forEach((item) => {
    imgs.push(
      <Grid item key={`img${item.id}`}>
        <img
          alt={item.id}
          src={item.count !==0 ?
            `../../assets/source_logos/${item.id}.png` :
            `../../assets/source_logos/white_${item.id}.png`}
          className={item.count !==0  ? classes.myImg : classes.whiteImg} 
        />
      </Grid>
    )
    imgs.push(
      <Grid item className={classes.iconLabel} key={`title${item.id}`}>{item.name}</Grid>
    )
  });

  return (
    <Grid container alignItems="center" justify="space-between" className={classes.root}>
      <Grid item xs={4} className={classes.nameTag}>{fullName}</Grid>
      <Grid item xs={8} container alignItems="center" justify="flex-end">
        {imgs}
      </Grid>
    </Grid>
  )
}

CustomerDetailsBar.propTypes = {
  eventsBySource: PropTypes.array.isRequired,
  fullName: PropTypes.string.isRequired
}
