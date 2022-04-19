import styles from './index.less';
import {
  Form,
  Input,
  Select,
  Button,
  Checkbox,
  InputNumber,
  Space,
  Row,
  Col,
  message,
} from 'antd';
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { Link, useHistory } from 'umi';
import {useDispatch} from 'dva'
import { post } from '@/user/utils/request';
const all={
  "Action & Adventure": 0,
    "Casual": 0,
    "FPS": 0,
    "RPG": 0,
    "Simulation": 0,
    "Sports & Racing": 0,
    "Strategy": 0,
    "Game Props": 0,
    "Costume": 0
}
export default function Register() {
  const [state, setState] = useState({});
  const [step, setStep] = useState(1);
  const [interest, setInterest] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    setStep(2);
    setState(values)
    // post('/api/user/register', values).then((res) => {
    //   dispatch({
    //     type: 'app/setState',
    //     payload: { token: res.token },
    //   });
    //   sessionStorage.setItem('token', res.token);
    // });
  };
  if (step === 2) {
    return (
      <div className={styles.wrap}>
        <div style={{ paddingBottom: 20 }}>
          <h2>Step 2</h2>
          <h3>Whats your interests?</h3>
          <h4>Games</h4>
          <Checkbox.Group style={{ width: '100%' }}>
            <Row>
              {[
                'Action',
                'Casual',
                'FPS',
                'Sports',
                'RPG',
                'Strategy',
                'Simulation',
              ].map((item) => (
                <Col span={8}>
                  <Checkbox
                    checked={interest.includes(item)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setInterest([...interest, item]);
                      } else {
                        setInterest(interest.filter((i) => i !== item));
                      }
                    }}
                    value={item}
                  >
                    {item}
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
          <h4 style={{ marginTop: 22 }}>Peripherals</h4>
          <Checkbox.Group style={{ width: '100%' }}>
            <Row>
              {['Costume', 'Game Props'].map((item) => (
                <Col span={12}>
                  <Checkbox
                    value={item}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setInterest([...interest, item]);
                      } else {
                        setInterest(interest.filter((i) => i !== item));
                      }
                    }}
                  >
                    {item}
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
          <div className={styles.center} style={{ marginTop: 22 }}>
            <Button
              style={{ width: 140 }}
              type="primary"
              onClick={() => {
                const interest_dict = JSON.parse(JSON.stringify(all));
                Object.keys(interest_dict).forEach(k=>{
                  if(interest.some(i=>k.startsWith(i))){
                    interest_dict[k]=1
                  }
                })
                
                post('/api/user/register', {
                  interest_dict,
                  ...state
                }).then((res) => {
                  message.success('success');
                     dispatch({
                      type: 'app/setState',
                      payload: { token: res.token },
                    });
                    sessionStorage.setItem('token', res.token);
                  history.push('/');
                });
              }}
            >
              Register
            </Button>
          </div>
          <div className={styles.center}>
            <Link to="/user/login">Aleady Have Account?Try to Login</Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.wrap}>
      <div>
        <h2>Step 1</h2>
        <Form
          name="normal_login"
          labelAlign="left"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="name"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Select
              placeholder="Gender"
              options={[
                { label: 'Male', value: 0 },
                { label: 'Female', value: 1 },
                { label: 'Mysterious', value: 2 },
              ]}
            />
          </Form.Item>
          <Form.Item name={'email'} label="Email" rules={[{ type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name={'age'}
            label="Age"
            rules={[{ type: 'number', min: 0, max: 99 }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              type="password"
              placeholder="input password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <div className={styles.center}>
              <Button style={{ width: 140 }} type="primary" htmlType="submit">
                Next
              </Button>
            </div>
            <div className={styles.center}>
              <Link to="/user/login">Aleady Have Account?Try to Login</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
