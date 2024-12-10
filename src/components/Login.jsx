import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Dùng để chuyển trang sau khi đăng nhập thành công

  const onFinish = async (values) => {
    try {
      setLoading(true);
      // Gọi API login
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username: values.username,
        password: values.password,
      });
      
      // Lưu token vào localStorage hoặc state management
      localStorage.setItem('token', response.data.token);
      message.success('Đăng nhập thành công!');
      
      // Chuyển trang sau khi login
      navigate('/dashboard'); // Điều hướng sang trang chính
    } catch (error) {
      message.error('Đăng nhập thất bại! Kiểm tra lại tên đăng nhập và mật khẩu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Card title="Đăng Nhập" bordered={false} style={styles.card}>
        <Form name="login_form" onFinish={onFinish}>
          {/* Input Tài Khoản */}
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Tên đăng nhập"
            />
          </Form.Item>

          {/* Input Mật Khẩu */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Mật khẩu"
            />
          </Form.Item>

          {/* Nút Đăng Nhập */}
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Đăng Nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;

// CSS inline style
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#f5f5f5',
  },
  card: {
    width: 400,
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
};
