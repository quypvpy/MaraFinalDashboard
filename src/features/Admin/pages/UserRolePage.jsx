
import { Box, Button } from "@mui/material";
import queryString from "query-string";
import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import userRoleApi from "../../../api/userRoleApi";
import { Navigation } from "../components";

import { DataGrid } from '@mui/x-data-grid';
import { Snackbars } from '../../../components/Snackbar';
import { UserRoleCreate, UserRoleDialog, UserRoleDialogError } from '../components/UserRole';


import Dialog from '@mui/material/Dialog';



const columns = [
  { field: 'id', headerName: 'ID', width: 260, },
  { field: 'name', headerName: 'Name', width: 260},
  // { field: 'status', headerName: 'Trạng Thái', width: 130,editable: true },
  { field: 'status', headerName: 'Trạng Thái', width: 260, type: 'singleSelect',valueOptions: ['Khóa', 'Mở'], },
  { field: 'datetime', headerName: 'Ngày tạo', width: 260 },
  // {
  //   field: 'age',
  //   headerName: 'Age',
  //   type: 'number',
  //   width: 90,
  // },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];
// const columns = [
//   { field: 'id', headerName: 'ID', width: 70 },
//   { field: 'firstName', headerName: 'First name',editable: true, width: 130 },
//   { field: 'lastName', headerName: 'Last name',editable: true, width: 130 },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     editable: true,
//     width: 90,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
// ];




export function UserRolePage() {
  
  const [userRole, setUserRole] = useState();
  const [totalPage, setTotalPage] = useState();
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

const[idRowSelect,setIdRowSelect] =useState()

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
        const {data,total}  = await userRoleApi.getAll();
       
        setUserRole(data);
        setTotalPage(total);
        // const day= new Date(data[0].created_at)
        
        let tamp =[];
       
        data.forEach(item => {
          tamp.push({ id:item.id, name: item.name,status:item.status==1 ? 'Đang mở' : 'Đã khóa', datetime:  new Date(item.created_at).toLocaleString() })
          // tamp.push({ id:item.id, name: item.name, status, datetime: item.created_at })
        })
      
        setDataStatus(tamp)
 

      } catch (error) {
        console.log("Fail to fetch to product List", error);
      }

      // setLoading(false);
    })();
  }, [queryParams,modeEdit]);



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
  // console.log('tmp',tamp);
  // let value =tamp.querySelector(`.MuiInputBase-input`).value.trim()
  // let tamp =data_id.querySelector('.MuiDataGrid-editInputCell')
  // let value =tamp.querySelector(`.MuiInputBase-input`).value.trim()
  
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
       const res  = await userRoleApi.remove({
        id:id,      
        });
        setUserRole(res.data);
       setTotalPage(res.total);
       setmodeEdit(modeEdit==true ? false : true);
       if(res.check == false){
        setType('error');
       setMessage('Có tồn tại chương trình trong loại.')
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
         <Link to='/createUserRole'>
           <Button variant="contained" >
             Thêm
           </Button>
         </Link>
         
         {idRowSelect ? (
          <Box>
           <Link to={`/updateUserRole?id=${idRowSelect}`} >
             <Button variant="contained">
               Sửa
             </Button>
           </Link>
           <Button onClick={()=>handleDelete(idRowSelect)}  sx={{ml:2,bgcolor: 'error.main'}} variant="contained" >
               Xóa
             </Button>
           </Box>
           ):(
            <Box>
             <Button variant="contained" disabled >
               Sửa
             </Button>
             <Button sx={{ml:2,bgcolor: 'error.main'}} disabled variant="contained" >
               Xóa
             </Button>
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
   
       </Navigation>
      )}

    </Box>

   
   
      
  );
}

