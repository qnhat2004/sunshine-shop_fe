import React, { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FaPersonRifle, FaUser } from 'react-icons/fa6';
import { FaSignOutAlt } from 'react-icons/fa';

const User = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [userdata, setUserdata] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const stored_userdata = localStorage.getItem('userdata');
        // console.log(stored_userdata);
        if (stored_userdata) {
            setIsLogged(true);
            setUserdata(stored_userdata);
        } else {
            setIsLogged(false);
        }
    }, []);

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        setIsLogged(false);
        setUserdata(null);
        localStorage.removeItem('userdata');
        navigate('/login');
    };

    const menuItems = (
        <Menu>
            <Menu.Item key="1">
                <FaUser style={{ marginRight: '5px' }} />
                <a href="/profile">Profile</a>
            </Menu.Item>
            <Menu.Item key="2" danger='true'>
                <FaSignOutAlt style={{ marginRight: '5px' }} />
                <a onClick={handleLogout}>Logout</a>
            </Menu.Item>
        </Menu>
    );

    const parsedUserdata = userdata ? JSON.parse(userdata) : null;

    return (
        <div>
            {isLogged ? (
                <Dropdown overlay={menuItems}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <b>{parsedUserdata?.username}</b>
                            <span style={parsedUserdata?.role === 'admin' ? { color: 'green' } : { color: 'blue' }}>({parsedUserdata.role})</span>
                        </Space>
                    </a>
                </Dropdown>
            ) : (
                <a onClick={handleLogin}>Login</a>
            )}
        </div>
    );
};

export default User;