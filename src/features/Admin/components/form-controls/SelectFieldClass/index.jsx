import PropTypes from 'prop-types';
import { Controller } from "react-hook-form";

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import categories from '../../../../../api/categories';

SelectFieldClass.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};

export function SelectFieldClass(props) {
  const { form, name, label,disabled=false } = props;
  const [data,setData] =useState()

  const {formState}=form
  const [defaultValue,setDefaultValue]=useState()

  useEffect(()=>{
    if(formState.defaultValues){
      setDefaultValue(formState.defaultValues[name])
    }
  },[formState.defaultValues,name,formState])

  useEffect(() => {

    (async () => {
      try {
        const {data}  = await categories.getAll(); 
        setData(data)

      } catch (error) {
        console.log("Fail to fetch to product List", error);
      }

      // setLoading(false);
    })();
  }, []);
  return (
      <Box >
        {defaultValue >=0 && (
        
            <Controller
            name={name}
            control={form.control}
            render={({
              // field: { onChange, onBlur, value, name },
              field: { onChange, onBlur,value },
      
            }) => (
              <FormControl fullWidth >
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Lớp đào tạo
                </InputLabel>
                <NativeSelect
                onChange={onChange}
                onBlur={onBlur}
                name='status'
                label={label}
                value={value}
                disabled={disabled}
                inputProps={{
                  name:`${name}`,
                  id: 'uncontrolled-native',
                }}
              >
                {data && data.map((item)=>(          
                  <option key={item.id} value={item.id}>{item.name}</option>
               
                  ))
             
                }
                             
               </NativeSelect>
              </FormControl>
      
            )}
            >  
            </Controller>
        
        )}
      </Box>
  );
}


