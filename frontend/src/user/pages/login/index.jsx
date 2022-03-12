import styles from './index.less';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'umi';

export default function Login() {
  const history = useHistory();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    history.push('/');
  };

  return (
    <div className={styles.wrap}>
      <div>
        <h2 style={{ marginBottom: 0 }}>GAZZAR,</h2>
        <h3 style={{ marginBottom: 10 }}>New Option for Your Gaming</h3>
        <Form name="normal_login" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
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
              <Link to="/user/register">Register For Free</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
