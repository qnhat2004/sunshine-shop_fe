import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';
import { Space, Button, Table, message, Popconfirm, Card } from 'antd';
import FormCategories from './FormCategories';

export const getAllCategories = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/categories');
    return response.data
  } catch (error) {
    console.error(`Error: ${error}`);
    message.error('Failed to fetch categories!');
    return [];
  }
}

const ManageCategories = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const showDrawer = (record) => {
    console.log(record);
    setEditData(record);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setEditData(null);
  };

  // Get data from API
  useEffect(() => {
    const fetchData = async () => {
      const categories = await getAllCategories();
      setData(categories);
    }
    fetchData();
  }, []);

  const deleteData = (idx) => {
      axios.delete(`http://localhost:8080/api/categories/${idx}`)
        .then(() => {
          setData(data.filter(item => item.id !== idx));
          message.success('Category deleted successfully!');
        })
        .catch(error => {
          console.error('Error: ', error);
          message.error('Failed to delete category!');
        });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
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
            <Button danger type='primary' onClick={() => showDrawer(record)}>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className='container overflow-auto' style={{ width: '100%', position: 'relative' }}>
      <Button type="primary" onClick={showDrawer} style={{ marginBottom: '10px' }} icon={<PlusOutlined />}>Add Category</Button>
      <table className='table table-hover border shadow w-100'>
          <thead>
            <tr style={{ background: '#E90000FF', borderBottom: '2px solid #f0f0f0' }}>
              {columns.map((column, idx) => (
                <th key={idx} style={{
                  padding: '16px',
                  fontWeight: 600,
                  color: '#262626',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  borderBottom: '2px solid #f0f0f0',
                  background: '#A9C6F7FF',
                }}>
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                {columns.map((column, idx) => {
                  if (column.key === 'action') {
                    return (
                      <td key={idx}>
                        <Button type="primary" onClick={() => showDrawer(item)} className='me-2'>Edit</Button>
                        <Popconfirm
                          title="Delete the task"
                          description="Are you sure to delete this task?"
                          onConfirm={() => deleteData(item.id)}
                          okText="Yes"
                          cancelText="No"
                          danger
                        >
                          <Button danger type='primary'>Delete</Button>
                        </Popconfirm>
                      </td>
                    );
                  }
                  return (
                    <td key={idx} style={{ padding: '16px' }}>
                      {item[column.dataIndex]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      <FormCategories open={open} onClose={onClose} data={data} setData={setData} editData={editData}/>
    </div>
  );
};

export default ManageCategories;