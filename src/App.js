import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Home from './app/pages/Home/home'
import Sidebar from './Sidebar/Sidebar'
import ActiveAcoount from '../src/app/pages/ActiveAcoount/ActiveAccount'
import Facilitator from '../src/app/pages/ActiveAcoount/Facilitator'
import Login from '../src/app/Admin/Login'
import Dashboard from './app/Admin/Dashboard'
import Register from '../src/app/Admin/Register'

import './App.css'
function App() {
  useEffect(() => {
    const div = document.querySelector('body').children
    if (div && div.length > 2) {
      div[2].style.display = 'none'
    }
    const element = document.getElementById('root')
    const theme = localStorage.getItem(process.env.REACT_APP_THEME)
    element.classList.add(theme)
  }, [])

  const [
    isSidebarCollapsedActAcoount,
    setSidebarCollapsedActAcoount,
  ] = useState(false)

  const [
    isSidebarCollapsedFacilitator,
    setSidebarCollapsedFacilitator,
  ] = useState(false)

  return (
    <>
      <div>
        {/* <div style={{ display: 'flex' }}> */}

        <div style={{ width: '100%' }}>
          {/* <Navbar /> */}
          <Routes>
            {/* <Route path="/home" element={<Home />} /> */}
            <Route
              path="/"
              element={
                <Home
                  setSidebarCollapsedActAcoount={setSidebarCollapsedActAcoount}
                  isSidebarCollapsedActAcoount={isSidebarCollapsedActAcoount}
                />
              }
            />
            <Route
              path="/activate-account"
              element={
                <ActiveAcoount
                  setSidebarCollapsedActAcoount={setSidebarCollapsedActAcoount}
                  isSidebarCollapsedActAcoount={isSidebarCollapsedActAcoount}
                />
              }
            />
             <Route
              path="/facilitator"
              element={
                <Facilitator
                setSidebarCollapsedActAcoount={setSidebarCollapsedActAcoount}
                isSidebarCollapsedActAcoount={isSidebarCollapsedActAcoount}
                />
              }
            />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/register" element={<Register />} />
            <Route
              path="/admin/dashboard"
              element={<Dashboard tabValue={0} />}
            />
            <Route
              path="/admin/properites"
              element={<Dashboard tabValue={1} />}
            />
            <Route
              path="/admin/membership"
              element={<Dashboard tabValue={2} />}
            />
            <Route path="/admin/test" element={<Sidebar />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
