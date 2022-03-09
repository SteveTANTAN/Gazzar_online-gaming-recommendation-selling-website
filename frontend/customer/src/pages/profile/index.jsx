import styles from './index.less';
import { Button, Space, Modal, Input, Form, DatePicker } from 'antd';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSetState } from 'ahooks';

export default function Profile() {
  const [password, setPassword] = useSetState({ visible: false });
  const [info, setInfo] = useSetState({ visible: false });
  const [card, setCard] = useSetState({ visible: false });
  return (
    <div className={styles.wrap}>
      <div className={styles.info + ' fr'}>
        <img src="" alt="" />
        <div>
          <Space>
            <h3>Nickname</h3>
            <EditOutlined
              className={styles.icon}
              onClick={() => setInfo({ visible: true })}
            ></EditOutlined>
          </Space>
          <div className={styles.desc}>useremail@gmail.com</div>
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
      {[1, 2].map((item) => (
        <div className={styles.card + ' fr'}>
          <div className="blank">
            <h4>Mastercard</h4>
            <h4>●●●● ●●●● ●●●● 0000</h4>
          </div>
          <div className={styles.del}>
            <DeleteOutlined></DeleteOutlined>
          </div>
        </div>
      ))}
      <Modal
        visible={password.visible}
        title={null}
        footer={null}
        onCancel={() => setPassword({ visible: false })}
      >
        <div className="pt">
          <Form labelCol={{ span: 7 }} wrapperCol={{ span: 16 }}>
            <Form.Item
              name={'pasword'}
              label="New Pasword"
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
      </Modal>

      <Modal
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
      </Modal>

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
          >
            <Form.Item
              name={'Type'}
              label="Card Type"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={'Number'}
              label="Card Number"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name={'Name'}
              label="Name on Card"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={'Expiration'}
              label="Expiration Date"
              rules={[{ required: true }]}
            >
              <DatePicker />
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
      </Modal>
    </div>
  );
}
