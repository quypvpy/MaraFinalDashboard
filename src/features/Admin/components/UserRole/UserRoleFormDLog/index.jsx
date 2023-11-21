import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';



import PropTypes from 'prop-types';

UserRoleFormDLog.propTypes = {
   onClick:PropTypes.func, 
};

export function UserRoleFormDLog({onClick}) {
  const [open, setOpen] = React.useState(true);

  const [valueSelect, setValueSelect] = React.useState(1);
  const [valueName, setValueName] = React.useState(0);
  

  const handleClose = () => {

    console.log('valu3e',valueSelect);
    console.log('name',valueName);
    // setOpen(false);
    // if(!onClick) return 
    // onClick(false)
  };
  React.useEffect(()=>{

  },[])
    return (
        <div>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Thêm loại tài khoản</DialogTitle>
            <DialogContent>

              <TextField
                onChange={(e)=>setValueName(e.target.value)}
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="email"
                fullWidth
                variant="standard"
              />

            <Box sx={{ minWidth: 520,mt:4 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Status
                </InputLabel>
                <NativeSelect
                  onChange={(e)=>setValueSelect(e.target.value)}
                  defaultValue={1}
                  inputProps={{
                    name: 'age',
                    id: 'uncontrolled-native',
                  }}
                >
                  <option value={1}>Mở</option>
                  <option value={0}>khóa</option>
                  
                </NativeSelect>
              </FormControl>
            </Box>

            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Hủy</Button>
              <Button onClick={handleClose}>Thêm</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}

