import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import PropTypes from 'prop-types';

Snackbars.propTypes = {
    anchor:PropTypes.object,
    content:PropTypes.string,
    type:PropTypes.string,
    open:PropTypes.bool,
    close:PropTypes.func,
};
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export function Snackbars({anchor,content,type='success',open,close}) {

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      if(!close) return
      close()
  
    //   setOpen(false);
    };
    return (
        <div>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={ anchor}>
                    <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                    {content}
                    </Alert>
                </Snackbar>
            </Stack>  
        </div>
    );
}

