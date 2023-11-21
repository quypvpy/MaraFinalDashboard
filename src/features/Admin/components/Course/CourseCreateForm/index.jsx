import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Container } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { DragFiles, InputField, QillEditor } from '../../../../../components';
import { Navigation } from '../../Navigation';
import { SelectFieldCourse } from '../../form-controls';

CourseCreateForm.propTypes = {
  onSubmit: PropTypes.func,
};

export function CourseCreateForm({onSubmit}) {
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
      name:'',
      summary:'',
      price:'',
      discount:0,
      // duration:'',
      id_courseCate:3,
      // module:'',
    },
    resolver: yupResolver(schema),
  });
  


  const handleSubmits = async (values) => {    
    if (onSubmit) {
      await onSubmit(values);
    }
  };
    

const increaseModule=()=>{
  setTotalModule(totalModule +  1);
}
const decreaseModule=()=>{
  setTotalModule(totalModule -  1);
}

  return (
    <Navigation>
          
      <Container>             
      <DialogTitle id="alert-dialog-title">
        {"Thêm khóa học ?"}
      </DialogTitle>
      <DialogContent>

        <form encType='multipart/form-data' onSubmit={form.handleSubmit(handleSubmits)}>
         
          
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

          <Box>
            <DragFiles></DragFiles>
          </Box>
          {/* Quy  ước  =0 .là content ..còn  lại là module */}
          <Box component={'p'} sx={{mb:2,fontWeight: 'bold'}}>Nội dung khóa học</Box>
          <QillEditor number={0}></QillEditor>

          {Array(totalModule).fill(totalModule).map((item,index)=>(
            <Box key={index}   sx={{mt:10}}>
              <InputField  name={`module${index+1}`} label={`Tên module ${index+1}`} form={form}></InputField>
              
                <Box component={'p'} sx={{mb:2,fontWeight: 'bold'}}>Nội dung module {index+1}</Box>
                <QillEditor number={index+1}></QillEditor>
              
            </Box>
          ))}
         
      
          <Box sx={{display:'flex',gap:2,mt:8}}>
            <Button  onClick={increaseModule} sx={{width:'20rem'}}  variant="contained"  autoFocus>
              Thêm module
            </Button>
            <Button onClick={decreaseModule} sx={{width:'20rem'}}  variant="contained"  autoFocus>
              Xóa module
            </Button>
            <Button type='submit'  fullWidth variant="contained"  autoFocus>
              Create
            </Button>
          </Box>
         
        </form>

      </DialogContent>         
            
    </Container>   
  </Navigation>
  );
}

