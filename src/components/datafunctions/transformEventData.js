export default  function getEventsBySourceCounts(events, eventTypes, sources) {

  const eventsWithType = events.map((item) => {
    const newItem = { ... item }
    eventTypes.forEach((etyp) => {
      if(etyp.id === item.event_id) {
        newItem.source_id = etyp.source_id;
        newItem.title = etyp.title;
        newItem.short_title = etyp.short_title;
      }
    })
    return newItem;
  })

  const eventsWithTypeSource = eventsWithType.map((item) => {
    const newItem = { ... item }
    sources.forEach((styp) => {
      if(styp.id === item.source_id) {
        newItem.source_name = styp.name;
        newItem.icon = styp.frontend_settings.icon;
        newItem.color = styp.frontend_settings.color;
      }
    })
    return newItem;
  })

  const eventsBySource = sources.map((item) => {
    let count = 0;
    eventsWithTypeSource.forEach((ev) => {
      if(ev.source_id === item.id) {
        count += 1;
      }
    })
    return { ...item, count }
  });

  const eventCountByCategoryDay={};
  const eventsByDate = {};
  const dates = [];

  events.forEach((item) => {
    const date = item.datetime.substring(0,10).replace(/-/g, 'a');
    dates.push(date);
  })

  const timelineDates = Array.from(new Set(dates)).sort().reverse();

  timelineDates.forEach((date) => {
    eventCountByCategoryDay[date] = [];
    eventTypes.forEach((et) => {
      const newItem = { ...et, count: 0 };
      sources.forEach((s) => {
        if(s.id === et.source_id){
          newItem.source_name = s.name;
          newItem.icon = s.frontend_settings.icon;
          newItem.color = s.frontend_settings.color;
        }
      })
      eventCountByCategoryDay[date].push(newItem);
    })
    eventsByDate[date] = [];
  })

  eventsWithTypeSource.forEach((ev) => {
    const date = ev.datetime.substring(0,10).replace(/-/g, 'a');
    eventsByDate[date].push(ev);
  })

  const groupStatus = {};
  timelineDates.forEach((item) => {
    if (eventsByDate[item].length > 1) {
      groupStatus[item] = false;
    } else {
      groupStatus[item] = true;
    } 
  })

  events.forEach((ev) => {
    const date = ev.datetime.substring(0,10).replace(/-/g, 'a');
    eventCountByCategoryDay[date].forEach((et, i) => {
      if(ev.event_id === et.id) {
        eventCountByCategoryDay[date][i].count +=1;
      }
    })
  })

  return { groupStatus, timelineDates, eventsByDate, eventCountByCategoryDay,eventsBySource };
}
