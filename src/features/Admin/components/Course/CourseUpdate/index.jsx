import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Snackbars } from '../../../../../components';

import { useSelector } from 'react-redux';
import courseApi from '../../../../../api/CourseApi';
import { CourseUpdateForm } from '../CourseUpdateForm';
import GridLoader from "react-spinners/GridLoader";
import { Box } from '@mui/material';

export function CourseUpdate() {
const[message,setMessage] =useState()
const[error,setError] =useState()
const[loading,setLoading] =useState(true)
const[isOpenSnackbar,setIsOpenSnackbar] = useState(false)
const[course,setCourse] = useState()
const navigate = useNavigate();

const location = useLocation();
const params = queryString.parse(location.search).id;


useEffect(() => {
  (async () => {
    try {
     const  {data}  = await courseApi.get(params);
     setCourse(data);

    } catch (error) {
      console.log("Fail to fetch to product List", error);
    }

    setLoading(false);
  })();
}, [params]);


const resRedux = useSelector((state) => state.course);


// Nhớ Quy ước  module0 với content0 là nội dung.. lớn hơn 0 là của bảng module
// và nhớ phải truyền thêm totalModule để pk tổng bao nhiu M để backend xử lí
const handleSubmit =async (values)=>
{
    
    const newValues ={
      ...values,
      id:params,
      detail:resRedux.content[0] ?  resRedux.content[0] : course[0].detail
    }
    try {
      const  data  = await courseApi.updateCourse(newValues);

      if(data.check ==false) {
        setIsOpenSnackbar(true)
        setError(data.msg.name[0])
      }
      else{
        setError(false)
        setIsOpenSnackbar(true)
        setMessage(data.msg)
        setTimeout(()=>{
            navigate('/courses');
        },2000)
            }
     } catch (error) {
       console.log("Fail to fetch to product List", error);
     }
  
        
}

const CloseSnackbar = ()=>{
  setIsOpenSnackbar(false)
}

  return (
   
    <div>
      
      {loading ? (
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}} >
          <GridLoader size={20} color="#36d7b7" />
        </Box>
      ):(
        course  && course.length >0 && (
          <CourseUpdateForm course={course} onSubmit={handleSubmit} ></CourseUpdateForm> 
        )
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

