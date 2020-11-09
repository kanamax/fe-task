import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid  } from '@material-ui/core';
import meiro from '../../assets/source_logos/meiro_events.png';
import mail from '../../assets/source_logos/mailchimp.png';
import shop from '../../assets/source_logos/prestashop.png';
import wmeiro from '../../assets/source_logos/white_meiro_events.png';
import wmail from '../../assets/source_logos/white_mailchimp.png';
import wshop from '../../assets/source_logos/white_prestashop.png';

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
    height: '2.5rem',
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
  const { customerDetails } = props;
  const { eventsBySourceCounts, fullName } = customerDetails;
  return (
    <Grid container alignItems="center" justify="space-between" className={classes.root}>
      <Grid item xs={4} className={classes.nameTag}>{fullName}</Grid>
      <Grid item xs={8} container alignItems="center" justify="flex-end">
        <Grid item>
          <img 
            alt="meiro_events"
            src={eventsBySourceCounts.meiro_events !==0 ? meiro : wmeiro}
            className={eventsBySourceCounts.meiro_events !==0  ? classes.myImg : classes.whiteImg} 
          />
        </Grid>
        <Grid item className={classes.iconLabel}>Meiro Events</Grid>
        <Grid item>
          <img
            alt="mailchimp"
            src={eventsBySourceCounts.mailchimp !==0  ? mail : wmail}
            className={eventsBySourceCounts.mailchimp !==0 ? classes.myImg : classes.whiteImg} 
          />
        </Grid>
        <Grid item className={classes.iconLabel}>Mailchimp</Grid>
        <Grid item>
          <img
            alt="prestashop"
            src={eventsBySourceCounts.prestashop !==0 ? shop : wshop} 
            className={eventsBySourceCounts.prestashop !==0  ? classes.myImg : classes.whiteImg} 
          />
        </Grid>
        <Grid item className={classes.iconLabel}>Prestashop</Grid>
      </Grid>
    </Grid>
  )
}

CustomerDetailsBar.propTypes = {
  customerDetails: PropTypes.object.isRequired
}