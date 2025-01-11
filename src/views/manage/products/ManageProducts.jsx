import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Space, Button, Table, message, Popconfirm } from 'antd';
import FormProducts from './FormProducts';
import { PlusOutlined } from '@ant-design/icons';
import { getProducts } from './Hooks';

const ManageProducts = () => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [loading, setLoading] = useState(false);

    const showDrawer = (record = null) => {
        setEditData(record);
        setOpen(true);
    };
    
    const onClose = () => {
        setOpen(false);
        setEditData(null);
    };

    const deleteData = (idx) => {
        axios.delete(`http://localhost:8080/api/products/${idx}`)
            .then(() => {
                setData(data.filter(item => item.id !== idx));
                message.success('Product deleted successfully!');
            })
            .catch(error => {
                console.error('Error: ', error);
                message.error('Failed to delete product!');
            })
    }

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
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text) => <img src={text} alt='product' style={{ width: '200px', height: '100px' }} />,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Supplier',
            dataIndex: ['supplier', 'name'],    // supplier.name
            key: 'supplier.name',
        },
        {
            title: 'Category',
            dataIndex: ['category', 'name'],    // category.name
            key: 'category.name',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => showDrawer(record)}>Edit</Button>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this?"
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const products = await getProducts();
                setData(products || []);
            } catch (error) {
                message.error('Failed to fetch data!');                
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className=''>
            <Button type="primary" onClick={() => showDrawer(null)} style={{ marginBottom: '10px' }} icon={<PlusOutlined />}>Add Product</Button>
            <Table columns={columns} dataSource={data} rowKey='id' bordered loading={loading}/>
            <FormProducts open={open} onClose={onClose} data={data} setData={setData} editData={editData} />
        </div>
    );
};

export default ManageProducts;
