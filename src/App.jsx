import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import MainLayout from './components/MainLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';

const queryClient = new QueryClient();// Khởi tạo một instance của QueryClient, dùng để quản lý cache cho React Query, dùng để gọi API

const AppContent = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />}/>
      <Route path='*' element={<MainLayout/>}/>
    </Routes>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;