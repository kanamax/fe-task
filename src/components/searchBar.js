/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Paper, Button } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const useStyles = makeStyles({
  myPaper: {
    backgroundColor: 'rgb(245, 245, 245)',
    borderRadius: '8px',
    border: '1px solid transparrent',
    padding: '0.5rem',
    marginBottom: '1px'
  },
  searchLabel: {
    fontSize: '1.5rem',
    fontWeight: '700'
  },
  iconRoot: {
    borderRadius:'1rem',
    backgroundColor: 'rgb(254, 127, 102)',
    padding: '0.75rem',
    color: 'white',
    fontSize: '1.5rem'
  },
  inputRoot: {
    paddingRight: '0.25rem'
  },
  myButton: {
    padding: '0'
  }
});

export default function SearchBar(props) {
  const classes = useStyles();
  const { getSearchResults, saveToStore, searchString, history } = props;
  return (
    <Paper className={classes.myPaper}>
      <Grid container spacing={4} alignItems="center" justify="space-around" className={classes.gridRoot}>
        <Grid item xs={2} className={classes.searchLabel}>Customer search</Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Search attributes, customers and more"
            fullWidth
            type="text"
            value={searchString}
            onChange={(e) => saveToStore(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                getSearchResults({ query: searchString });
                history.push(`/search/${searchString}`)
              } 
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button className={classes.myButton}>
                    <FontAwesomeIcon
                      icon={faSearch}
                      className={classes.iconRoot}
                      onClick={() => {
                        history.push(`/search/${searchString}`)
                        getSearchResults({ query: searchString });
                      }}
                    />
                  </Button>
                </InputAdornment>
              ),
              className: classes.inputRoot
            }}
          />
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </Paper>
  );
}

SearchBar.propTypes = {
  getSearchResults: PropTypes.func.isRequired,
  saveToStore: PropTypes.func.isRequired,
  searchString: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired
}
