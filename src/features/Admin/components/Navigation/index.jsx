import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import SchoolIcon from '@mui/icons-material/School';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';

import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setOpen } from '../../AdminSlice';
import { logout } from '../../redux/studentSlice';
Navigation.propTypes = {
  navItems:PropTypes.array,
  children:PropTypes.node,
};

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);



export  function Navigation({children=''}) {
  const theme = useTheme();

  const location = useLocation();
  const  dispatch =useDispatch()
  const navigate =useNavigate()
 const pathnameURL =location.pathname.slice('1');

  const handleDrawerOpen = () => {
    const action =  setOpen(true);
    dispatch(action)
  };

  const handleDrawerClose = () => {
    const action =  setOpen(false);
    dispatch(action)
  };

const resRedux = useSelector((state) => state.course);
const handleLogout = () => {
  const action = logout();
  dispatch(action)
  navigate('/dang-nhap')
 
};


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={ resRedux.open} sx={{backgroundColor:'#016A70','& .MuiToolbar-root': {minHeight:'80px'}}}>
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(resRedux.open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div"
          sx={{ flexGrow: 1,fontSize:'25px', display: { xs: 'none', sm: 'block' },fontFamily:'Poppins, sans-serif' }} 
          >
            Admin
          </Typography>



        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={ resRedux.open}  >
        <DrawerHeader sx={{minHeight:'80px !important',backgroundColor:'#005B41' }}>
          <IconButton sx={{color:'#FFFFFF'}} onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
       
       
       
        <Divider />
        <List >
        
            <ListItem  disablePadding sx={{ display: 'block',backgroundColor:pathnameURL == 'role' && '#EEEDED' }} >
              <Link to={'/role'}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                     <AccountBoxIcon sx={{color:'#016A70'}} /> 
                  </ListItemIcon>
                  <ListItemText primary={'Loại tài khoản'} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </Link>
            </ListItem>
            <Divider sx={{backgroundColor:'#FFFFFF'}} />

            <ListItem  disablePadding sx={{ display: 'block',backgroundColor:pathnameURL == 'user' && '#EEEDED' }} >
              <Link to={'/user'}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                     <AccountBoxIcon sx={{color:'#016A70'}} /> 
                  </ListItemIcon>
                  <ListItemText primary={'Người dùng'} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </Link>
            </ListItem>
            <Divider sx={{backgroundColor:'#FFFFFF'}} />

            <ListItem  disablePadding sx={{ display: 'block',backgroundColor:pathnameURL == 'education' && '#EEEDED' }}>
              <Link to={'/education'}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                     <SchoolIcon sx={{color:'#016A70'}}/> 
                  </ListItemIcon>
                  <ListItemText primary={'Chương trình giáo dục'} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </Link>
            </ListItem>
            <Divider sx={{backgroundColor:'#FFFFFF'}} />

            <ListItem  disablePadding sx={{ display: 'block',backgroundColor:pathnameURL == 'class' && '#EEEDED' }}>
              <Link to={'/class'}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                     <CalendarMonthIcon sx={{color:'#016A70'}}/> 
                  </ListItemIcon>
                  <ListItemText primary={'Lịch học'} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </Link>
            </ListItem>
             <Divider />
            <ListItem  disablePadding sx={{ display: 'block',backgroundColor:pathnameURL == 'courses' && '#EEEDED' }}>
              <Link to={'/courses'}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                     <EditCalendarIcon sx={{color:'#016A70'}}/> 
                  </ListItemIcon>
                  <ListItemText primary={'Môn học'} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </Link>
            </ListItem>
            <Divider />
            

            <ListItem onClick={handleLogout} disablePadding sx={{ display: 'block'}}>
              
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                     <LogoutIcon sx={{color:'#016A70'}}/> 
                  </ListItemIcon>
                  <ListItemText primary={'Logout'} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              
            </ListItem>
            
          
        </List>

      </Drawer>
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}

