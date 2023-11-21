
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


import { yupResolver } from "@hookform/resolvers/yup";
import { Container } from '@mui/material';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import * as yup from "yup";
import userRoleApi from '../../../../../api/userRoleApi';
import { InputFieldDefault } from '../../../../../components';
import { Navigation } from '../../Navigation';
import { SelectFieldURole } from '../../form-controls';


UserRoleUpdateForm.propTypes = {
    onSubmit: PropTypes.func,
    onClose:PropTypes.func,
};

export function UserRoleUpdateForm({onSubmit}) {
  const location = useLocation();
  const params = queryString.parse(location.search).id;

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Vui lòng nhập tên loại tàn khoản."),
      
  });

  const form = useForm({
    defaultValues: async () => {
      const response =  await userRoleApi.get(params)
      return response.data[0]
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
  
  // const resetForm=()=>{
  //   form.reset()
  // }
  return (
    <Navigation navItems={dataNavTop} >
      {params && (
        <Container>             
        <DialogTitle id="alert-dialog-title">
          {"Cập nhật tài khoản?"}
        </DialogTitle>
        <DialogContent>

          <form  onSubmit={form.handleSubmit(handleSubmits)}>
          <InputFieldDefault name="name" label="name" form={form} ></InputFieldDefault>
          <SelectFieldURole  name="status" label="status" form={form} ></SelectFieldURole>
        
            <Button type='submit'  sx={{mt:6}} fullWidth variant="contained"  autoFocus>
              Cập nhật
            </Button>
                       
          </form>

        </DialogContent>         
              
      </Container>   

      )}
    </Navigation>
    
  );
}


