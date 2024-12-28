import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Drawer, Form, Input, Row, Col, Button, Space, message, Select } from 'antd'
import { getAllSuppliers } from '../suppliers/ManageSuppliers';
import { getAllCategories } from '../categories/ManageCategories';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const FormProducts = ({ open, onClose, data, setData, editData }) => {
  const [form] = Form.useForm();  // use to reset form
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // 
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    // Neu file duoc upload thanh cong thi lay url cua file do
    if (fileList[0]?.response) {
      const url = fileList[0].response; // Lay url cua file tu response api
      console.log('url: ', url);
    }
  }
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  useEffect(() => {
    if (editData) form.setFieldsValue(editData);
    else form.resetFields();
    const fetchData = async () => {
      const suppliersData = await getAllSuppliers();
      const categoriesData = await getAllCategories();
      setSuppliers(suppliersData || []);
      setCategories(categoriesData || []);
    };
    fetchData();
  }, [editData, form]);

  const editproduct = (values) => {
    // console.log('Received values of form: ', values);
    axios.put(`http://localhost:8080/api/products/${editData.id}`, values)
      .then(response => {
        const newData = data.map(item => item.id === editData.id ? response.data : item);
        setData(newData);
        onClose();
        message.success('Product updated successfully!');
      })
      .catch(error => {
        console.error('Error: ', error);
        message.error('Failed to update product!');
      });
  };
  return (
    <Drawer
      title="Edit product"
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
      <Form layout="vertical" hideRequiredMark onFinish={editproduct} id="form">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              initialValue={editData ? editData.name : ''}
              rules={[
                {
                  required: true,
                  message: 'Please enter product name',
                },
              ]}
            >
              <Input placeholder="Please enter product name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="price"
              label="Price"
              initialValue={editData ? editData.price : ''}
              rules={[
                {
                  required: true,
                  message: 'Please enter price',
                },
              ]}
            >
              <Input placeholder="Please enter price" type='number' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="quantity"
              label="Quantity"
              initialValue={editData ? editData.quantity : ''}
              rules={[
                {
                  required: true,
                  message: 'Please enter quantity',
                },
              ]}
            >
              <Input placeholder="Please enter quantity" type='number' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="supplier"
              label="Supplier"
              initialValue={editData ? editData.supplier : ''}
              rules={[
                {
                  required: true,
                  message: 'Please enter supplier',
                },
              ]}
            >
              <Select placeholder="Please select a supplier">
                {suppliers.map(supplier => (
                  <Select.Option key={supplier.id} value={supplier.id}>{supplier.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="category"
              label="Category"
              initialValue={editData ? editData.category : ''}
              rules={[
                {
                  required: true,
                  message: 'Please enter category',
                },
              ]}
            >
              <Select placeholder="Please select an category">
                {categories.map(category => (
                  <Select.Option key={category.id} value={category.id}>{category.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="image"
              label="Image"
              rules={[
                {
                  required: true,
                  message: 'Please upload an image',
                },
              ]}
            >
              <Upload
                action="http://localhost:8080/api/upload" // Replace with your upload endpoint API, use to save image
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                maxCount={1}
              >
                {fileList.length >= 1 ? null : (
                  <button style={{ border: 0, background: 'none' }} type="button">
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </button>
                )}
              </Upload>
            </Form.Item>

            {previewImage && (
              <Image
                style={{ display: 'none' }}
                src={previewImage}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(''),
                }}
              />
            )}

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
                  message: 'Please enter description',
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="please enter product description" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  )
}

export default FormProducts