import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Space, Button, Table, message, Popconfirm, Card } from 'antd';
import FormSupplier from './FormSupplier';

export const getAllSuppliers = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/suppliers');
        return response.data;
    } catch (error) {
        console.error(`Error: ${error}`);
        message.error('Failed to fetch suppliers!');
        return [];
    }
};

const ManageSuppliers = () => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const showDrawer = (record) => {
        console.log(record);
        if (record) {
            setEditData(record);
        } else {
            setEditData(null);
        }
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        setEditData(null);
    };

    // Get data from API
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const suppliers = await getAllSuppliers();
            setData(suppliers);
            setLoading(false);
        };
        fetchData();
    }, []);

    const deleteData = (idx) => {
        axios.delete(`http://localhost:8080/api/suppliers/${idx}`)
            .then(() => {
                setData(data.filter(item => item.id !== idx));
                message.success('Supplier deleted successfully!');
            })
            .catch(error => {
                console.error('Error: ', error);
                message.error('Failed to delete supplier!');
            });
    };

    const columns = [
        'id',
        'name',
        'phone',
        'address',
        'action'
    ]

    return (
        <div className='container overflow-auto' style={{ width: '100%', position: 'relative' }}>
            <Button type="primary" onClick={showDrawer} style={{ marginBottom: '10px' }} icon={<PlusOutlined />}>Add Supplier</Button>
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
                                background: '#CCDDFAFF',
                            }}>
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, idx) => (
                        <tr key={idx}>
                            {columns.map((column) => {
                                if (column === 'action') {
                                    return (
                                        <td>
                                            <Button primary type='primary' className='me-2' onClick={() =>showDrawer(item)}>Edit</Button>
                                            <Popconfirm
                                                title="Delete the task"
                                                description="Are you sure to delete this task?"
                                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                                onConfirm={() => deleteData(idx)}
                                            >
                                                <Button danger type='primary'>Delete</Button>
                                            </Popconfirm>
                                        </td>
                                    );
                                }
                                return (
                                    <td style={{ padding: '16px' }}>
                                        {item[column]}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                    {/* Pagination */}
                    <tr>
                        <td colSpan={5}>
                            <Space>
                                <Button type="primary">Previous</Button>
                                <Button type="primary">Next</Button>
                            </Space>
                        </td>
                    </tr>
                </tbody>
            </table>
            <FormSupplier open={open} onClose={onClose} data={data} setData={setData} editData={editData} />
        </div>
    );
};

export default ManageSuppliers;