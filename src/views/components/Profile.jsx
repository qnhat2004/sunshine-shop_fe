import React from 'react';
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Mentions,
    Select,
    TreeSelect,
    Segmented,
} from 'antd';
const { RangePicker } = DatePicker;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 6,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 14,
        },
    },
};

const Profile = () => {
    const [form] = Form.useForm();
    const variant = Form.useWatch('variant', form);
    const datauser = JSON.parse(localStorage.getItem('userdata'));

    return (
        <Form
            {...formItemLayout}
            form={form}
            variant={variant}
            style={{
                maxWidth: 600,
                backgroundColor: '#fff',
                padding: 60,
                borderRadius: 10,
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            }}
            initialValues={{
                variant: 'filled',
            }}
        >

            <Form.Item
                label="Họ và tên"
                name="username"
                initialValue={datauser.username}
                rules={[
                    {
                        required: true,
                        message: 'Please input!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                initialValue={datauser.email}
                rules={[
                    {
                        required: true,
                        message: 'Please input!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Chức vụ"
                name="role"
                initialValue={datauser.role}
                rules={[
                    {
                        required: true,
                        message: 'Please input!',
                    },
                ]}
            >
                <Select>
                    <Select.Option value="user">User</Select.Option>
                    <Select.Option value="admin">Admin</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="Trạng thái"
                name="status"
                initialValue={datauser.status}
                rules={[
                    {
                        required: true,
                        message: 'Please input!',
                    },
                ]}
            >
                <Select>
                    <Select.Option value="user">Đang hoạt động</Select.Option>
                    <Select.Option value="admin">Đang ngoại tuyến</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 6,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Profile