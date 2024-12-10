import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Login from '../components/Login'
import App from '../App'
import ProtectedRoute from './ProtectedRoute'

const AppRoute = () => {
  return (
    <Router>
        <Routes>
            <Route path='/login' element={<Login />}/>
            <Route path='/' element={<ProtectedRoute />}>
                <Route path='/dashboard' element={<App />}/>
            </Route>
        </Routes>
    </Router>
  )
}

export default AppRoute