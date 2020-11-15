import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import Collapse from '@material-ui/core/Collapse';
import TimelineEvent from './timelineEvent';
import TimelineWidget from './timelineWidget';
import TimelineConnector from './timelineConnector';

const useStyles = makeStyles({
  root: {
    margin: '0'
  },
  dayCard: {
    padding: '0.2rem',
    minWidth: '65%'
  },
  dayCardHidden: {
    display: 'none'
  },
  dateBox: {
    textAlign: 'center',
    color: 'rgb(163, 163, 163)',
    fontSize: '0.6rem'
  },
  myBadge: {
    border: '1px solid rgb(163, 163, 163)',
    color: 'rgb(163, 163, 163)',
    fontSize: '0.75rem',
    backgroundColor: 'rgb(260, 260, 260)'
  },
  myIcon: {
    fontSize: '1.25rem',
    color: 'rgb(163, 163, 163)'
  },
  myButton: {
    border: '1px solid rgb(163, 163, 163)',
    borderRadius: '4px',
    marginTop: '0.2rem'
  },
  cardGrid: {
    margin: '1rem'
  },
  buttonGrid: {
    padding: '0.75rem'
  }
});

export default function TimeLineDay(props) {
  const { dayData, eventData, date, toggleGroup, groupStatus, last, first, single } = props;
  const classes = useStyles();
  let visibility = '';
  if (eventData.length === 1 ) {
    visibility = 'Hidden'
  }

  const timelineWidgets = dayData.map((item) => (
    item.count !== 0 ?  (
      <Grid item container key={`wigdet${item.id}`}>
        <TimelineWidget widgetData={item} date={date} />
      </Grid>
    ) : null
  ));

  const eventList = eventData.map((item, i) => (
    <div key={`event${item.id}`}>
      <Grid container justify="center" key={`event${item.id}`} className={classes.cardGrid}>
        <TimelineEvent eventData={item}  />
      </Grid>
      { !last || ( last && i !== eventData.length - 1 && groupStatus && !single ) ? <TimelineConnector /> : null}
    </div>
    
  ));

  return (
    <Container className={classes.root}>
      <Grid container justify="center" className={classes.cardGrid}>
        <Card className={classes[`dayCard${visibility}`]}>
          <Grid container wrap="nowrap" justify="space-around">
            {timelineWidgets}
            <Grid item container direction="column" alignContent="flex-end" className={classes.buttonGrid}>
              <Grid item className={classes.dateBox}>{date.split('a').reverse().join('-')}</Grid>
              <Grid item>
                <Badge
                  badgeContent={eventData.length}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  classes={{ badge: classes.myBadge }}
                >
                  <Button className={classes.myButton} onClick={()=>toggleGroup(date)}>
                    <FontAwesomeIcon
                      icon={groupStatus ? faAngleDoubleUp : faAngleDoubleDown} 
                      className={classes.myIcon} 
                    />
                  </Button>
                </Badge>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      {(first && visibility === 'Hidden') || (single ) || (last && groupStatus === false) ?
        null :  <TimelineConnector /> }
      <Collapse in={groupStatus}>
        {eventList}
      </Collapse>
    </Container>
  )
}

TimeLineDay.propTypes = {
  dayData: PropTypes.array.isRequired,
  eventData: PropTypes.array.isRequired ,
  toggleGroup: PropTypes.func.isRequired,
  groupStatus: PropTypes.bool.isRequired,
  date: PropTypes.string.isRequired,
  last: PropTypes.bool.isRequired,
  first: PropTypes.bool.isRequired,
  single: PropTypes.bool.isRequired
}
