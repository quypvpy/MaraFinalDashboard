import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Container } from '@mui/material';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { InputField } from '../../../../../components';
import { Navigation } from '../../Navigation';


EduCreateForm.propTypes = {
    onSubmit: PropTypes.func,
};

export function EduCreateForm({onSubmit}) {

    const schema = yup.object().shape({
      name: yup
        .string()
        .required("Vui lòng nhập tên chương trình dạy."),
        
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
    };
      
  const resetForm=()=>{
    form.reset()
  }

    return (
        <Navigation>
          
             <Container>             
             <DialogTitle id="alert-dialog-title">
               {"Thêm tài khoản?"}
             </DialogTitle>
             <DialogContent>
     
               <form  onSubmit={form.handleSubmit(handleSubmits)}>
                <InputField name='name' label="name" form={form}></InputField>
                
                        
             
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

