import * as React from 'react';
import { Box, Button } from "@mui/material";
import { Navigation } from "../components";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";


import { DataGrid } from '@mui/x-data-grid';
import { Snackbars } from '../../../components/Snackbar';
import { UserRoleCreate, UserRoleDialog, UserRoleDialogError } from '../components/UserRole';
import Dialog from '@mui/material/Dialog';
import educationApi from '../../../api/educationApi';


EduPage.propTypes = {
    
};

const columns = [
    { field: 'id', headerName: 'ID', width: 260, },
    { field: 'name', headerName: 'Name', width: 260 },
    { field: 'status', headerName: 'Trạng Thái', width: 260, type: 'singleSelect',valueOptions: ['Khóa', 'Mở'], },
    { field: 'datetime', headerName: 'Ngày tạo', width: 260 },

  ];

export function EduPage(props) {
  const [userRole, setUserRole] = useState([]);
  const [totalPage, setTotalPage] = useState();

  // ..........................Edit start.........................
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [valueEditTable, setValueEditTable] = useState();
  const [rowEdit, setRowEdit] = useState();

  const[idRowSelect,setIdRowSelect] =useState()

  const [dataStatus,setDataStatus]=useState([]);
  const [loading,setLoading]=useState(false);
  const [modeEdit,setmodeEdit]=useState(false);
  const [modeURoleDlog,setModeURoleDlog]=useState(false);


  const [message, setMessage] = useState('Cập nhật thành công.');
  const [type, setType] = useState('success');

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
  }, [location.search]);


  useEffect(() => {

      (async () => {
        try {
          const {data,total}  = await educationApi.getAll(queryParams);
          setUserRole(data);
          setTotalPage(total);
          let tamp =[];
          data.forEach(item => {
            tamp.push({ id:item.id, name: item.name,status:item.status==1 ? 'Đang mở' : 'Đã khóa', datetime:new Date(item.created_at).toLocaleString() })
          })
          setDataStatus(tamp)
    
  
        } catch (error) {
          console.log("Fail to fetch to product List", error);
        }
  
        // setLoading(false);
      })();
    }, [queryParams,modeEdit]);

    const handleOpenFormUserRole=()=>{
      setOpenFormUserRole(true)
    }
    const handleCloseFormUserRole=()=>{
      setOpenFormUserRole(false)
    }
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
                // {data,total}
                const res  = await educationApi.updateEduName({
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
                const {data,total}=await educationApi.updateEduStatus({
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
    setLoading(false)
  }
}

const dataNavTop = [
  {name:'Thêm', url:'createEducation'},
  {name:'Sửa', url:'updateEducation'},
  {name:'Xóa', url:'deleteEducation'},
];

const handleRowClick=(e)=>{
  setIdRowSelect(e.id)
}
const CloseSnackbar = ()=>{
  setLoading(false)
}

const switchURoleDlogErr=(Switch)=>{
  if(Switch) setModeURoleDlog(false)
}

const handleDelete=(id)=>{
  (async () => {
    try {
     const res  = await educationApi.remove({
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

    return (

        // navItems thanh menu điều hướng
        <Navigation navItems={dataNavTop}>            
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
            <Link to='/createEdu'>
              <Button variant="contained" >
                Thêm
              </Button>
            </Link>
            {idRowSelect ? (
              <Box>
                <Link to={`/updateEdu?id=${idRowSelect}`} >
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
          
      );
}

