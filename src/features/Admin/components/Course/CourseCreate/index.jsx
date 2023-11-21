import queryString from 'query-string';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Snackbars } from '../../../../../components';

import { useSelector } from 'react-redux';
import courseApi from '../../../../../api/CourseApi';
import { CourseCreateForm } from '../CourseCreateForm';


export function CourseCreate() {
const[message,setMessage] =useState()
const[error,setError] =useState()
const[isOpenSnackbar,setIsOpenSnackbar] = useState(false)
const navigate = useNavigate();

const location = useLocation();
const params = queryString.parse(location.search).id;


const resRedux = useSelector((state) => state.course);
console.log('res',resRedux.content);


// Nhớ Quy ước  module0 với content0 là nội dung.. lớn hơn 0 là của bảng module
// và nhớ phải truyền thêm totalModule để pk tổng bao nhiu M để backend xử lí
const handleSubmit =async (values)=>
{
    console.log('vakue',values);

   
  try {
      let res;
      let queryParams={};

      if(params){
           queryParams={
              ...values,
              detail:resRedux.content[0],
              image:'tét',
              // ...tamp,
              totalModule:resRedux.content.length -1 
              // vì có cái của content k tính
          }
          // res = await courseApi.add(queryParams);
      }else{
        if(resRedux.content.length > 1){
          let tamp={}       
    
          for (let index = 1; index < resRedux.content.length; index++) {
            tamp={
              ...tamp,
              [`content${index}`]:resRedux.content[index]
            }            
          }
          queryParams  = {
            ...values,
            ...tamp,
            detail:resRedux.content[0],
            image:resRedux.image[0], 
            totalModule:resRedux.content.length -1,         
          }
          
        }
        else{
            queryParams  ={
              ...values,
              detail:resRedux.content[0],
              image:resRedux.image,
            }
            // console.log('quẻy',queryParams);
        }
        
          // console.log('quểy',queryParams);
          res = await courseApi.add(queryParams);
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
              navigate('/courses');
          },2000)
      }

  } 
  catch (error) {
  console.log("Fail to fetch to product List", error);
  }
        
}

const CloseSnackbar = ()=>{
  setIsOpenSnackbar(false)
}

  return (
    <div>


      <CourseCreateForm onSubmit={handleSubmit}></CourseCreateForm>                   
            
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

