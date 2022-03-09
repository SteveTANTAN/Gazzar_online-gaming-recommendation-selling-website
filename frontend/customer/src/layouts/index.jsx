import styles from './index.less';
import { Input, Button, Space } from 'antd';
import {
  UserOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'umi';
export default (props) => {
  const history = useHistory();
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.content + ' fr'}>
          <Space>
            <Link to="/">
              <span className={styles.logo}>GAZZAR</span>
            </Link>
            <Input style={{ width: 180 }} suffix={<SearchOutlined />}></Input>
          </Space>
          <div className="blank"></div>
          <Space>
            <ShoppingCartOutlined
              className={styles.icon}
            ></ShoppingCartOutlined>
            <UserOutlined
              className={styles.icon}
              onClick={() => {
                history.push('/profile');
              }}
            ></UserOutlined>
            <Link className={styles.button} to="/login">
              Login
            </Link>
          </Space>
        </div>
      </div>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};
