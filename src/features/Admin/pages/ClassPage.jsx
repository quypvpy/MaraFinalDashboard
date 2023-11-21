import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Navigation } from '../components';
import { Box, Button, Pagination } from '@mui/material';
import {  useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import GridLoader
from "react-spinners/GridLoader";
import classApi from '../../../api/classApi';

// ...............Dialog........................

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ClassCreateForm } from '../components/Class/ClassCreateForm';
import { Snackbars } from '../../../components';


ClassPage.propTypes = {
    
};


export function ClassPage() {

  const[classStudy,setClass]=React.useState()
  const[total,setTotal]=React.useState()
  const[idRowSelect,setIdRowSelrect]=React.useState()
  const[valueSchedule,setValueSchedule]=React.useState()
  const [open, setOpen] = React.useState(false);
  const [openFormCreate, setOpenFormCreate] = React.useState(false);
  const [isShowError, setIsShowError] = React.useState(false);
  const[isOpenSnackbar,setIsOpenSnackbar] = React.useState(false)

  let [loading, setLoading] = React.useState(true);
 


  const location = useLocation();
  const navigate = useNavigate()
  const queryParams = React.useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      page: Number.parseInt(params.page) || 1,
      limit: Number.parseInt(params.limit) || 4,
    };

  }, [location.search]);
  const [page, setPage] = React.useState(queryParams.page);

  React.useEffect(() => {
    (async () => {
      try {
       const { data, total } = await classApi.getAll(queryParams);
        setClass(data);
        setTotal(total);
 
      } catch (error) {
        console.log("Fail to fetch to product List", error);
      }

      setLoading(false);
    })();
  }, [queryParams]);

  const handleClickRow=(id_course)=>{
    setIdRowSelrect(id_course)
  }
  const  handleClickOpen = () => {
    classStudy.forEach(element => {
      if(element.id == idRowSelect){
        setValueSchedule(element.schedules)      
      }
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsShowError(false)
  };
  const handleSubmit = async() => {
    if(!valueSchedule){
      setIsShowError(true)
    }
    else{
      try {
        const newQueryParams ={
          ...queryParams,
          id:idRowSelect,
          schedules:valueSchedule
        }
        
        const  {data}   = await classApi.editSchedule(newQueryParams);
        setClass(data);
        setOpen(false);
       
 
       } catch (error) {
         console.log("Fail to fetch to product List", error);
       }
    }
  };
  
  const handleChangePage= (event, value) => {
    setPage(value);
    const newQueryParams ={
      ...queryParams,
      page:value,
    }
    navigate(`?${queryString.stringify(newQueryParams)}`);

  }

  // .................Form create.............
const OpenFormCreate=()=>{
  setOpenFormCreate(true)
}
const CloseFormCreate=()=>{
  setOpenFormCreate(false)
}
const handleSubmitCreate=async(values)=>{
  const newValue={
    ...queryParams,
    ...values
  }

  try {
    const {data,total} = await classApi.createClass(newValue);

     setClass(data);
     setTotal(total);
     setOpenFormCreate(false)
     setIsOpenSnackbar(true)

   } catch (error) {
     console.log("Fail to fetch to product List", error);
   }
}
const CloseSnackbar = ()=>{
  setIsOpenSnackbar(false)
}
  return (
    <Navigation>

      {loading ? (
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}} >
          <GridLoader size={20} color="#36d7b7" />
        </Box>
      ):
      (
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{fontWeight:'Bold'}}>Mã lớp</TableCell>
                  <TableCell align="left" sx={{fontWeight:'Bold'}}>Môn học</TableCell>
                  <TableCell align="left" sx={{fontWeight:'Bold'}}>Tên giảng viên</TableCell>
                  <TableCell align="left" sx={{fontWeight:'Bold'}}>Lịch dạy</TableCell>
                  <TableCell align="left" sx={{fontWeight:'Bold'}}>Thời gian mở lớp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { classStudy && classStudy.map((row) => (
                  <TableRow
                    onClick={()=>handleClickRow(row.id)}
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } ,cursor:'pointer',
                    //  '&:hover': { backgroundColor: 'none',cursor:'pointer' },
                    backgroundColor: idRowSelect == row.id ? '#CDF5FD' : 'none'
                    }}
                  >
                    <TableCell component="th" scope="row"> {row.id} </TableCell>                   
                    <TableCell align="left">{row.name_course}</TableCell>
                    <TableCell align="left">{row.name_teacher}</TableCell>
                    <TableCell align="left"> {row.schedules}   </TableCell>
                    <TableCell align="left">{row.created_at}</TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {total && queryParams.limit && (
            <Box sx={{mt:3}}>
                <Pagination page={page} onChange={handleChangePage} count={Math.ceil(total / queryParams.limit)} color="secondary" />
            </Box>
          )}

          <Box sx={{mt:3}}>
         
            <Button sx={{mr:3}} variant="contained" onClick={OpenFormCreate} >Thêm</Button>
            
            {idRowSelect ? (            
                <Button onClick={handleClickOpen} variant="contained">Sửa lịch dạy</Button>
              ):(
                <Button variant="contained" disabled > Sửa lịch dạy</Button>
              )}
            
          </Box>

        </Box>
      )
      }
      {/* ......................Dialog Sửa......................... */}
      <div>
        <Dialog open={open} onClose={handleClose} >
          <DialogTitle>Sửa lịch dạy</DialogTitle>
          <DialogContent>
            <TextField
              sx={{width:'30rem'}}
              autoFocus
              onChange={(e)=>setValueSchedule(e.target.value)}
              defaultValue={valueSchedule}
              margin="dense"
              id="name"
              label="Schedule"
              type="text"
              variant="standard"
              error={isShowError}
              helperText={isShowError ? 'Lịch học đang rỗng.' :''}

            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Chấp nhận</Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* ......................Dialog Thêm......................... */}
      <div>
        <Dialog open={openFormCreate} onClose={CloseFormCreate} >
          <DialogTitle>Thêm lịch dạy</DialogTitle>
          <DialogContent>
            <ClassCreateForm onSubmit={handleSubmitCreate}></ClassCreateForm>
          </DialogContent>
          {/* <DialogActions>
            <Button onClick={CloseFormCreate}>Cancel</Button>
            <Button onClick={CloseFormCreate}>Chấp nhận</Button>
          </DialogActions> */}
        </Dialog>
      </div>
      {/* ......................Dialog End......................... */}

      <Snackbars open={isOpenSnackbar} close={CloseSnackbar} type='success'
          anchor={{vertical: 'bottom', horizontal: 'right' }} content={'thành công.'}></Snackbars>
    </Navigation>
  );
}

