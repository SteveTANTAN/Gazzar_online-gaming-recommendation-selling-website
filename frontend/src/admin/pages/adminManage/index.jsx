import React from 'react';
import { Input, Button, Space, Layout, Menu  } from 'antd';
import {
  Form,
  Checkbox,
  InputNumber,
  Row,
  Col,
} from 'antd';
import { Table, Popconfirm } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link, useHistory } from 'umi';
const BASE_URL = 'http://localhost:55467';

export default (props) => {
const { Header, Content, Footer, Sider } = Layout;
const history = useHistory();
const [email, setemail] = React.useState('');
const [password, setpassword] = React.useState('');
const columns = [
  
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Password', dataIndex: 'password', key: 'password' },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: ( ) => (
      <Popconfirm title="Sure to delete?" >
        <a>Delete</a>
      </Popconfirm>
    ),
  },
];

const data = [
  {
    key: 1,
    email: 'xxxxxxxx@xxxxx.com',
    password: 'asdasdasdasd',
    description: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
  {
    key: 2,
    email: 'xxxxxxxx@xxxxx.com',
    password: 'asdasdasdasd',
    description: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
  {
    key: 3,
    email: 'xxxxxxxx@xxxxx.com',
    password: 'asdasdasdasd',
    description: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    description: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
  {
    key: 4,
    email: 'xxxxxxxx@xxxxx.com',
    password: 'asdasdasdasd',
    description: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    description: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
];
function submit () {
  const loginPeople = {
    email: email,
    password: password,
    token:localStorage.getItem('token'),
  };
  fetch(`${BASE_URL}/api/admin/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginPeople),
  }).then((data) => {
    if (data.status === 200) {
      console.log('Success1:');

      data.json().then(result => {
        console.log('Success:', result);

      });
    } else if (data.status === 400) {
      data.json().then(result => {
        console.log('Success:', result);

        // setErrorout(result.error)
      });
    }
  });
}
const onFinish = (values) => {
  submit();
  console.log('Received values of form: ', values);
};

return (
  <div>
  <Header className="site-layout-sub-header-background" style={{ padding: 0 }} >
  <Form
    name="normal_login"
    onFinish={onFinish}
    labelAlign="left"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}>
    <Row>
    <Form.Item
      name="email"
      rules={[{ required: true, message: 'Please input your email!' }]}
    >
      <Input
        prefix={<UserOutlined className="site-form-item-icon" />}
        placeholder="Email"
        onChange={e => setemail(e.target.value)}
        value = {email}
      />
    </Form.Item>
    </Row>
    <Row>
    <Form.Item
      name="password"
      rules={[{ required: true, message: 'Please input your Password!' }]}
    >
      <Input.Password
        prefix={<LockOutlined className="site-form-item-icon" />}
        type="password"
        placeholder="Password"
        onChange={e => setpassword(e.target.value)}
        value = {password}
        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
    </Form.Item>
    </Row>
    <Row> 
    <Form.Item>
      <div></div>
      <Button block type="primary" htmlType="submit">
        Login
      </Button>
    </Form.Item>
    </Row>
  </Form>

  </Header>
  <Table
    columns={columns}
    dataSource={data}
  />
  </div>);
};