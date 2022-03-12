import styles from './index.less';
import { Input, Button, Space } from 'antd';
import {
  UserOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'umi';
import logoImg from '@/assets/logo.png';
export default (props) => {
  const history = useHistory();
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.content + ' fr'}>
          <Space>
            <Link to="/">
              <img className={styles.logo} src={logoImg} alt="" />
            </Link>
            <Input
              style={{ width: 240, borderRadius: 12, marginLeft: 20 }}
              suffix={<SearchOutlined />}
              onPressEnter={() => {
                history.push('/user/search');
              }}
            ></Input>
          </Space>
          <div className="blank"></div>
          <Space>
            <ShoppingCartOutlined
              className={styles.icon}
              onClick={() => {
                history.push('/user/cart');
              }}
            ></ShoppingCartOutlined>
            <UserOutlined
              className={styles.icon}
              onClick={() => {
                history.push('/user/profile');
              }}
            ></UserOutlined>
            <Link className={styles.button} to="/user/login">
              <Button type="primary" style={{ borderRadius: 16 }}>
                Login
              </Button>
            </Link>
          </Space>
        </div>
      </div>
      <div className={styles.content} style={{ paddingBottom: 24 }}>
        {props.children}
      </div>
    </div>
  );
};
