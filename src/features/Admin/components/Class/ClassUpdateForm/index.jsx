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
import educationApi from '../../../../../api/educationApi';
import { InputFieldDefault } from '../../../../../components';
import { Navigation } from '../../Navigation';
import { SelectFieldURole } from '../../form-controls';

ClassUpdateForm.propTypes = {
    onSubmit: PropTypes.func,
};

export  function ClassUpdateForm({onSubmit}) {

const location = useLocation();
const params = queryString.parse(location.search).id_course;

const schema = yup.object().shape({
name: yup
    .string()
    .required("Vui lòng nhập tên chương trình dạy."),
    
});

  const form = useForm({
    defaultValues: async () => {
      const response =  await educationApi.get(params)
      return response.data[0]
    },
    resolver: yupResolver(schema),
  });

  const handleSubmits = async (values) => {    
    if (onSubmit) {
      await onSubmit(values);
    }
  };

return (
    <Navigation  >
        {params && (
        <Container>             
        <DialogTitle id="alert-dialog-title">
            {"Cập nhật chương trình dạy?"}
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
