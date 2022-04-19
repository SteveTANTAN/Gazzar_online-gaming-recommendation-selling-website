import styles from './index.less';
import {
  Button,
  Space,
  Modal,
  Input,
  Form,
  DatePicker,
  message,
  InputNumber,
} from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useSetState } from 'ahooks';
import Payment from '@/user/components/Payment';
import { get, put, post } from '@/user/utils/request';
import { useSelector, useDispatch } from 'dva';
import { useEffect, useState } from 'react';
import maleImg from '@/assets/Male.png';
import femaleImg from '@/assets/Female.png';
import mysteriousImg from '@/assets/Mysterious.png';
// 个人资料页面
export default function Profile() {
  const [password, setPassword] = useSetState({ visible: false });
  const [info, setInfo] = useSetState({ visible: false });
  const [card, setCard] = useSetState({ visible: false });
  const [data, setData] = useSetState({});
  const { token } = useSelector((state) => state.app);
  const [payment, setPayment] = useState([]);
  const getPayment = () => {
    get(`/api/user/show/payment/${sessionStorage.getItem('token')}`).then(
      (res) => {
        setPayment(res);
      },
    );
  };
  const getData = () => {
    get(`/api/user/profile/${token}`).then((res) => {
      setData(res.user_info[0] || {});
    });
  };
  useEffect(() => {
    getData();
    getPayment();
  }, []);
  return (
    <div className="bg">
      <div className={styles.wrap}>
        <div className={styles.info + ' fr'}>
          <img src={[maleImg, femaleImg, mysteriousImg][data.gender]} alt="" />
          <div>
            <Space>
              {info?.visible ? (
                <Input
                  defaultValue={data.name}
                  onBlur={() => setInfo({ visible: false })}
                  onPressEnter={(e) => {
                    put(`/api/user/edit/username`, {
                      token,
                      name: e.target.value,
                    }).then(() => {
                      message.success('success');
                      getData();
                      setInfo({ visible: false });
                    });
                  }}
                />
              ) : (
                <h3>{data.name}</h3>
              )}
              <EditOutlined
                className={styles.icon}
                onClick={() => setInfo({ visible: true })}
              ></EditOutlined>
            </Space>
            <div className={styles.desc}>{data.email}</div>
          </div>
          <div className="blank"></div>
          <Button type="primary" onClick={() => setPassword({ visible: true })}>
            Change My Password
          </Button>
        </div>
        <hr style={{ margin: '30px 0' }} />
        <div className="fr">
          <h3>My Payment Option</h3>
          <div className="blank"></div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCard({ visible: true })}
          ></Button>
        </div>
        <div className={styles.items}>
          {payment?.map((item) => (
            <Payment
              key={item.payment_detail_id}
              {...item}
              onDelete={() => getPayment()}
            ></Payment>
          ))}
        </div>
        <Modal
          visible={password.visible}
          title={null}
          footer={null}
          onCancel={() => setPassword({ visible: false })}
        >
          <div className="pt">
            <Form
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 16 }}
              onFinish={(values) => {
                put('/api/user/edit/password', {
                  password: values.password,
                  token,
                }).then(() => {
                  message.success('success');
                  setPassword({ visible: false });
                });
              }}
            >
              <Form.Item
                name={'password'}
                label="New Password"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ span: 24 }}>
                <div className={'center'}>
                  <Button
                    style={{ width: 140 }}
                    type="primary"
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </Modal>

        {/* <Modal
        width={400}
        visible={info.visible}
        title={null}
        footer={null}
        onCancel={() => setInfo({ visible: false })}
      >
        <div className="pt">
          <Form
            labelAlign="left"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item
              name={'recipients'}
              label="Recipients"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={'Phone'}
              label="phone"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name={'code'}
              label="Post code"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={'Address'}
              label="address"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <div className={'center'}>
                <Button style={{ width: 140 }} type="primary" htmlType="submit">
                  Submit
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal> */}

        <Modal
          width={400}
          visible={card.visible}
          title={null}
          footer={null}
          onCancel={() => setCard({ visible: false })}
        >
          <div className="pt">
            <Form
              labelAlign="left"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={(values) => {
                post('/api/user/add/payment', {
                  token,
                  payment_dict: {
                    ...values,
                    expration_date: values.expration_date?.format(
                      'YYYY-MM-DD HH:mm:ss',
                    ),
                  },
                }).then(() => {
                  setCard({ visible: false });
                  message.success('success');
                  getPayment();
                });
              }}
            >
              <Form.Item
                name={'card_type'}
                label="Card Type"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={'card_number'}
                label="Card Number"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name={'name_on_card'}
                label="Name on Card"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={'expration_date'}
                label="Expiration Date"
                rules={[{ required: true }]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item wrapperCol={{ span: 24 }}>
                <div className={'center'}>
                  <Button
                    style={{ width: 140 }}
                    type="primary"
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    </div>
  );
}
