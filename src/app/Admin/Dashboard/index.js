import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'

import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import UploadImage from '../UploadImage'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonIcon from '@mui/icons-material/Person'
import AddFrontpage from '../AddFrontpage'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Category from '../Category'
import Criteria from '../Criteria'
import AddMemberShip from '../AddMemberShip'
import FrequencyManagement from '../FrequencyManagement'
import Slider from '../../component/Slider'
import { Collapse } from '@mui/material'
import './style.scss'
import CategoryIcon from '@mui/icons-material/Category'
import Features from '../Features'
import Frequency from '../Frequency'
import DomainIcon from '@mui/icons-material/Domain'
import DesignServicesIcon from '@mui/icons-material/DesignServices'

const drawerWidth = 270

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(8)} + 1px)`,
  // [theme.breakpoints.up('sm')]: {
  //   width: `calc(${theme.spacing(7)} + 1px)`,
  // },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

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
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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
}))

export default function MiniDrawer() {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const [tabopen, setTabOpen] = React.useState(true)
  const [activeTab, setActiveTab] = React.useState(0)
  const [category, setCategory] = React.useState('')

  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleClick = () => {
    setTabOpen(!tabopen)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <>
      <div className="">
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            open={open}
            style={{
              background: 'linear-gradient(180deg, #f467ec 0%, #38b6ff 100%)',
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="" noWrap component="">
                HI
              </Typography>
              <div className="user-icon">
                <PersonIcon />
              </div>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Box
              style={{
                background: 'linear-gradient(180deg, #f467ec 0%, #38b6ff 100%)',
                minHeight: '100vh',
              }}
            >
              <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? (
                    <ChevronRightIcon />
                  ) : (
                    <ChevronLeftIcon />
                  )}
                </IconButton>
              </DrawerHeader>
              <Divider />
              <List style={{ paddingRight: '6px', paddingBottom: '0px'}}>
                {[
                  'Dashboard',
                  'Properties and Services',
                  'MemberShip',
                  'Features',
                  'Global Membership',
                  'Master',

                  // 'Upload Image',

                  ,
                ].map((text, index) => (
                  <>
                    <ListItem
                      key={text}
                      disablePadding
                      sx={{
                        display: 'block',
                        background:
                          'linear-gradient(180deg, #f467ec 0%, #38b6ff 100%)',
                      }}
                      onClick={() => {
                        setActiveTab(index)
                      }}
                    >
                      <ListItemButton
                        onClick={handleClick}
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 2 : 'auto',
                            justifyContent: 'center',
                          }}
                        >
                          {index === 0 && <DashboardIcon />}
                          {index === 1 && <DesignServicesIcon />}
                          {index === 2 && <DomainIcon />}
                          {index === 3 && <DriveFolderUploadIcon />}
                          {index === 4 && <DriveFolderUploadIcon />}
                          {index === 5 && <DriveFolderUploadIcon />}
                        </ListItemIcon>
                        <ListItemText
                          primary={text}
                          sx={{ opacity: open ? 1 : 0 }}
                        />
                      </ListItemButton>
                    </ListItem>
                    {index === 4 && [4, 4.1].includes(activeTab) && (
                      <Collapse
                        in={[4, 4.1].includes(activeTab)}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List
                          sx={{
                            paddingTop: '0px',
                          }}
                        >
                          <ListItemButton
                            onClick={() => {
                              setActiveTab(4.1)
                            }}
                            sx={{
                              paddingLeft: '27px',
                            }}
                            className="text-white"
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                display: 'flex',
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                              }}
                            >
                              <CategoryIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={'Frequency Management'}
                              sx={{ opacity: open ? 1 : 0 }}
                            />
                          </ListItemButton>
                        </List>
                      </Collapse>
                    )}
                    {index === 5 && [5, 6, 7, 8].includes(activeTab) && (
                      <Collapse
                        in={[5, 6, 7, 8].includes(activeTab)}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List
                          sx={{
                            paddingTop: '0px',
                          }}
                        >
                          <ListItemButton
                            onClick={() => {
                              setActiveTab(6)
                            }}
                            sx={{
                              paddingLeft: '27px',
                            }}
                            className="text-white"
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                display: 'flex',
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                              }}
                            >
                              <CategoryIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={'Category'}
                              sx={{ opacity: open ? 1 : 0 }}
                            />
                          </ListItemButton>
                          <ListItemButton
                            onClick={() => {
                              setActiveTab(5)
                            }}
                            sx={{
                              paddingLeft: '27px',
                            }}
                            className="text-white"
                          >
                            {/* <ListItemIcon
                          sx={{
                            minWidth: 0,
                            display: 'flex',
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                          }}
                        >
                          <DriveFolderUploadIcon />
                        </ListItemIcon> */}
                            {/* <ListItemText
                          primary={'Create Slider'}
                          sx={{ opacity: open ? 1 : 0 }}
                        /> */}
                          </ListItemButton>
                        </List>
                        <List
                          sx={{
                            paddingTop: '0px',
                          }}
                        >
                          <ListItemButton
                            onClick={() => {
                              setActiveTab(7)
                            }}
                            sx={{
                              paddingLeft: '27px',
                            }}
                            className="text-white"
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                display: 'flex',
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                              }}
                            >
                              <CategoryIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={'Frequency Master'}
                              sx={{ opacity: open ? 1 : 0 }}
                            />
                          </ListItemButton>
                          <ListItemButton
                            onClick={() => {
                              setActiveTab(8)
                            }}
                            sx={{
                              paddingLeft: '27px',
                            }}
                            className="text-white"
                          ></ListItemButton>
                        </List>
                        <List
                          sx={{
                            paddingTop: '0px',
                          }}
                        >
                          <ListItemButton
                            onClick={() => {
                              setActiveTab(8)
                            }}
                            sx={{
                              paddingLeft: '27px',
                            }}
                            className="text-white"
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                display: 'flex',
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                              }}
                            >
                              <CategoryIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={'Criteria Master'}
                              sx={{ opacity: open ? 1 : 0 }}
                            />
                          </ListItemButton>
                          <ListItemButton
                            onClick={() => {
                              setActiveTab(8)
                            }}
                            sx={{
                              paddingLeft: '27px',
                            }}
                            className="text-white"
                          ></ListItemButton>
                        </List>
                      </Collapse>
                    )}
                  </>
                ))}
              </List>
              <Divider />
            </Box>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            {activeTab === 0 && <>WELCOME !!</>}
            {activeTab === 1 && <AddFrontpage />}
            {activeTab === 2 && <AddMemberShip />}
            {activeTab === 3 && <Features />}
            {activeTab === 4.1 && <FrequencyManagement />}
            {/* {activeTab === 2 && <UploadImage />} */}
            {activeTab === 6 && <Category />}
            {activeTab === 7 && <Frequency />}
            {activeTab === 8 && <Criteria />}
          </Box>
        </Box>
      </div>
    </>
  )
}

// import React from 'react'
// import { Button } from 'react-bootstrap'
// import Navbar from '../Navbar'
// import Sidebar from '../Sidebar'
// import './style.scss'

// export default function Index() {
//   return (
//     <>
//       {/* <Navbar /> */}
//       <div style={{ display: 'flex', flexDirection: 'row' }}>
//         <div>
//           <Sidebar />
//         </div>
//         {/* <div
//           className="content"
//           style={{ display: 'flex', flexDirection: 'row' }}
//         >
//           <div style={{ display: 'flex', height: '160px' }}>
//             <div className="back">
//               <p className="text">Logo</p>
//               <img
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiJUaUKPQ0Vgmohj_GdSPKfriUx2i_a2cKVg&usqp=CAU"
//                 class="img-fluid rounded-top"
//                 height="70"
//                 width="70"
//                 alt=""
//               />
//               <br />
//               <Button>Upload</Button>
//             </div>
//             <div className="back">
//               <p className="text">Logo</p>
//               <img
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdP1eszT3UodJ2wjXO2gwPJz8suR5-esmJWg&usqp=CAU"
//                 class="img-fluid rounded-top"
//                 height="100"
//                 width="70"
//                 alt=""
//               />
//               <br />
//               <Button>Upload</Button>
//             </div>
//             <div className="back">
//               <p className="text">Logo</p>
//               <img
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-dlbDAcxTH4B-o7gzPq6X_tl4n9Zknq3WqA&usqp=CAU"
//                 class="img-fluid rounded-top"
//                 height="70"
//                 width="70"
//                 alt=""
//               />
//               <br />
//               <Button>Upload</Button>
//             </div>
//             <div className="back">
//               <p className="text">Logo</p>
//               <img
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVq3vo1Myh1Y5c6xDPWhaQ5n0f16-1-um-9g&usqp=CAU"
//                 height="70"
//                 width="70"
//                 class="img-fluid rounded-top"
//                 alt=""
//               />
//               <br />
//               <Button>Upload</Button>
//             </div>
//           </div>

//           <div className="back" style={{ flexDirection: 'row' }}>
//             <label>Update Titel</label>
//             <input type="text" placeholder="" />

//             <label>Update SubTitel</label>
//             <input type="text" placeholder="" />
//           </div>
//         </div> */}
//       </div>
//     </>
//   )
// }
