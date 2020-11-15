import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { 
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button  
} from '@material-ui/core';
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

const styles = {
  myPaper: {
    backgroundColor: 'rgb(245, 245, 245)',
    borderRadius: '8px',
    boxSizing: 'border-box'
  },
  myButton: {
    border: '1px solid rgb(163, 163, 163)',
    borderRadius: '0.5rem',
    fontWeight: '700',
    color: 'rgb(163, 163, 163)'
  },
  invisible: {
    display: 'none'
  },
  avatar: {
    width: '2rem'
  },
  blackColor: {
    fontWeight: '700'
  },
  greyColor: {
    fontWeight: '500',
    color: 'rgb(163, 163, 163)'
  },
  greyColorBolded: {
    fontWeight: '700',
    color: 'rgb(163, 163, 163)'
  }
}

class SearchResultsTable extends React.Component{

  render() {
    const { customers, showMoreData, classes, upTo } = this.props;
    const displayData = customers.slice(0, Math.min(upTo, customers.length))

    return (
      <TableContainer component={Paper} className={classes.myPaper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell className={classes.blackColor}>CUSTOMER ID</TableCell>
              <TableCell className={classes.greyColorBolded}>NAME</TableCell>
              <TableCell className={classes.greyColorBolded}>SURNAME</TableCell>
              <TableCell className={classes.greyColorBolded}>CREATED</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {displayData.map((row, i) => (
              <TableRow key={row.id}>
                <TableCell align="right">
                  <img
                    alt="customer_avatar"
                    className={classes.avatar}
                    src={`../../assets/customer_avatars/Avatar-${i}.svg`}
                  />
                </TableCell>
                <TableCell className={classes.blackColor}>{`Customer ${row.id}`}</TableCell>
                <TableCell className={classes.greyColor}>{row.name}</TableCell>
                <TableCell className={classes.greyColor}>{row.surname}</TableCell>
                <TableCell className={classes.greyColor}>{new Date(row.created).toLocaleString()}</TableCell>
                <TableCell align="right" className={classes.greyColor}>
                  <Link to={`/details/${row.id}`}>
                    <IconButton>
                      <SvgIcon>
                        <path d="M5.5,4.14L4.5,5.86L15,12L4.5,18.14L5.5,19.86L19,12L5.5,4.14Z" />
                      </SvgIcon>
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <caption align="center">
            <Grid container justify="center">
              <Button
                className={customers.length !== displayData.length ? classes.myButton : classes.invisible}
                onClick={() => showMoreData({ upTo, total: customers.length })}
              >
                SHOW MORE
              </Button>
            </Grid>
          </caption>
        </Table>
      </TableContainer>
    );
  }
}

SearchResultsTable.propTypes = {
  customers: PropTypes.array.isRequired,
  showMoreData: PropTypes.func.isRequired,
  upTo: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SearchResultsTable);
