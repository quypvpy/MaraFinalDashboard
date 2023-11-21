import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

import PropTypes from 'prop-types';


UserRoleDialog.propTypes = {

    onClick:PropTypes.func,

};

export function UserRoleDialog({onClick}) {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
      setOpen(false);
    };
    const handleChange = () => {
     if(!onClick) return;

     onClick(true);
     setOpen(false);
    };
  
 
 
    return (
        <div>
          
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Bạn muối đổi trạng thái?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Bạn có muốn đổi không?. Bạn nên suy nghĩ lại...
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={handleChange} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
  
        </div>
      );
}

