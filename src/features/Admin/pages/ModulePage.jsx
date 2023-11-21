import { Box, Button, Pagination } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import queryString from 'query-string';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navigation } from '../components';

import GridLoader from "react-spinners/GridLoader";
import classApi from '../../../api/classApi';

import ReactQuill, { Quill } from 'react-quill';

// ...............Dialog........................

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import moduleApi from '../../../api/moduleApi';
import { Snackbars } from '../../../components';


ModulePage.propTypes = {
    
};

const modules = {
  toolbar: {
      container: [
          [{ 'header': [1,2,3,4,5,6,false] }, { 'font': [] }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' },
          { 'indent': '-1' }, { 'indent': '+1' }],
         
          ['clean'],
          [{ 'align': [] }],
      ],
      // 'handlers': {
      //    image: imageHandler
      // }
  },
  clipboard: {
      matchVisual: false,
  },
  imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize']
  }
}

export function ModulePage() {

  const[classStudy,setClass]=React.useState()
  const[total,setTotal]=React.useState()
  const[idRowSelect,setIdRowSelrect]=React.useState()
  const[valueSchedule,setValueSchedule]=React.useState()
  const [open, setOpen] = React.useState(false);
  const [openFormCreate, setOpenFormCreate] = React.useState(false);
  const [isShowError, setIsShowError] = React.useState(false);

  let [loading, setLoading] = React.useState(true);
 
  const[valueNameModule,setvalueNameModule] = React.useState()
  const[valueContentModule,setvalueContentModule] = React.useState()
  const[isOpenSnackbar,setIsOpenSnackbar] = React.useState(false)


  const location = useLocation();
  const navigate = useNavigate()
  const queryParams = React.useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      page: Number.parseInt(params.page) || 1,
      limit: Number.parseInt(params.limit) || 2,
      id_course:Number.parseInt(params.id)
    };

  }, [location.search]);
  const [page, setPage] = React.useState(queryParams.page);
 

  React.useEffect(() => {
    (async () => {
      try {
       const { data, total } = await moduleApi.get(queryParams);
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
        setvalueNameModule(element.name)      
        setvalueContentModule(element.content)      
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
  setvalueContentModule('')
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

   } catch (error) {
     console.log("Fail to fetch to product List", error);
   }
}
const SubmitCreate=async ()=>{


  const newValue={
    ...queryParams,
    name:valueNameModule,
    content:valueContentModule,
  }
  try {
    const {data} = await moduleApi.create(newValue);

     setClass(data.data);
     setTotal(data.total);
     setIsOpenSnackbar(true)
     setOpenFormCreate(false)

   } catch (error) {
     console.log("Fail to fetch to product List", error);
   }
}
const submitupdate=async ()=>{


  const newValue={
    ...queryParams,
    name:valueNameModule,
    content:valueContentModule,
    id:idRowSelect
  }

  try {
    const {data} = await moduleApi.update(newValue);

     setClass(data.data);
     setTotal(data.total);
     setIsOpenSnackbar(true)
     setOpen(false)

   } catch (error) {
     console.log("Fail to fetch to product List", error);
   }
}
const CloseSnackbar = ()=>{
  setIsOpenSnackbar(false)
}
const handlevalueNameModule=(name)=>{
  setvalueNameModule(name)
}
const handlevaluecontentModule=(name)=>{
  setvalueContentModule(name)
}
const handleDelete= async(id)=>{
  const newValue={
    ...queryParams,
    id:id
  }

  try {
    const {data} = await moduleApi.delete(newValue);

     setClass(data.data);
     setTotal(data.total);
     setIsOpenSnackbar(true)
     setOpen(false)

   } catch (error) {
     console.log("Fail to fetch to product List", error);
   }
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
                  <TableCell sx={{fontWeight:'Bold'}}>Mã module</TableCell>
                  <TableCell align="left" sx={{fontWeight:'Bold'}}>Tên module</TableCell>
                  {/* <TableCell align="left" sx={{fontWeight:'Bold'}}>Nội dung</TableCell> */}
                  <TableCell align="left" sx={{fontWeight:'Bold'}}>Thời gian tạo</TableCell>
                  <TableCell align="left" sx={{fontWeight:'Bold'}}>Tùy chỉnh</TableCell>
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
                    <TableCell align="left">{row.name}</TableCell>
                    {/* <TableCell align="left">{row.content}</TableCell> */}
                    {/* <TableCell align="left"><p style={{width:'50rem'}} dangerouslySetInnerHTML={{ __html: row.content }}></p></TableCell> */}
                    
                    <TableCell align="left">{new Date(row.created_at).toLocaleString()}</TableCell>
                    <TableCell align="left">
                    <Button sx={{margin:'0 14px',backgroundColor:'#FF9130'}} onClick={()=>handleDelete(row.id)} variant="contained" size="small">Xóa</Button>
                    </TableCell>
                    
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
                <Button onClick={handleClickOpen} variant="contained">Sửa module</Button>
              ):(
                <Button variant="contained" disabled > Sửa module</Button>
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
              sx={{mb:3}}
              autoFocus
              onChange={(e)=>setvalueNameModule(e.target.value)}
              defaultValue={valueNameModule}
              margin="dense"
              id="outlined-basic"
              label="Name"
              type="text"
              variant="outlined"
              fullWidth
              error={isShowError}
              helperText={isShowError ? 'Lịch học đang rỗng.' :''}

            />
            <Box sx={{mb:3,fontWeight:'Bold'}}>Nội dung</Box>
            <ReactQuill
                theme="snow"
                value={valueContentModule}
                modules={modules}
                onChange={(e)=>handlevaluecontentModule(e)}
                style={{
                    height: '250px'
                }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={submitupdate}>Chấp nhận</Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* ......................Dialog Thêm......................... */}
      <div>
        <Dialog open={openFormCreate} onClose={CloseFormCreate} >
          <DialogTitle>Thêm module</DialogTitle>
          <DialogContent>
          <Box sx={{mb:3,mt:3}}><TextField onChange={(e)=>handlevalueNameModule(e.target.value)} id="outlined-basic" fullWidth label="Name" variant="outlined" /></Box>
        
          <Box sx={{mb:3,fontWeight:'Bold'}}>Nội dung</Box>
        <ReactQuill
                theme="snow"
                value={valueContentModule}
                modules={modules}
                onChange={(e)=>handlevaluecontentModule(e)}
                style={{
                    height: '250px'
                }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={CloseFormCreate}>Cancel</Button>
            <Button onClick={SubmitCreate}>Chấp nhận</Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* ......................Dialog End......................... */}

      <Snackbars open={isOpenSnackbar} close={CloseSnackbar} type='success'
          anchor={{vertical: 'bottom', horizontal: 'right' }} content={'thành công.'}></Snackbars>
    </Navigation>
  );
}


