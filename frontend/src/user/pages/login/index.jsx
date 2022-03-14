import styles from './index.less';
import { Form, Input, Button, Checkbox, Space, Row } from 'antd';
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'umi';
import { post } from '@/user/utils/request';

export default function Login() {
  const history = useHistory();
  const onFinish = (values) => {
    // console.log('Received values of form: ', values);
    // history.push('/');
    post('/api/user/login', values).then(() => {
      // history.push('/')
    });
  };

  return (
    <div className={styles.wrap}>
      <div>
        <h2 style={{ marginBottom: 0 }}>GAZZAR,</h2>
        <h3 style={{ marginBottom: 10 }}>New Option for Your Gaming</h3>
        <Form name="normal_login" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please input your Email!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="email"
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
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <div style={{ height: 30, marginTop: -10 }}>
            <Link to={'/user/password'} style={{ float: 'right' }}>
              Forgot password?
            </Link>
          </div>
          <Form.Item>
            <div></div>
            <Button block type="primary" htmlType="submit">
              Login
            </Button>
            <div className={styles.center}>
              <Space style={{ height: 40 }}>
                <Link to="/user/register">Register For Free</Link>
              </Space>
            </div>
            <div className={styles.center}>
              <Space style={{ height: 30 }}>
                {' '}
                <Link to="/admin">Are you Admin? Log in here</Link>
              </Space>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
