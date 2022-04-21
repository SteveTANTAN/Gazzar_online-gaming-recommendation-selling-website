import styles from './index.less';
import { Input, Button, Space } from 'antd';
import {
  UserOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'umi';
import { useSelector, useDispatch } from 'dva';
import logoImg from '@/assets/logo.png';
import { post } from '@/user/utils/request';
// public layout rendering
export default (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  // Determine whether to log in by token

  const token = localStorage.getItem('utoken');
  if (localStorage.getItem('utoken') == null) {
    // localStorage.getItem('token')
    console.log("aaaaaaaaaaaaaaaaa");
   // history.push("/");
  }
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.content + ' fr'}>
          <Space>
            <Link to="/">
              <img className={styles.logo} src={logoImg} alt="" />
            </Link>
            {token&&<Input
              style={{ width: 240, borderRadius: 12, marginLeft: 20 }}
              suffix={<SearchOutlined />}
              onPressEnter={(e) => {
                history.push('/user/search/' + e.target.value);
              }}
            ></Input>}
          </Space>
          <div className="blank"></div>
          <Space>
            {token && (
              <>
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
              </>
            )}
            {localStorage.getItem('utoken') ? (
              <Link
                className={styles.button}
                onClick={() => {
                  history.push('');
                  localStorage.removeItem('utoken');
                  localStorage.removeItem('uorder');
                  
                  post('/api/user/logout', { token }).then(() => {
                    dispatch({ type: 'app/setState', payload: { token: '' } });
                  });
                }}
              >
                <Button type="primary" style={{ borderRadius: 16 }}>
                  Logout
                </Button>
              </Link>
            ) : (
              <Link className={styles.button} to="/user/login">
                <Button type="primary" style={{ borderRadius: 16 }}>
                  Login
                </Button>
              </Link>
            )}
          </Space>
        </div>
      </div>
      <div className={styles.content} style={{ paddingBottom: 24 }}>
        {props.children}
      </div>
    </div>
  );
};
