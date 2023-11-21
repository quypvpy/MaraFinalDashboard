
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import * as yup from "yup";
// import studentApi from "../../../api/studentApi";
import { InputField, Snackbars } from "../../../components";

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import userApi from "../../../api/userApi";
import userRoleApi from "../../../api/userRoleApi";



RegisterPage.propTypes = {
    
};

export function RegisterPage() {

  const[error,setError] = React.useState()
  const[message,setMessage] =React.useState()
  const[id,setIdRole] =React.useState()

  const[isOpenSnackbar,setIsOpenSnackbar] = React.useState(false)


  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Chưa nhập username."),
    phone: yup
        .number()
      .required("Chưa nhập số điện thoại.")
      .typeError('giá trị phải là số'),
    email: yup
      .string()
      .required("Vui lòng nhập email.")
      .email("Email không hợp lệ."),
      idRole: yup
      .string()
      .required("Vui lòng chọn loại tài khoản."),
      
     
  });
  const form = useForm({
    defaultValues: {
      username:'',
      email:'',
      phone:'',
      idRole:'',

    },
    resolver: yupResolver(schema),
  });
  React.useEffect(() => {
    (async () => {
      try {
       const  {data}  = await userRoleApi.getAll();
       setIdRole(data);

      } catch (error) {
        console.log("Fail to fetch to product List", error);
      }

      // setLoading(false);
    })();
  }, []);
  const {formState: { errors }}=form
  
    //  name là tên .. nếu để .thêm meesage thì báo lỗi.. nên tới .name thôi
  const hasError = errors['idRole'];


  const handleSubmits = async (values) => {  
   
      try {
      const  res = await userApi.create(values);
      if(res.check ==false) {
        setIsOpenSnackbar(true)
        setError(res.msg.email[0])      
      }
      else{
        setIsOpenSnackbar(true)
        setMessage(res.msg)
        setError(false)
        form.reset()
      }
    }catch (error) {
      console.log("Fail to fetch to login", error);
    }


    
  };
  const {isSubmitting} =form.formState;

  const CloseSnackbar = ()=>{
    setIsOpenSnackbar(false)
  }
  return (
    
    <Box sx={{width:'30rem',margin:'0 auto',mt:5,textAlign:'center'}}>
        <Box sx={{fontSize:'2.5rem',fontWeight:'Bold',color:'#016A70'}}>MoTech</Box>
        <Box sx={{fontStyle: 'italic'}}>Đăng kí tài khoản</Box>
        {isSubmitting && (<Box sx={{ width: '100%',transform:'translateY(7px)' }}><LinearProgress /></Box>)}
        <form  onSubmit={form.handleSubmit(handleSubmits)}>
  
            <InputField name='username' label="Họ và tên" form={form}></InputField>
            <InputField name='email' label="Email" form={form}></InputField>
            <InputField name='phone' label="Số điện thoại" form={form}></InputField>

            <Controller
              control={form.control}
              name="idRole"
              
              render={({  field: { onChange, onBlur,value }, }) => (
                <FormControl error={!!hasError} fullWidth sx={{mt:2}}>
                  <InputLabel id="demo-simple-select-label">Chọn loại tài khoản</InputLabel>
                  <Select
                    
                    name="idRole"
                    onChange={onChange}
                    onBlur={onBlur}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="Chọn loại tài khoản"
                    
                  >
                    {id && id.map((item)=>(
                      <MenuItem key={item.id} value={item.id}>{item.schedules} {item.name}</MenuItem>
                    ))}
                   
                  </Select>
                  <FormHelperText>{hasError ? hasError.message:''}</FormHelperText>
                </FormControl>
             
              )}
         
            />

            
            <Button type='submit' sx={{mt:6,backgroundColor:'#016A70',":hover":{backgroundColor:'#113946'}}} fullWidth variant="contained"  autoFocus>
                  Đăng kí
            </Button>

            <Divider />
            <Box sx={{mt:3}}>
              <Box component={'span'} sx={{color:'#4F4A45'}}>Nếu bạn đã có tài khoản? </Box>
              <Box component={'span'} sx={{"& a":{color:'black',textDecoration:'none',fontSize:'1.1rem'}}}>
                <Link to='/dang-nhap'>Đăng nhập ngay</Link></Box>
            </Box>
               
         </form>
         

         { error ? (

          <Snackbars type='error' open={isOpenSnackbar} close={CloseSnackbar}
          anchor={{vertical: 'bottom', horizontal: 'right' }} content={error}></Snackbars>
          ) :
          (
          <Snackbars open={isOpenSnackbar} close={CloseSnackbar} type='success'
          anchor={{vertical: 'bottom', horizontal: 'right' }} content={message}></Snackbars>
          )
        }
        
    </Box>
    
  );
}


