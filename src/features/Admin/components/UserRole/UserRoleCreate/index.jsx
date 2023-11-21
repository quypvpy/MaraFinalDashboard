import  { useState } from 'react';
import PropTypes from 'prop-types';
import { UserRoleCreateForm } from '../UserRoleCreateForm';
import userRoleApi from '../../../../../api/userRoleApi';
import { Snackbars } from '../../../../../components';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { UserRoleUpdateForm } from '../UserRoleUpdateForm';

UserRoleCreate.propTypes = {
    onClose:PropTypes.func,
};

export function UserRoleCreate({onClose}) {
    const[message,setMessage] =useState()
    const[error,setError] =useState()
    const[isOpenSnackbar,setIsOpenSnackbar] = useState(false)
    const navigate = useNavigate();

    const location = useLocation();
    const params = queryString.parse(location.search).id;
    

    const handleSubmit =async (values)=>{
        try {
            let res;
            if(params){
                const queryParams={
                    id:params,
                    name:values.name,
                    status:values.status
                }
                res = await userRoleApi.updateRoleName(queryParams);
            }else{
                const queryParams={
                    id:params,
                    name:values.name,
                }
                res = await userRoleApi.add(queryParams);
            }
            if(res.check ==false) {
                setIsOpenSnackbar(true)
                setError(res.msg.name[0])
            }
            else{
                setError(false)
                setIsOpenSnackbar(true)
                setMessage(res.msg)
                setTimeout(()=>{
                    navigate('/role');
                },2000)
            }
    
        } 
        catch (error) {
        console.log("Fail to fetch to product List", error);
        }

              
    }

    const handleClose = (closeDialog)=>{
        if(!closeDialog) return 
        onClose(closeDialog)
    }
    const CloseSnackbar = ()=>{
        setIsOpenSnackbar(false)
    }
    return (
        <div>
            {params ? (
                 <UserRoleUpdateForm onSubmit={handleSubmit} onClose={handleClose}></UserRoleUpdateForm>  
            ):(
                
                <UserRoleCreateForm onSubmit={handleSubmit} onClose={handleClose}></UserRoleCreateForm>                   
            )}
                  
            { error ? (

                <Snackbars type='error' open={isOpenSnackbar} close={CloseSnackbar}
                anchor={{vertical: 'bottom', horizontal: 'right' }} content={error}></Snackbars>
            ) :
            (
                <Snackbars open={isOpenSnackbar} close={CloseSnackbar} type='success'
                anchor={{vertical: 'bottom', horizontal: 'right' }} content={message}></Snackbars>
            )
            }
        </div>
    );
}
