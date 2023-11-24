import React, { useState } from 'react'
import './style.scss'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import InventoryIcon from '@mui/icons-material/Inventory'
import CategoryIcon from '@mui/icons-material/Category'
import RequestPageIcon from '@mui/icons-material/RequestPage'
import ShopIcon from '@mui/icons-material/Shop'
import DensitySmallRoundedIcon from '@mui/icons-material/DensitySmallRounded'
import DirectionsSubwayFilledRoundedIcon from '@mui/icons-material/DirectionsSubwayFilledRounded'
import FeedbackRoundedIcon from '@mui/icons-material/FeedbackRounded'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded'

// import // FaTh,
// // FaBars,
// //   FaUserAlt,
// // FaRegChartBar,
// // FaCommentAlt,
// // FaShoppingBag,
// // FaThList
// 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const Index = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  const menuItem = [
    {
      path: '/admin/dashboard',
      name: 'Dashboard',
      icon: <VerifiedUserIcon />,
    },
    {
      path: '/admin/login',
      name: 'Logout',
      icon: <ExitToAppRoundedIcon />,
    },
  ]
  return (
    <div className=".menu-icon .menu">
      <div style={{ width: isOpen ? '180px' : '50px' }} className="sidebar">
        <div className="top_section">
          <h1
            style={{ display: isOpen ? 'block' : 'none' }}
            className="logo"
          ></h1>
          <div style={{ marginLeft: isOpen ? '50px' : '0px' }} className="bars">
            <DensitySmallRoundedIcon onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{
                display: isOpen ? 'block' : 'none',
              }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  )
}

export default Index
