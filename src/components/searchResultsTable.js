import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import avatarBank from '../../assets/avatarBank';

const useStyles = makeStyles({
  myPaper: {
    marginTop: '2rem',
    backgroundColor: 'rgb(245, 245, 245)',
    borderRadius: '8px',
    minHeight: '25rem'
  },
  searchLabel: {
    fontSize: '1.5rem',
    fontStyle: 'bold'
  },
  iconRoot: {
    borderRadius:'1rem',
    backgroundColor: 'rgb(245, 165, 24)',
    width: '3.2rem',
    height: '3.2rem',
    color: 'rgb(171, 91, 12)'
  },
  inputRoot: {
    paddingRight: '0.2rem'
  },
  avatar: {
    width: '2rem'
  },
  nameTag: {
    fontWeight: '700',
    paddingLeft: '0.5rem'
  },
  arrow: {
    fontSize: '2rem',
    paddingRight: '1rem'
  }
});

function getFullName(params) {
  return `${params.getValue('name') || ''} ${
    params.getValue('surname') || ''
  }`;
}

function dateToString(params) {
  return new Date(params.getValue('created')).toLocaleString();
}

export default function SearchResultsTable(props) {
  const classes = useStyles();
  const { customers, getEventDetails, page, changePage } = props;
  const customersWavatar = customers.map((item,i) => {
    const customerWavatar = { ... item, avatar:avatarBank[i] }
    return customerWavatar;
  })

  const columns = [
    { field: 'fullName', 
      headerName: 'Full name',
      width: 240,
      renderCell: (params) => (
        <Grid container>
          <img
            alt="customer_avatar"
            className={classes.avatar}
            src={params.getValue('avatar')}
          />
          <Grid item className={classes.nameTag}>{getFullName(params)}</Grid>
        </Grid>
      )
    },
    { field: 'name', headerName: 'First name', width: 140 },
    { field: 'surname', headerName: 'Last name', width: 140 },
    { field: 'created', headerName: 'Created', width: 250, valueGetter: dateToString},
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 'link', headerName: '  ', width: 100, renderCell: (params) => (
      <Link to="/details">
        <IconButton onClick={() => getEventDetails({id: params.getValue('id'), fullName: getFullName(params) })}>
          <SvgIcon>
            <path d="M5.5,4.14L4.5,5.86L15,12L4.5,18.14L5.5,19.86L19,12L5.5,4.14Z" />
          </SvgIcon>
        </IconButton>
      </Link>
    ) }
  ]
  return (
    <Paper className={classes.myPaper}>
      <DataGrid 
        rows={customersWavatar}
        columns={columns}
        pageSize={5}
        page={page}
        onPageChange={(params) => {changePage(params.page)}}
      />
    </Paper>
  );
}

SearchResultsTable.propTypes = {
  customers: PropTypes.array.isRequired,
  getEventDetails: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired
}
