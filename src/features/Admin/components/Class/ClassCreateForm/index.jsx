import Button from '@mui/material/Button';

import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup";
import { InputField } from '../../../../../components';

import courseApi from '../../../../../api/CourseApi';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import GridLoader from "react-spinners/GridLoader";
import userApi from '../../../../../api/userApi';

ClassCreateForm.propTypes = {
    onSubmit: PropTypes.func,
};

export function ClassCreateForm({onSubmit}) {
    const [dataTeacher,setDataTeacher] =useState()
    const [dataCourse,setDataCourse] =useState()
    const [loading,setLoading] =useState(true)
    


    const schema = yup.object().shape({
      schedules: yup
        .string()
        .required("Vui lòng nhập lịch dạy."),
      duration: yup
        .number('Giá trị phải là số.')
        .required("Vui lòng nhập số buổi.")
        .typeError('giá trị phải là số'),
      id_teacher: yup
        .string()
        .required("Vui lòng chọn giảng viên."),
        
           
    });
 
    const form = useForm({
      defaultValues: {
        schedules:'',
        duration:'',
        
      },
      resolver: yupResolver(schema),
    });
  
    const handleSubmits = async (values) => {  
      if(!onSubmit) return;
      onSubmit(values)

    };
      
  const resetForm=()=>{
    form.reset()
  }
 
  useEffect(() => {

    (async () => {
      try {
        const {data}  = await userApi.getAll(); 
        const res  = await courseApi.getAll(); 
        setDataTeacher(data)
        setDataCourse(res.data)

      } catch (error) {
        console.log("Fail to fetch to product List", error);
      }

      setLoading(false);
    })();
  }, []);
  const {formState: { errors }}=form
  
  //  name là tên .. nếu để .thêm meesage thì báo lỗi.. nên tới .name thôi
const hasError = errors['id_class'];

    return (
            
      <form  onSubmit={form.handleSubmit(handleSubmits)}>
        {loading ? (
           <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'50vh',width:'30rem'}} >
            <GridLoader size={20} color="#36d7b7" />
          </Box>
        ):(
      
          <Box sx={{width:'30rem'}}>    

            <Box sx={{mb:5}}>
                  <Controller
                    render={({ field }) => (
                      <Select {...field} fullWidth>
                        {dataCourse && dataCourse.map((item)=>(          
                              <MenuItem  key={item.id} value={item.id}>{item.name}</MenuItem>
                              ))
                        }
                      </Select>
                    )}
                    control={form.control}
                    name="id_course"
                    defaultValue={1}
                    fullWidth
                  />
            </Box>

            <Controller
              render={({ field }) => (
                <Select {...field} fullWidth>
                  {dataTeacher && dataTeacher.map((item)=>(          
                        <MenuItem  key={item.id} value={item.id}>{item.name}</MenuItem>
                        ))
                  }
                </Select>
              )}
              control={form.control}
              name="id_teacher"
              defaultValue={6}
              fullWidth
            />
            <InputField name='schedules' label="Lịch dạy" form={form}></InputField> 
            <InputField name='duration' label="Số buổi" form={form}></InputField> 
            <Box sx={{display:'flex',gap:2}}>
              <Button onClick={resetForm} sx={{mt:6}} fullWidth variant="contained"  autoFocus>
                  reset
              </Button>
              <Button type='submit'  sx={{mt:6}} fullWidth variant="contained"  autoFocus>
                  Create
              </Button>

            </Box> 
 
          </Box>
        )}
       
       
      </form>      
      );
}

