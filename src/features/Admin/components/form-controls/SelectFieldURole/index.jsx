import PropTypes from 'prop-types';
import { Controller } from "react-hook-form";

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useEffect, useState } from 'react';

SelectFieldURole.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};

export function SelectFieldURole(props) {
    const { form, name, label,disabled=false } = props;

    const {formState}=form
    const [defaultValue,setDefaultValue]=useState()

    useEffect(()=>{
      if(formState.defaultValues){
        setDefaultValue(formState.defaultValues[name])
      }
    },[formState.defaultValues,name,formState])


  return (
      <div className="">
        {defaultValue >=0 && (
        
            <Controller
            name={name}
            control={form.control}
            render={({
              // field: { onChange, onBlur, value, name },
              field: { onChange, onBlur },
      
            }) => (
              <FormControl fullWidth >
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Status
                </InputLabel>
                <NativeSelect
                onChange={onChange}
                onBlur={onBlur}
                name='status'
                label={label}
                // value={defaultValue}
                disabled={disabled}
                defaultValue={defaultValue}
                inputProps={{
                  name:`${name}`,
                  id: 'uncontrolled-native',
                }}
              >
                <option value={1}>Mở</option>
                <option value={0}>khóa</option>
                             
               </NativeSelect>
              </FormControl>
      
            )}
            >  
            </Controller>
        
        )}
      </div>
  );
}


