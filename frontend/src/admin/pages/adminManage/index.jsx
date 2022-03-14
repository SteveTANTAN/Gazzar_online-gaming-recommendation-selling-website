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
export default (props) => {
const { Header, Content, Footer, Sider } = Layout;
const onFinish = (values) => {
  console.log('Received values of form: ', values);
};
const history = useHistory();
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

return (
  <div>
  <Header className="site-layout-sub-header-background" style={{ padding: 0 }} >
  <Form
    name="normal_login"
    labelAlign="left"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    onFinish={onFinish}
  >
  <Row>
    <Form.Item name={'email'} label="Register Email" rules={[{ type: 'email' }]}>
      <Input placeholder="Input Email" />
    </Form.Item>
    <Space></Space>
    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your Password!' }]}
    >
      <Input.Password
        type="password"
        placeholder="Input password"
        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
    </Form.Item>
    <Button
      style={{ width: 100 }}
      type="primary"
      shape="round"
      htmlType="submit"
      onClick={() => {history.push('/admin/manage/admins');}}
    >
      Register
    </Button>
  </Row>
  </Form>

  </Header>
  <Table
    columns={columns}
    dataSource={data}
  />
  </div>);
  };