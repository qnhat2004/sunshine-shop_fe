import React, { useEffect } from 'react'
import axios from 'axios'
import { Drawer, Form, Input, Row, Col, Button, Space, message } from 'antd'

const FormCategories = ({ open, onClose, data, setData, editData }) => {
  const [form] = Form.useForm();  // use to reset form

  const onFinish = (values) => {
    if (editData) {
      console.log('Received values of form: ', values);
      axios.put(`http://localhost:8080/api/categories/${editData.id}`, values)
        .then(response => {
          const newData = data.map(item => item.id === editData.id ? response.data : item);
          setData(newData);
          onClose();
          message.success('Category updated successfully!');
        })
        .catch(error => {
          message.error('Failed to update category! Error: ' + error.message);
        })
    } else {
      axios.post('http://localhost:8080/api/categories', values)
        .then(response => {
          setData([...data, response.data]);
          onClose();
          message.success('Category added successfully!');
        })
        .catch(error => {
          console.error('Error: ', error);
          message.error('Failed to add category!');
        });
    }
  };

  return (
    <Drawer
      title={editData ? "Edit category" : "Create a new category"}
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
                  message: 'Please enter category name',
                },
              ]}
            >
              <Input placeholder="Please enter category name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              initialValue={editData ? editData.description : ''}
              rules={[
                {
                  required: true,
                  message: 'Please enter category description',
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Please enter category description" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  )
}

export default FormCategories