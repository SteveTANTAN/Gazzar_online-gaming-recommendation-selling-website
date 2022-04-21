import React from 'react';
import { Input, Button, Space, Layout, Menu, message,PageHeader} from 'antd';
import { Alert } from 'antd';
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
const [admin_data, setadmin_data] = React.useState([]);
const [profileUpdate, setprofileUpdate] = React.useState(true);
const columns = [
  
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Password', dataIndex: 'password', key: 'password' },
  {
    title: 'operation',
    key: 'delete',
    render: (text, record) =>
      <Popconfirm title="Sure to delete?" onConfirm={() => {admindelete(record.email)}}>
        <a>Delete</a>
      </Popconfirm>
  },
];

console.log('Success1:');
function admindelete (email) {


  console.log('record ddddddddddddddddd:', email);
  
  const delte = {
    email: email,
    token:localStorage.getItem('token'),
  };
  fetch(`/api/admin/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(delte),
  }).then((data) => {
    if (data.status === 200) {
      console.log('Success1:');
      data.json().then(result => {
        console.log('Success:', result);
        setprofileUpdate(true);
        message.success("Admin deleting successful 😊!!!")
      });
    } else if (data.status === 400) {
      data.json().then(result => {
        console.log('error 400', result.message);
        message.error((result.message.replace("<p>","")).replace("</p>",""))
      });
    }
  });
}

function admindata () {
  fetch(`/api/admin/profile/${localStorage.getItem('token')}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    // body: JSON.stringify(loginPeople),
  }).then((data) => {
    if (data.status === 200) {
      console.log('Success1:');

      data.json().then(result => {
        console.log('Success:', result);

        message.success("admin profile updating successful 😊!!!")
        setadmin_data(result.admins_profile);
      });
    } else if (data.status === 400) {
      data.json().then(result => {
        console.log('error 400', result.message);
        message.error((result.message.replace("<p>","")).replace("</p>",""))
      });
    }
  })
}
if (profileUpdate) {
  admindata();
  setprofileUpdate(false);
}
function submit () {
  const loginPeople = {
    email: email,
    password: password,
    token:localStorage.getItem('token'),
  };
  fetch(`/api/admin/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginPeople),
  }).then((data) => {
    if (data.status === 200) {
      console.log('Success1:');

      data.json().then(result => {
        console.log('Success:', result.admins_profile);
        setprofileUpdate(true);
        message.success("New admin adding successful 😊!!!")

      });
    } else if (data.status === 400) {
      data.json().then(result => {
        console.log('error 400', result.message);
        message.error((result.message.replace("<p>","")).replace("</p>",""))
      });
    }
  });
}
const onFinish = (values) => {
  submit();
  console.log('Received values of form: ', values);
};
console.log('Received values of form: ', admin_data);

return (
  <div>
  <PageHeader
    className="site-page-header"
    title="Admins Management Page"
    subTitle=""
  />
  <Header className="site-layout-sub-header-background" style={{ padding: 0 }} >
  <Form
    name="normal_login"
    onFinish={onFinish}
    labelAlign="left"
    wrapperCol={{ span: 16 }}>
    <Row>
    <Col span={8}>
    <Form.Item name={'email'} label="Email" rules={[{ type: 'email' }]}>
      <Input
        prefix={<UserOutlined className="site-form-item-icon" />}
        placeholder="New admin Email"
        onChange={e => setemail(e.target.value)}
        value = {email}
      />
    </Form.Item>
    </Col>
    <Col span={8}>
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
    </Col>
    <Col span={4}>
    <Form.Item>
      <div></div>
      <Button block type="primary" htmlType="submit">
        Register
      </Button>
    </Form.Item>
    </Col>
    </Row>
  </Form>

  </Header>
  <Table
    columns={columns}
    dataSource={admin_data}
  />
  </div>);
};