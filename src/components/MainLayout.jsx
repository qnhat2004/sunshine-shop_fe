import { React, useState } from 'react';
import { GlobalOutlined, HomeOutlined, LaptopOutlined, NotificationOutlined, ProductOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Flex, Layout, Menu, theme } from 'antd';
import User from '../views/components/User';
import AppRoute from '../routes/AppRoute'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';

import '../App.css';

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return { label, key, icon, children }
}

const items = [
  getItem('Trang Chủ', 'subDasboard', <HomeOutlined className='custom_icon_sidebar' />, [
    getItem('Tổng Quát', 'dashboard', <GlobalOutlined/>),
  ]),
  getItem('Quản Lý', 'subManage', <LaptopOutlined className='custom_icon_sidebar' />, [
    getItem('Người Dùng', 'users', <UserOutlined />),
    getItem('Sản Phẩm', '/manage/products', <ProductOutlined />),
    getItem('Loại Sản Phẩm', 'categories', <ShoppingOutlined />),
    getItem('Nhà Cung Cấp', 'suppliers', <ShoppingOutlined />),
    getItem('Thông Báo', 'notifications', <NotificationOutlined />)
  ]),
]

const MainLayout = () => {
  const [path, setPath] = useState(['dashboard']);
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    switch (key) {
      case 'dashboard':
        setPath('dashboard')
        navigate('/')
        break;
      case 'users':
        setPath('users')
        navigate('/manage/users')
        break;
      case 'categories':
        setPath('categories')
        navigate('/manage/categories')
        break;
      case 'suppliers':
        setPath('suppliers')
        navigate('/manage/suppliers')
        break;
      case '/manage/products':
        setPath('/manage/products')
        navigate('/manage/products')
        break;
    }
  }

  return (
    <Layout style={{ height: '100vh', minWidth: '100vw' }}>

      <Sider className='' style={{ background: '#fff' }} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className=''>
          <Menu style={{ border: 'none' }} theme="light" className={`${collapsed ? 'resizeWidth' : ''} sider_custom`} selectedKeys={path} mode="inline" items={items} onClick={handleMenuClick} />
        </div>
      </Sider>

      <Layout className=''>
        <Header style={{ padding: '0 30px', background: '#B8DAFAFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ marginLeft: 'auto' }} className='fw-bold fs-5'>
            <User />
          </div>
        </Header>
        <Content style={{ margin: '15px', backgroundColor: 'white', borderRadius: 10, boxShadow: '0 0 10px rgba(0,0,0,0.1)', display: 'flex' }} >
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', margin: '15px', position: 'relative' }}>
            <AppRoute/>
          </div>
        </Content>
      </Layout>

    </Layout>
  );
};
export default MainLayout;