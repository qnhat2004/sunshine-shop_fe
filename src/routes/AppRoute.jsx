import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Login from '../components/Login'
import App from '../App'
import ProtectedRoute from './ProtectedRoute'
import Dashboard from '../views/dashboard/General'
import MainLayout from '../components/MainLayout'
import Profile from '../views/components/Profile'
import ManageCategories from '../views/manage/categories/ManageCategories'
import ManageUser from '../views/manage/users/ManageUser'
import ManageSuppliers from '../views/manage/suppliers/ManageSuppliers'
import ManageProducts from '../views/manage/products/ManageProducts'
import General from '../views/dashboard/General'

const AppRoute = ({ title }) => {
  return (
    <Routes>
      {/* Public Path */}
      <Route path='/login' element={<Login />} />

      <Route path='/' element={<General />}/>     
      <Route path='/profile' element={<Profile />}/>
      <Route path='/manage/users' element={<ManageUser />}/>
      <Route path='/manage/categories' element={<ManageCategories />}/>
      <Route path='/manage/suppliers' element={<ManageSuppliers />}/>
      <Route path='/manage/products' element={<ManageProducts />}/>
    </Routes>
  )
}

export default AppRoute