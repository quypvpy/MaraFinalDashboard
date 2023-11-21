

import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';


import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Container } from '@mui/material';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import * as yup from "yup";
import userRoleApi from '../../../../../api/userRoleApi';
import { InputField } from '../../../../../components';
import { Navigation } from '../../Navigation';




UserRoleCreateForm.propTypes = {
    onSubmit: PropTypes.func,
    onClose:PropTypes.func,
};



export function UserRoleCreateForm({onSubmit,onClose}) {
  const [dataRole,setDataRole]= React.useState()
  const location = useLocation();
  const params = queryString.parse(location.search).id;



  const handleClose = () => {
      if(!onClose) return
      onClose(true)
  };

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Vui lòng nhập tên loại tàn khoản."),
      
  });

  React.useEffect(()=>{
    if(params){
      ( async() => {
        try {
          const res = await userRoleApi.get(params);
          console.log('res',res);
          setDataRole(res.data[0].name) 
        } 
        catch (error) {
        console.log("Fail to fetch to product List", error);
        }
      })();

    }
  },[])

const handle=()=>{
  setDataRole(true)
}


  const form2 = useForm({
    defaultValues: async () => {
      const response =  await userRoleApi.get(6)
      console.log('res',response);
      return response.data[0]
    },
    resolver: yupResolver(schema),
  });
  const form = useForm({
    defaultValues: {
      name:'',
      status:'1'
    },
    resolver: yupResolver(schema),
  });
 

  const handleSubmits = async (values) => {    
    if (onSubmit) {
      await onSubmit(values);
    }
    // them await để bắt nó đợi..xong mới tính là hết submitting

    // form.reset();
  };
    
  const dataNavTop = [
    {name:'Thêm', url:'createUserRole'},
    {name:'Sửa', url:'updateUserRole'},
    {name:'Xóa', url:'deleteUserRole'},
  ];
  
const resetForm=()=>{
  form.reset()
}
  return (
    <Navigation navItems={dataNavTop} >
      
         <Container>             
         <DialogTitle id="alert-dialog-title">
           {"Thêm tài khoản?"}
         </DialogTitle>
         <DialogContent>
 
          
           <form  onSubmit={form.handleSubmit(handleSubmits)}>
            <InputField name='name' label="name" form={form}></InputField>        
            {/* <SelectFieldURole name="status" label="status" form={form} ></SelectFieldURole> */}
         
             <Box sx={{display:'flex',gap:2}}>
                <Button onClick={resetForm} sx={{mt:6}} fullWidth variant="contained"  autoFocus>
                 reset
               </Button>
               <Button type='submit'  sx={{mt:6}} fullWidth variant="contained"  autoFocus>
                 Create
               </Button>
               
             </Box>
           </form>
 
         </DialogContent>         
               
       </Container>   
    </Navigation>
    
  );
}


