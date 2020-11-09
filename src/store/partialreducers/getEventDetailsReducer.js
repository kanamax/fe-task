/* eslint-disable camelcase */
/* eslint-disable no-prototype-builtins */
import eventTypes from '../../../api/db/events';
import sources from '../../../api/db/sources';

eventTypes.forEach((item, i) => {
  sources.forEach((sitem) => {
    if(sitem.id === item.source_id) {
      eventTypes[i].source = sitem.name;
    }
  })
})

function getEventDetailsReducer(data, state) {
  const { customer_events } = data;

  const eventsBySourceCounts = {
    meiro_events: 0,
    mailchimp: 0,
    prestashop: 0
  }

  const eventCountByCategoryDay = {};
  const eventsByDate = {};
  const dates = [];

  customer_events.forEach((item) => {
    const date = item.datetime.substring(0,10).replace(/-/g, 'a');
    dates.push(date);

    if(!eventCountByCategoryDay.hasOwnProperty(date)) {
      eventTypes.forEach((ev1)=>{
        if(item.event_id === ev1.id) {
          eventCountByCategoryDay[date] = [{... ev1, count: 1}];
        }
      });
    } else {
      let found = 0;
      eventCountByCategoryDay[date].forEach((ev2, n2)=>{
        if(item.event_id === ev2.id) {
          eventCountByCategoryDay[date][n2].count +=1;
          found = 1;
        }
      });

      if (found === 0) { 
        eventTypes.forEach((ev3)=>{
          if(item.event_id === ev3.id) {
            eventCountByCategoryDay[date].push({... ev3, count: 1});
          }
        });
      }
       
    }
    
    eventTypes.forEach((ev)=>{
      if(item.event_id === ev.id) {
        if(!eventsByDate.hasOwnProperty(date)) {
          eventsByDate[date] = [{title: ev.title, source_id: ev.source_id, ...item}];
        } else {
          eventsByDate[date].push({title: ev.title, source_id: ev.source_id, ...item});
        }
      }
    });

    let source = 'unknown';
    eventTypes.forEach((ev5)=>{
      if(item.event_id === ev5.id) {
        source = ev5.source_id;
      }
    });
    if (source !== 'unknown') {
      eventsBySourceCounts[source] += 1;
    }

  })

  const finalDates = Array.from(new Set(dates)).sort();

  const groupStatus = {};
  finalDates.forEach((item) => {
    if (eventsByDate[item].length > 1) {
      groupStatus[item] = false;
    } else {
      groupStatus[item] = true;
    }
    
  })

  const newState = { 
    ...state, 
    customerDetails: {
      ... data,
      eventsBySourceCounts: { ... eventsBySourceCounts}, 
      eventCountByCategoryDay: {...eventCountByCategoryDay},
      eventsByDate: { ... eventsByDate},
      timelineDates: [ ... finalDates ]
    },
    groupStatus: { ... groupStatus}
  };
  return newState;
}

export default getEventDetailsReducer;