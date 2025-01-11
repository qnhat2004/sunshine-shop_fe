import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Drawer, Form, Input, Row, Col, Button, Space, message, Select, Alert } from 'antd'
import { getAllSuppliers } from '../suppliers/ManageSuppliers';
import { getAllCategories } from '../categories/ManageCategories';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';

// Function to convert file to base64
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const FormProducts = ({ open, onClose, data, setData, editData }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
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
    const fetchData = async () => {
      const suppliersData = await getAllSuppliers();
      const categoriesData = await getAllCategories();
      setSuppliers(suppliersData || []);
      setCategories(categoriesData || []);
    };
    fetchData();
    if (editData) {
      form.setFieldsValue(editData);
      setFileList([{ uid: '-1', name: 'image', status: 'done', url: `${editData.image}` }]);
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [editData, form]);

  const onFinish = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach(key => {  // Loop through all form values
      if (key === 'image') return;  // Skip image key
      formData.append(key, values[key]);  // Append all other values
    });

    if (fileList.length > 0 && fileList[0].originFileObj) {  // If editing and file is uploaded
      formData.append('image', fileList[0].originFileObj);
    } else if (editData && editData.image) {  // If editing and no file uploaded
      formData.append('imageUrl', editData.image);  // Use the existing image URL
    }

    console.log('formData entries:', Array.from(formData.entries()));

    try {
      if (editData) {
        const response = await axios.put(`http://localhost:8080/api/products/${editData.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        const newData = data.map(item => item.id === editData.id ? response.data : item);
        setData(newData);
        message.success('Product updated successfully!');
      } else {
        // console.log('values: ', values);
        const response = await axios.post('http://localhost:8080/api/products', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setData([...data, response.data]);
        message.success('Product added successfully!');
      }
      onClose();
    } catch (error) {
      console.error('Error: ', error);
      message.error(`Failed to ${editData ? 'update' : 'add'} product!`);
    }
  }

  return (
    <Drawer
      title={editData ? 'Edit Product' : 'Add Product'}
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
      <Form layout="vertical" hideRequiredMark onFinish={onFinish} id="form" encType="multipart/form-data" form={form}>
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
              name="supplier_id"
              label="Supplier"
              initialValue={editData && editData.supplier ? editData.supplier.id : ''}
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
              name="category_id"
              label="Category"
              initialValue={editData && editData.category ? editData.category.id : ''}
              rules={[
                {
                  required: true,
                  message: 'Please enter category',
                },
              ]}
            >
              <Select placeholder="Please select a category">
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
                  required: !editData,  // If editing, image is not required
                  message: 'Please upload an image',
                },
              ]}
            >
              <Upload
                beforeUpload={() => false} // Prevent automatic upload
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