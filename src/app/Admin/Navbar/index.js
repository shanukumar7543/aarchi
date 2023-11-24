import React from 'react'
import './style.scss'
import Dropdown from 'react-bootstrap/Dropdown'
import { Link } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
function Index() {
  return (
    <div>
      <div className="navs">
        <div className="logo">
          <img
            src="https://i.pinimg.com/originals/6a/72/4b/6a724b9501764fd83a4abcd37b58144d.png"
            height="60px"
          />
        </div>

        <div className="welcome" style={{ marginLeft: '1200px' }}>
          <div style={{ display: 'flex' }}>
            <AccountCircleIcon />
            <h4> Shanu</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
