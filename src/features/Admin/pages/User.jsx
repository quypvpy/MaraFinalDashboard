
import { Box, Button, TextField } from "@mui/material";
import queryString from "query-string";
import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import userRoleApi from "../../../api/userRoleApi";
import { Navigation } from "../components";

import { DataGrid } from '@mui/x-data-grid';
import { Snackbars } from '../../../components/Snackbar';
import { UserRoleCreate, UserRoleDialog, UserRoleDialogError } from '../components/UserRole';
// import { Snackbars } from '../../../components/Snackbar';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import userApi from '../../../api/userApi';



import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



// UserRole.propTypes = {
    
// };

// editable: true
const columns = [
  { field: 'id', headerName: 'ID', width: 100, },
  { field: 'name', headerName: 'Name', width: 300 },
  { field: 'role', headerName: 'Role', width: 200 },
  { field: 'status', headerName: 'Trạng Thái', width: 200, type: 'singleSelect',valueOptions: ['Khóa', 'Mở'], },
  { field: 'datetime', headerName: 'Ngày tạo', width: 200 },
];

const tamp ={
  'Giảng Viên':43,
  'Admin':5,
}
const tampStatus ={
  'Đang mở':1,
  'Đã khóa':0,
}



export function User() {
  
  const [userRole, setUserRole] = useState();
  // const [totalPage, setTotalPage] = useState();
  const navigate =useNavigate()

  // ..........................Edit start.........................
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [valueEditTable, setValueEditTable] = useState();
  const [rowEdit, setRowEdit] = useState();

  const [message, setMessage] = useState('Cập nhật thành công.');
  const [type, setType] = useState('success');

  const [dataStatus,setDataStatus]=useState([]);
  const [loading,setLoading]=useState(false);
  const [modeEdit,setmodeEdit]=useState(false);
  const [modeURoleDlog,setModeURoleDlog]=useState(false);
// ..........................Edit end.........................

const [open, setOpen] = React.useState(false);

const [role, setRole] = React.useState('');
const [selectRole, setSelectRole] = React.useState();



const[idRowSelect,setIdRowSelect] =useState()
const[username,setUsername] =useState()
const[status,setStatus] =useState()


// ..........................create start.........................

const [openFormUserRole, setOpenFormUserRole] = React.useState(false);

  let tableRef=useRef()

  const location = useLocation();

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      page: Number.parseInt(params.page) || 1,
      limit: Number.parseInt(params.limit) || 9,
    };
    // true => 'true'
    // {isPromotion: 'true'}
  }, [location.search]);

 
  useEffect(() => {
    (async () => {
      try {
        const {data}  = await userApi.getAllUser();
       
        setUserRole(data);
        // setTotalPage(total);

        // const day= new Date(data[0].created_at)
        
        // let tamp =[];
       
        // data.forEach(item => {
        //   tamp.push({ id:item.id, name: item.name,role:item.idRole==43 ? 'Giảng Viên' : 'Admin', 
        //   status:item.status==1 ? 'Đang mở' : 'Đã khóa', 
        //   datetime:  new Date(item.created_at).toLocaleString() })
        //   // tamp.push({ id:item.id, name: item.name, status, datetime: item.created_at })
        // })
      
        // setDataStatus(tamp)
 

      } catch (error) {
        console.log("Fail to fetch to product List", error);
      }

      // setLoading(false);
    })();
  }, [queryParams,modeEdit]);

useEffect(()=>{
   let tamp =[];
       
    if(userRole){
      userRole.forEach(item => {
        tamp.push({ id:item.id, name: item.name,role:item.idRole==43 ? 'Giảng Viên' : 'Admin', 
        status:item.status==1 ? 'Đang mở' : 'Đã khóa', 
        datetime:  new Date(item.created_at).toLocaleString() })
      })
    
      setDataStatus(tamp)
    }
  
},[userRole])

  // ..........................Edit start.........................
const Edit=(params)=>{

  const value_old = params.formattedValue
  let value=''
  if(tableRef.current){
  // Lấy thông tin của ô đang thay đổi.
  let data_id =tableRef.current.querySelector(`div[data-id="${params.id}"]`)
  if(params.field == "status"){
     value =data_id.querySelector('.MuiSelect-nativeInput').value
  }else if(params.field =='name'){
    let tamp =data_id.querySelector('.MuiDataGrid-editInputCell')
    value =tamp.querySelector(`.MuiInputBase-input`).value.trim()
  }
  
  if(value_old != value && value.length > 0){

      setValueEditTable(value)
      setRowEdit(params)
      setIsShowDialog(true)
  }
  if(value.length == 0){
    setModeURoleDlog(true);
    setmodeEdit(modeEdit==true ? false : true);
  }

  }
}
const handleSwitchModel=(Switch)=>{
  if(Switch){
    setIsShowDialog(false )
    if(rowEdit.field == 'name'){
      (async () => {
               try {
                const res  = await userRoleApi.updateRoleName({
                  id:rowEdit.id,
                  name:valueEditTable
                 });
                 setUserRole(res.data);
                setTotalPage(res.total);
                setmodeEdit(modeEdit==true ? false : true);
                if(res.check ==false){
                  setType('error');
                  setMessage('Tên đã tồn tại.')
                }else{
                  setType('success');
                  setMessage('Cập nhật thành công.')
                }
                 setLoading(true)
  
               } catch (error) {
                 console.log("Fail to fetch to product List", error);
               }
           
        })();
    }
    if(rowEdit.field == 'status'){
      // 0 là khóa 1 là mở.. tìm vị trí nó ra
      const index = columns['2'].valueOptions.findIndex((item)=>{return item == valueEditTable });

      (async () => {
               try {
                const {data,total}=await userRoleApi.updateRoleStatus({
                  id:rowEdit.id,
                  status:index
                 });

                 setUserRole(data);
                 setTotalPage(total);
                 setmodeEdit(modeEdit==true ? false : true);
                 setType('success');
                 setMessage('Cập nhật thành công.')
                 setLoading(true)
  
               } catch (error) {
                 console.log("Fail to fetch to product List", error);
               }
           
        })();
    }

  }
}

const switchURoleDlogErr=(Switch)=>{
  if(Switch) setModeURoleDlog(false)
}
const handleRowClick=(e)=>{
  setIdRowSelect(e.id)
  setUsername(e.row.name)
  // setUserSelect(e.row)
  setRole(tamp[e.row.role])
  setStatus(tampStatus[e.row.status])
}

  // ..........................Edit end.........................

  // ..........................create start.........................
  const handleOpenFormUserRole=()=>{
    setOpenFormUserRole(true)
  }
  const handleCloseFormUserRole=()=>{
    setOpenFormUserRole(false)
  }

  const  user = JSON.parse(localStorage.getItem('user'));
  if(!user || user.idRole != 5 ){
   navigate('/dang-nhap')
  }

  const handleDelete=(id)=>{

    (async () => {
      try {
       const res  = await userApi.remove({
        id:id,      
        });
        setUserRole(res.data.data);
      //  setTotalPage(res.data.total);
       if(res.check == false){
        setType('error');
       setMessage('Có tồn tại user trong lịch dạy.')
       }
       else{
        setType('success');
       setMessage('Đã xóa thành công.')
       }
        setLoading(true)
      } catch (error) {
        console.log("Fail to fetch to product List", error);
      }
  
    })();
  }
  const CloseSnackbar = ()=>{
    setLoading(false)
  }
  const setUserValueName = (value)=>{
    setUsername(value)
  }


  const handleUpdate = (id) => {
    (async () => {
      try {
       const { data } = await userRoleApi.getAll();
       setSelectRole(data);
       setOpen(true);
       
      } catch (error) {
        console.log("Fail to fetch to product List", error);
      }
    })();
    
   
  };

  const handleClose = () => {

    setOpen(false);
  };
  const handleSubmit = () => {
    if(username){

      (async () => {
        try {
         const { data } = await userApi.update({
          id:idRowSelect,
          name:username,
          idRole:role,
          status,
         });
         setUserRole(data.data);
         setOpen(false)
         setLoading(true)
         setType('success');
         setMessage('Cập nhật thành công.')
  
        } catch (error) {
          console.log("Fail to fetch to product List", error);
        }
      })();
      

      // setOpen(false);
    }
  };
  const handleChange = (event) => {
    setRole(event.target.value);
  };
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  return (
    <Box>
      {user && user.idRole == 5 && (
         <Navigation >
      
          
         <div style={{ height: 400, width: '100%' }}>
           <DataGrid       
             ref={tableRef}
             rows={dataStatus}
             columns={columns}
             initialState={{
               pagination: {
                 paginationModel: { page: 0, pageSize: 5 },
               },
             }}
             pageSizeOptions={[5, 10]}
             onCellEditStop={(params)=>Edit(params)}
             onCellClick={(e)=>{handleRowClick(e)}}
   
           />
         </div>
   
         {
           isShowDialog && 
             <UserRoleDialog onClick={handleSwitchModel}>
             </UserRoleDialog>
         }
   
         { loading &&  
               <Snackbars open={loading} close={CloseSnackbar} type={type} anchor={{vertical: 'bottom', horizontal: 'right' }} content={message}></Snackbars>
         }
   
         {modeURoleDlog && <UserRoleDialogError onClick={switchURoleDlogErr}></UserRoleDialogError>}
         
   
   
       <Box sx={{mt:3, display:'flex',alignItems:'center',justifyContent:'left',gap:2}}>
         
         {idRowSelect ? (
          <Box>
            <Button onClick={()=>handleUpdate(idRowSelect)} variant="contained"> Sửa</Button>
           <Button onClick={()=>handleDelete(idRowSelect)}  sx={{ml:2,bgcolor: 'error.main'}} variant="contained" >
               Xóa
            </Button>
          </Box>
           ):(
            <Box>
             <Button variant="contained" disabled > Sửa</Button>
             <Button sx={{ml:2,bgcolor: 'error.main'}} disabled variant="contained" >Xóa</Button>
            </Box>
           )}

        
         
       </Box>
         
   
         <Dialog
           open={openFormUserRole}
           onClose={handleCloseFormUserRole}
           aria-labelledby="alert-dialog-title"
           aria-describedby="alert-dialog-description"
         >
            <UserRoleCreate onClose={handleCloseFormUserRole}></UserRoleCreate>
         </Dialog>

        
        {/* Dialog sửa */}
        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Update người dùng?"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText> */}

          {selectRole && (
            <TextField
            autoFocus
            sx={{mb:3,width:'30rem'}}
            margin="dense"
            id="name"
            label="Name"
            value={username}
            onChange={(e)=>setUserValueName(e.target.value)}
            type="text"
            fullWidth
            variant="standard"
            error={username === ''}
            helperText={username==='' ? 'Dữ liệu không được rỗng.':''}
          />
            )} 
          { selectRole && (
            <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" htmlFor="uncontrolled-native">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Role"
                onChange={handleChange}
                
              >
                { selectRole && selectRole.map((item)=>(
                  <MenuItem  key={item.id} value={item.id}>{item.name}</MenuItem>
                ))}
                
              </Select>
              
            </FormControl>
            <FormControl fullWidth sx={{mt:3}}>
              <InputLabel id="demo-simple-select-label" htmlFor="uncontrolled-native">status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="status"
                onChange={handleChangeStatus}
                
              >       
                  <MenuItem  key={0} value={0}>Khóa</MenuItem>             
                  <MenuItem  key={1} value={1}>Mở</MenuItem>             
                
              </Select>
              
            </FormControl>
          </Box>
          )}
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleSubmit}>Agree</Button>
        </DialogActions>
      </Dialog>
   
       </Navigation>
      )}

    </Box>

   
   
      
  );
}

