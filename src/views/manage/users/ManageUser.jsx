import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Space, Button, Table, Tag, message, Popconfirm, Card } from 'antd';
import FormUser from './FormUser';


const ManageUser = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const showDrawer = (record) => {
    setOpen(true);
    setEditData(record);
  };
  const onClose = () => {
    setOpen(false);
    setEditData(null);
  };

  const deleteData = (idx) => {
    axios.delete(`http://localhost:8080/api/users/${idx}`)
      .then(() => {
        setData(data.filter(item => item.id !== idx));
        message.success('User deleted successfully!');
      })
      .catch(error => {
        console.error('Error: ', error);
        message.error('Failed to delete user!');
      })
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={getRoleColor(role)}>
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showDrawer(record)}>Edit</Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => deleteData(record.id)}
            okText="Yes"
            cancelText="No"
            danger
          >
            <Button danger type='primary'>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'green';
      case 'editor':
        return 'blue';
      case 'user':
        return 'geekblue';
      default:
        return 'gray';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'green';
      case 'pending':
        return 'yellow';
      case 'inactive':
        return 'red';
      default:
        return 'gray';
    }
  };

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/users')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  }, [!data]);

  return (
    <>
      <Card className='w-100 bg-white overflow-auto' title='Manage Users'>
        <Table columns={columns} dataSource={data} rowKey='id' style={{ position: 'absolute', width: '95%' }}/>
      </Card>
      <FormUser open={open} onClose={onClose} data={data} setData={setData} editData={editData} />
    </>
  );
};

export default ManageUser;
