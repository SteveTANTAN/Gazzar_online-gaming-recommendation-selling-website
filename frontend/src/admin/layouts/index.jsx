import styles from './index.less';
import { Input, Button, Space, Layout, Menu, message  } from 'antd';
import {
  UserOutlined,
  CustomerServiceOutlined,
  PieChartOutlined,
  CarOutlined,
  OrderedListOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'umi';
import logoImg from '@/assets/logo.png';
const BASE_URL = 'http://localhost:55467';

export default (props) => {
  const history = useHistory();
  const { Header, Content, Footer, Sider } = Layout;
  if (localStorage.getItem('token') == null) {
    // localStorage.getItem('token')
    console.log("aaaaaaaaaaaaaaaaa");
    history.push("/admin/login");
  }
  function logout () {
    document.cookie = 'Token=; expires = Thu, 01 Jan 2020 00:00:00 UTC';
    console.log("local", localStorage.getItem('token'));
    console.log("cookie", document.cookie);
    const token = localStorage.getItem('token')
    const logPeople = {
      token: token,
    };
    localStorage.removeItem('token');

    fetch(`/api/admin/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(logPeople),
    })
    message.success("Log out successful 😊!!!")
    history.push("/admin/login");


  }
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.content + ' fr'}>

            <Link to="/admin/manage">
              <img className={styles.logo} src={logoImg} alt="" />
            </Link>

          <Space style={{ width: 20}}>   </Space>
          <div className="blank" style={{ fontSize:25, fontWeight: 600}}>  Admin </div>
          <Space>
            <Link className={styles.button} onClick={() => {logout();}} to="/admin/login" >
              <Button type="primary" style={{ borderRadius: 16 }} >
                Logout
              </Button>
            </Link>
          </Space>
        </div>
      </div>
        <Layout>
          <Sider theme="light"
            breakpoint="lg"
            collapsedWidth="0"
            width="7cm"
            onBreakpoint={broken => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <div className="logo" />
            <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} >
            <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
              <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link to="/admin/manage/overView">
                Overview
              </Link>
              </Menu.Item>

              <Menu.Item key="2" icon={<CarOutlined/>}>
              <Link to="/admin/manage/games">
                Games Management
                </Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<CustomerServiceOutlined/>}>
                <Link to="/admin/manage/Peripherals">
                Peripherals Management
                </Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<OrderedListOutlined/>}>
              <Link to="/admin/manage/orders">
                order Management
              </Link>
              </Menu.Item>

              <Menu.Item key="5" icon={<UserOutlined/>}>
                <Link to="/admin/manage/admins">
                Admins Management
                </Link>
              </Menu.Item>

            </Menu>
          </Sider>
          <Layout>
            
            <Content style={{ margin: '24px 16px 0' }}>
              <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <div className={styles.content} style={{ paddingBottom: 24 }}>
                {props.children}
              </div>
              </div>
            </Content>

          </Layout>
        </Layout>

    </div>
  );
};
