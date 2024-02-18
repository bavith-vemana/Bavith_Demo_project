import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'
import { Button, Form, Input, Col, Row, Select, DatePicker, Alert,message } from 'antd';
const { Option } = Select;

const RegistrationComp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [userData, setUserData] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    // addd new user 
    const handleRegistration = async (values) => {
        try {
            const response = await fetch('https://dummyjson.com/users/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                setLoggedIn(true);
                message.success('User Registration Success');
                setTimeout( () => {  navigate('/login');},2000)
                // navigate('/login');

            } else {
                console.error('Login failed');
                message.success('User Registration Failed');
              
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className=''>
            <Row>
                <Col span={24}>
                    <Form name="basic"
                        className=''
                        initialValues={{ remember: true, }}
                        onFinish={handleRegistration}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item
                                    label="FirstName"
                                    name="firstName"
                                    onChange={handleChange}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your firstname',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="LastName"
                                    name="lastName"
                                    onChange={handleChange}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your firstname',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}> <Form.Item
                                name="maidenName"
                                label="MaidenName"
                                tooltip="What do you want others to call you?"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please input your nickname!',
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item></Col>

                            <Col span={6}>
                                <Form.Item
                                    name="email"
                                    label="E-mail"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item></Col>
                            <Col span={6}>
                                <Form.Item label="Username" name="username"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please input your gender!',
                                        },]}
                                > <Input />
                                </Form.Item></Col>
                            <Col span={6}>
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                >
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}> <Form.Item
                                name="confirm"
                                label="Confirm Password"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The new password that you entered do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item></Col>
                          

                            <Col span={6}>
                                <Form.Item
                                    name="phone"
                                    label="Phone Number"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your phone number!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={6}>
                                <Form.Item
                                    name="gender"
                                    label="Gender"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select gender!',
                                        },
                                    ]}
                                >
                                    <Select>
                                        <Option value="male">Male</Option>
                                        <Option value="female">Female</Option>
                                        <Option value="other">Other</Option>
                                    </Select>
                                </Form.Item></Col>
                            <Col span={6}>
                                <Form.Item
                                    name="bloodGroup"
                                    label="Blood Group"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select Group!',
                                        },
                                    ]}
                                >
                                    <Select>
                                        <Option value="A+">A+</Option>
                                        <Option value="A-">A-</Option>
                                        <Option value="B+">B+</Option>
                                        <Option value="B-">B-</Option>
                                        <Option value="O+">O+</Option>
                                        <Option value="O-">O-</Option>
                                        <Option value="AB+">AB+</Option>
                                        <Option value="AB-">AB-</Option>
                                    </Select>
                                </Form.Item></Col>
                            <Col span={4}>
                                <Form.Item name="birthDate" label="Date of Birth">
                                    <DatePicker  />
                                </Form.Item>
                            </Col>
                            
                        </Row>
                       <div >
                            <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Registration
                            </Button>
                        </Form.Item>
                        </div>
                     
                    </Form>
                </Col>
            </Row>
        </div>)
}

export default RegistrationComp;