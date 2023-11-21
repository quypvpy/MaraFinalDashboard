import { Box, Button, Pagination } from '@mui/material';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import queryString from 'query-string';
import * as React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import courseApi from '../../../api/CourseApi';
import { Navigation } from '../components';



import GridLoader from "react-spinners/GridLoader";
import { Snackbars } from '../../../components';



// form dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

CoursePage.propTypes = {
    
};


export function CoursePage() {

  const[course,setCourse]=React.useState()
  const[total,setTotal]=React.useState()
  const[limit,setLimit]=React.useState()
  const[idRowSelect,setIdRowSelrect]=React.useState()
  const [open, setOpen] = React.useState(false);


  let [loading, setLoading] = React.useState(true);
  let [isShowSnackBar, setIsShowSnackbar] = React.useState(false);
 


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
       const { data, total,per_page } = await courseApi.getAll(queryParams);
        setCourse(data);
        setTotal(total);
        setLimit(per_page);

      } catch (error) {
        console.log("Fail to fetch to product List", error);
      }

      setLoading(false);
    })();
  }, [queryParams]);

  const handleClickRow=(id)=>{
    setIdRowSelrect(id)
  }
  const handleChangePage= (event, value) => {
    setPage(value);
    const newQueryParams ={
      ...queryParams,
      page:value,
    }
    navigate(`?${queryString.stringify(newQueryParams)}`);

  }

  const  handleChange =async (id)=>{
    // courseStatus
    
    try {
      // const { data, total,per_page } = await courseApi.updateStatus({id:id});
      const { data } = await courseApi.updateStatus({...queryParams,id:id});

       setCourse(data.data);
       setTotal(data.total);
       setLimit(data.per_page);
       setIsShowSnackbar(true);

     } catch (error) {
       console.log("Fail to fetch to product List", error);
     }
  }
  const  handleChangeUpdate = (id)=>{
    navigate(`/updateCourse?id=${id}`)
  }
  const  handleClickModule = async(id)=>{
    navigate(`/module?id=${id}`)
    

  }
  const CloseSnackbar = ()=>{
    setIsShowSnackbar(false)
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
                  <TableCell  sx={{fontWeight:'Bold'}}>STT</TableCell>
                  <TableCell  sx={{fontWeight:'Bold'}}>Tên</TableCell>
                  <TableCell sx={{fontWeight:'Bold'}} align="right">Trạng thái</TableCell>
                  <TableCell sx={{fontWeight:'Bold'}} align="right">Đổi status</TableCell>
                  <TableCell sx={{fontWeight:'Bold'}} align="center">Tùy chỉnh</TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                { course && course.map((row,index) => (
                  <TableRow
                    onClick={()=>handleClickRow(row.id)}
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } ,cursor:'pointer',
                    //  '&:hover': { backgroundColor: 'none',cursor:'pointer' },
                    backgroundColor: idRowSelect == row.id ? '#CDF5FD' : 'none'
                    }}
                  >
                    <TableCell align="left">{index +  1}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    {row.status ==1 ? (
                      <TableCell align="right">Đang mở</TableCell>
                    ):(
                      <TableCell align="right">Đã khóa</TableCell>
                    )}
                    
                    
                    <TableCell align="right">
                      <Switch
                        checked={row.status ==1 ? true : false}
                        onChange={()=>handleChange(row.id)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      
                      <Button sx={{margin:'0 14px',backgroundColor:'#FF9130'}} onClick={()=>handleChangeUpdate(row.id)} variant="contained" size="small">Sửa</Button>
                      <Button sx={{backgroundColor:'#4F6F52'}} onClick={()=>handleClickModule(row.id)} variant="contained" size="small">Module</Button>
                      
                    </TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {total && limit && (
            <Box sx={{mt:3}}>
                <Pagination page={page} onChange={handleChangePage} count={Math.ceil(total / limit)} color="secondary" />
            </Box>
          )}

          <Box sx={{mt:3}}>
            <Link to='/createCourse'>
              <Button sx={{mr:3}} variant="contained" >
                Thêm
              </Button>
            </Link>
            {idRowSelect ? (
              <Link to={`/updateCourse?id=${idRowSelect}`} >
                <Button sx={{backgroundColor:'#FF9130'}} variant="contained">
                  Sửa
                </Button>
              </Link>
              ):(
                <Button variant="contained" disabled >
                  Sửa
                </Button>
              )}
          </Box>

          { isShowSnackBar &&  
                <Snackbars open={isShowSnackBar} close={CloseSnackbar} anchor={{vertical: 'bottom', horizontal: 'right' }} content='Cập nhật thành công'></Snackbars>
          }

          {/* Dialog Module */}

          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Use Google's location service?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Let Google help apps determine location. This means sending anonymous
                location data to Google, even when no apps are running.
              </DialogContentText>
              
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={handleClose}>Agree</Button>
            </DialogActions>
          </Dialog>

        
        </Box>

        
      )
      }
    </Navigation>
  );
}

