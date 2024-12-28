import React, { useEffect } from 'react'
import axios from 'axios'
import { Drawer, Form, Input, Row, Col, Button, Space, message } from 'antd'
import { use } from 'react';

const FormSupplier = ({ open, onClose, data, setData, editData }) => {
    const [form] = Form.useForm();  // use to reset form

    const onFinish = (values) => {
        if (editData) {
            console.log('Received values of form: ', values);
            axios.put(`http://localhost:8080/api/suppliers/${editData.id}`, values)
                .then(response => {
                    const newData = data.map(item => item.id === editData.id ? response.data : item);
                    setData(newData);
                    onClose();
                    message.success('Supplier updated successfully!');
                })
                .catch(error => {
                    message.error('Failed to update supplier! Error: ' + error.message);
                })
        } else {
            axios.post('http://localhost:8080/api/suppliers', values)
                .then(response => {
                    setData([...data, response.data]);
                    onClose();
                    message.success('Supplier added successfully!');
                })
                .catch(error => {
                    console.error('Error: ', error);
                    message.error('Failed to add Supplier!');
                });
        }
    };

    return (
        <Drawer
            title={editData ? "Edit Supplier" : "Create a new Supplier"}
            width={720}
            onClose={onClose}
            open={open}
            extra={
                <Space>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button htmlType='submit' type="primary" form='form'>
                        Submit
                    </Button>
                </Space>
            }
        >
            <Form layout="vertical" hideRequiredMark onFinish={onFinish} id="form">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label="Name"
                            initialValue={editData ? editData.name : ''}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Supplier name',
                                },
                            ]}
                        >
                            <Input placeholder="Please enter Supplier name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="phone"
                            label="Phone"
                            initialValue={editData ? editData.phone : ''}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Supplier phone',
                                },
                            ]}
                        >
                            <Input placeholder="Please enter Supplier phone" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="address"
                            label="Address"
                            initialValue={editData ? editData.address : ''}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Supplier address',
                                },
                            ]}
                        >
                            <Input.TextArea rows={4} placeholder="Please enter Supplier address" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    )
}

export default FormSupplier