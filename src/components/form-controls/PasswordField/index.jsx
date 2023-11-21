
import PropTypes from 'prop-types';
import { Controller } from "react-hook-form";
import { TextField } from '@mui/material';

PasswordField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function PasswordField(props) {
    const { form, name, label,disabled=false } = props;
    const {formState: { errors }}=form
  
    //  name là tên .. nếu để .thêm meesage thì báo lỗi.. nên tới .name thôi
    const hasError = errors[name];
    return (
      <Controller
        
        name={name}
        control={form.control}
        render={({       
          field,

        }) => (
          <TextField    
          {...field}  
          type='password' 
          className="custominput"
          variant="outlined"
          margin="normal"
          fullWidth
          label={label}
          name={name}
          disabled={disabled}
          error={!!hasError}
          helperText={hasError ? hasError.message:''}
          ></TextField>
      )}
        >
      </Controller>
    );
}

export default PasswordField;