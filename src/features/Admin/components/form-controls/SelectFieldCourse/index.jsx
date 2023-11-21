

import PropTypes from 'prop-types';
import { Controller } from "react-hook-form";

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import courseCateApi from '../../../../../api/CourseCate';

SelectFieldCourse.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};

export function SelectFieldCourse(props) {
  const { form, name, label,disabled=false } = props;
  const [data,setData] =useState()


  useEffect(() => {

    (async () => {
      try {
        const {data}  = await courseCateApi.getAll(); 
        setData(data)

      } catch (error) {
        console.log("Fail to fetch to product List", error);
      }

      // setLoading(false);
    })();
  }, []);
  return (
      <Box >
       <Controller
            name={name}
            control={form.control}
            render={({
              field: { onChange, onBlur,value },
      
            }) => (
              <FormControl fullWidth >
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Loại đào tạo
                </InputLabel>
                <NativeSelect
                onChange={onChange}
                onBlur={onBlur}
                name={name}
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

      </Box>
  );
}





