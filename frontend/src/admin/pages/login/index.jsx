import styles from './index.less';
import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'umi';

export default function Login() {
  const history = useHistory();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    history.push('/admin/manage/');
  };
  const [username, setusername] = React.useState('');
  const [password, setpassword] = React.useState('');


  return (
    <div className={styles.wrap}>
      <div>
        <h2 style={{ marginBottom: 0 }}>Hi GAZZAR's Admins</h2>
        <h3 style={{ marginBottom: 10 }}>Managing your GAZZAR</h3>
        <Form name="normal_login" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >

            <Input
              onChange={e => setusername(e.target.value)}
              prefix={<UserOutlined className="site-form-item-icon" />}
              value = {username} type = 'text'
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              onChange={e => setpassword(e.target.value)}
              type="password"
              placeholder="Password"
              value = {password}
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <Form.Item>
            <div></div>
            <Button block type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
