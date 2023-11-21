import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from '@mui/material';
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import { Link, useNavigate } from 'react-router-dom';

import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';
import { InputField, Snackbars } from '../../../components';
import PasswordField from '../../../components/form-controls/PasswordField';
import { login } from '../redux/studentSlice';

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import userRoleApi from '../../../api/userRoleApi';

LoginPage.propTypes = {
    
};

export function LoginPage() {

  const[isOpenSnackbar,setIsOpenSnackbar] = React.useState(false)
  const[id,setIdRole] =React.useState()
  const dispatch = useDispatch();
  // vì  chuyển tran  liền nên k cần mess
  const[error,setError] = React.useState()
  const navigate =useNavigate()

  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Chưa nhập email."),
      // .email("Email không hợp lệ."),
    password: yup
      .string()
      .required("Chưa nhập password."),
    idRole: yup
    .string()
    .required("Vui lòng chọn loại tài khoản."),
     
  });
  const form = useForm({
    defaultValues: {
      username:'',
      password:'',
      idRole:'',

    },
    resolver: yupResolver(schema),
  });
  const handleSubmits = async (values) => {

    console.log('value',values.idRole);
    try {
      const action = login(values)
      const resultAction = await dispatch(action)
      const resUser = unwrapResult(resultAction)

        console.log('un',resUser);

      if(resUser.check == false){
        setIsOpenSnackbar(true)
        if(resUser.msg.username) {       
                setError(resUser.msg.username[0])
        }else setError(resUser.msg)
      }
      if(resUser.check ==true) {
        if(values.idRole == 43){
         navigate('/teacher')
        }else{
          navigate('/role')
        }
            
      }
          
    } catch (error) {
      console.log("Fail to fetch to login", error);
    }
  
    // try {
    //   const  res = await studentApi.checkLogin(values);
    //   if(res.check ==true) {
    //     navigate('/')
    //   }
    //   else{
    //     setIsOpenSnackbar(true)
    //     if(res.msg.username) {       
    //       setError(res.msg.username[0])
    //     }else setError(res.msg)

    //   }
    // }catch (error) {
    //   console.log("Fail to fetch to login", error);
    // }
  };

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

  const {isSubmitting} =form.formState;
  
  const CloseSnackbar = ()=>{
    setIsOpenSnackbar(false)
  }
  return (
    
      <Box sx={{width:'30rem',margin:'0 auto',mt:5,textAlign:'center'}}>
        <Box sx={{fontSize:'2.5rem',fontWeight:'Bold',color:'#016A70'}}>MoTech</Box>
        <Box sx={{fontStyle: 'italic'}}>Đăng nhập hệ thống</Box>
        {isSubmitting && (<Box sx={{ width: '100%',transform:'translateY(7px)' }}><LinearProgress /></Box>)}
        <form  onSubmit={form.handleSubmit(handleSubmits)}>
  
            <InputField name='username' label="Email" form={form}></InputField>
            <PasswordField name='password' label="Password" form={form}></PasswordField>

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
                  Đăng nhập
            </Button>

            <Box sx={{fontStyle: 'italic',m:'20px 0',textAlign:'left'}}>Quên mật  khẩu</Box>
            <Divider />
            <Box sx={{mt:3}}>
              <Box component={'span'} sx={{color:'#4F4A45'}}>Nếu bạn chưa có tài khoản? </Box>
              <Box component={'span'} sx={{"& a":{color:'black'}}}>
                <Link to='/dang-ki'>Đăng kí miễn phí</Link></Box>
            </Box>

            { error ? (

            <Snackbars type='error' open={isOpenSnackbar} close={CloseSnackbar}
            anchor={{vertical: 'bottom', horizontal: 'right' }} content={error}></Snackbars>
            ) :
            (
            <Snackbars open={isOpenSnackbar} close={CloseSnackbar} type='success'
            anchor={{vertical: 'bottom', horizontal: 'right' }} content={''}></Snackbars>
            )
            }
               
            </form>
      </Box>
    
  );
}

