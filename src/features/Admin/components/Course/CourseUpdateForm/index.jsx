
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Container } from '@mui/material';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import {  InputField, QillEditor } from '../../../../../components';
import { Navigation } from '../../Navigation';
import { SelectFieldCourse } from '../../form-controls';
import { useState } from 'react';


CourseUpdateForm.propTypes = {
  onSubmit: PropTypes.func,
  course: PropTypes.array,
  
};

export function CourseUpdateForm({onSubmit,course}) {
  const [totalModule,setTotalModule]=useState(0)


  const inNitModule =()=>{
    let tamp ={}
    Array(totalModule).fill(totalModule).map((item,index)=>(
      tamp = {
        ...tamp,
        [`module${index+1}`]:yup
        .string()
        .required("Vui lòng nhập module.").test(
          "should has at least two words",
          "Nhập ít nhất 2 từ",
          (value) => {
            return value.split(" ").length >= 2;
          }
        ),
      }
    ))
    return  tamp
  }
  // console.log('inNitModule',inNitModule());

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Vui lòng nhập tên lớp học.")
      .test(
        "should has at least two words",
        "Nhập ít nhất 2 kí tự",
        (value) => {
          return value.split(" ").length >= 2;
        }
      ),
    summary: yup
    .string()
    .required("Vui lòng nhập tên tóm tắt.")
    .test(
      "should has at least two words",
      "Nhập ít nhất 2 từ",
      (value) => {
        return value.split(" ").length >= 2;
      }
    ),
    price: yup
    .number('Giá trị phải là số.')
    .required("Vui lòng nhập giá.")
    .typeError('giá trị phải là số'),
    discount: yup
    .number('giá trị phải là số.')
    .required("Vui lòng nhập thông tin.").typeError('giá trị phải là số'),
    // duration: yup
    // .string()
    // .required("Vui lòng nhập thời gian."),
    id_courseCate: yup
    .string()
    .required("Vui lòng nhập loại khối dạy."),
    // module: yup
    // .string()
    // .required("Vui lòng nhập module.").test(
    //   "should has at least two words",
    //   "Nhập ít nhất 2 từ",
    //   (value) => {
    //     return value.split(" ").length >= 2;
    //   }
    // ),
    ...inNitModule()

    
      
  });

  const form = useForm({
    defaultValues: {
      name:course[0].name,
      summary:course[0].summary,
      price:course[0].price,
      discount:course[0].discount,
      id_courseCate:course[0].id_courseCate,
    },
    resolver: yupResolver(schema),
  });
  


  const handleSubmits = async (values) => {    
    if (onSubmit) {
      await onSubmit(values);
    }
  };
    


  return (
    <Navigation>
          
      <Container>             
      <DialogTitle id="alert-dialog-title">
        {/* {"Update khóa học ?"} */}
        <Box  sx={{fontWeight: 'bold'}}>Update khóa học? </Box>
      </DialogTitle>
      <DialogContent>

        <form  onSubmit={form.handleSubmit(handleSubmits)}>
         
          
          <Box sx={{display:'flex',gap:3}}>
            <InputField name='name' label="Tên khóa học" form={form}></InputField>     
            <InputField name='summary' label="Tóm tắt" form={form}></InputField> 
          </Box>

          <Box sx={{display:'flex',gap:2,alignItems:'baseline '}}>
            <InputField name='price' label="Giá khóa" form={form}></InputField>   
            <InputField name='discount' label="Giảm giá" form={form}></InputField>    
            {/* <InputField name='duration' label="Thời gian học" form={form}></InputField>    */}
            <Box sx={{minWidth:'20vw',transform:'translateY(-10px)'}}><SelectFieldCourse name='id_courseCate' label="Loại đào tạo" form={form}></SelectFieldCourse></Box>
          </Box> 

    
          {/* Quy  ước  =0 .là content ..còn  lại là module */}
          <Box component={'p'} sx={{mb:2,fontWeight: 'bold'}}>Nội dung khóa học</Box>
          <QillEditor number={0} defaultValue={course[0].detail}></QillEditor>

          {Array(totalModule).fill(totalModule).map((item,index)=>(
            <Box key={index}   sx={{mt:10}}>
              <InputField  name={`module${index+1}`} label={`Tên module ${index+1}`} form={form}></InputField>
              
                <Box component={'p'} sx={{mb:2,fontWeight: 'bold'}}>Nội dung module {index+1}</Box>
                <QillEditor number={index+1}></QillEditor>
              
            </Box>
          ))}
         
      
          <Box sx={{display:'flex',gap:2,mt:8}}>
           
            <Button type='submit'  fullWidth variant="contained"  autoFocus>
              Update
            </Button>
          </Box>
         
        </form>

      </DialogContent>         
            
    </Container>   
  </Navigation>
  );
}



