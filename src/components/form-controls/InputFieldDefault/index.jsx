import PropTypes from 'prop-types';
import { Controller } from "react-hook-form";
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';

InputFieldDefault.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    

};

export function InputFieldDefault(props) {
    const { form, name, label,disabled=false } = props;
    const {formState: { errors }}=form

    const {formState}=form
    const [defaultValue,setDefaultValue]=useState()

    console.log('form,',form);
   
    useEffect(()=>{
      if(formState.defaultValues){
        setDefaultValue(formState.defaultValues[name])
        
      }
    },[formState.defaultValues,name])
    
    //  name là tên .. nếu để .thêm meesage thì báo lỗi.. nên tới .name thôi
    const hasError = errors.name;

    // const hasError = formState.touchedFields[name] && formState.errors[name]
    return (

        <div className="">
            {defaultValue  && (
                     <Controller
         name={name}
         control={form.control}
         render={({       
            // field: {onChange,value, onBlur, name },
            field: {onChange },
   
         }) => (
           <TextField
           defaultValue={defaultValue} 
           onChange={onChange}
             sx={{mb:3}}
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
       ></Controller>
         )}
        </div>
 
    );
}

