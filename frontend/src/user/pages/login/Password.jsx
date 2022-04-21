import styles from './index.less';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'umi';
import { post } from '@/user/utils/request';
// Forget Password
export default function Password() {
  const history = useHistory();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    post('/api/user/forget/password', values).then(() => {
      message.success('success');
      history.push('/user/login');
    });
  };

  return (
    <div className={styles.wrap}>
      <div>
        <h3 style={{ marginBottom: 10 }}>
          We will send the new password to your email
        </h3>
        <Form
          name="normal_login"
          labelAlign="left"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 17 }}
          onFinish={onFinish}
        >
          <Form.Item
            name={'email'}
            label="Email"
            rules={[{ required: true, type: 'email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 7, span: 10 }}>
            <Button block type="primary" htmlType="submit">
              Send
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
