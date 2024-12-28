import React, { useEffect } from 'react'
import axios from 'axios'
import { Drawer, Form, Input, Row, Col, Button, Space, message, Select } from 'antd'

const FormUser = ({ open, onClose, data, setData, editData }) => {
  console.log('editData: ', editData);
  const [form] = Form.useForm();  // use to reset form

  useEffect(() => {
    if (editData) form.setFieldsValue(editData);
    else form.resetFields();
  }, [editData, form]);

  const editUser = (values) => {
    console.log('Received values of form: ', values);
    axios.put(`http://localhost:8080/api/users/edit/${editData.id}`, values)
      .then(response => {
        const newData = data.map(item => item.id === editData.id ? response.data : item);
        setData(newData); 
        onClose();
        message.success('User updated successfully!');
      })
      .catch(error => {
        console.error('Error: ', error);
        message.error('Failed to update user!');
      });
  };
  return (
    <Drawer
      title="Edit User"
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
      <Form layout="vertical" hideRequiredMark onFinish={editUser} id="form">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="username"
              label="Username"
              initialValue={editData ? editData.username : ''}
              rules={[
                {
                  required: true,
                  message: 'Please enter user name',
                },
              ]}
            >
              <Input placeholder="Please enter user name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              initialValue={editData ? editData.email : ''}
              rules={[
                {
                  required: true,
                  message: 'Please enter email',
                },
              ]}
            >
              <Input placeholder="Please enter email" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="fullname"
              label="Full Name"
              initialValue={editData ? editData.fullname : ''}
              rules={[
                {
                  required: true,
                  message: 'Please enter full name',
                },
              ]}
            >
              <Input placeholder="Please enter full name" />
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
                  message: 'Please enter phone',
                },
              ]}
            >
              <Input placeholder="Please enter phone" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="role"
              label="Role"
              initialValue={editData ? editData.role : ''}
              rules={[
                {
                  required: true,
                  message: 'Please enter role',
                },
              ]}
            >
              <Select placeholder="Please choose the role">
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="user">User</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="status"
              label="Status"
              initialValue={editData ? editData.status : ''}
              rules={[
                {
                  required: true,
                  message: 'Please enter status',
                },
              ]}
            >
              <Select placeholder="Please choose the status">
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="pending">Pending</Select.Option>
                <Select.Option value="inactive">Inactive</Select.Option>
              </Select>
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
                  message: 'Please enter address',
                },
              ]}
            >
              <Input placeholder="Please enter address" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  )
}

export default FormUser