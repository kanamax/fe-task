import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  myButon: {
    color: 'rgb(163, 163, 163)',
    fontWeight: '700',
    border: '1px solid rgb(163, 163, 163)',
    borderRadius: '0.5rem'
  }
};

class CustomerDialog extends React.Component {

  render() {
    const { errorMessage, openState, closeHandler, classes } = this.props;
    return (
      <div>
        <Dialog
          open={openState}
          keepMounted
          onClose={closeHandler}
        >
          <DialogTitle id="alert-dialog-slide-title">Something went wrong during the database search:</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {errorMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeHandler} className={classes.myButon}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

CustomerDialog.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  openState: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CustomerDialog);
