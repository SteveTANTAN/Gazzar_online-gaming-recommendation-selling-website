import styles from './index.less';
import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'umi';
const BASE_URL = 'http://localhost:55467';

export default function Login() {
  const history = useHistory();
  const [email, setemail] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [login, setlogin] = React.useState(false);

  if (localStorage.getItem('token') != null || login) {
    history.push('/admin/manage/overView');
  }
  // some fetching used here
  function submit () {
    const loginPeople = {
      email: email,
      password: password,
    };
    fetch(`/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginPeople),
    }).then((data) => {
      if (data.status === 200) {
        console.log('Success1:');

        data.json().then(result => {
        message.success("Log in successful 😊!!!")
        console.log('Success:', result);

          document.cookie = 'Token=' + result.token + '';
          localStorage.setItem('token', result.token);
          setlogin(true);
        });
      } else if (data.status === 400) {
        data.json().then(result => {
          message.error((result.message.replace("<p>","")).replace("</p>",""))
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
    <div className={styles.wrap}>
      <div>
        <h2 style={{ marginBottom: 0 }}>Hi GAZZAR's Admins</h2>
        <h3 style={{ marginBottom: 10 }}>Managing your GAZZAR</h3>
        <Form name="normal_login" onFinish={onFinish}>
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
