import styles from './index.less';
import { Input, Button, Space, Layout, Menu  } from 'antd';
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
export default (props) => {
  const history = useHistory();
  const { Header, Content, Footer, Sider } = Layout;
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.content + ' fr'}>
          <Space>
            <Link to="/admin/manage">
              <img className={styles.logo} src={logoImg} alt="" />
            </Link>
          </Space>
          <Space style={{ width: 20}}>   </Space>
          <div className="blank" style={{ fontSize:25, fontWeight: 600}}>  Admin </div>
          <Space>
            <Link className={styles.button} to="/admin/login">
              <Button type="primary" style={{ borderRadius: 16 }}>
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
                overview
              </Menu.Item>
              <Menu.Item key="2" icon={<CarOutlined/>}>
                Games Management
              </Menu.Item>
              <Menu.Item key="3" icon={<CustomerServiceOutlined/>}>
                Peripherals Management
              </Menu.Item>
              <Menu.Item key="4" icon={<OrderedListOutlined/>}>
                order Management
              </Menu.Item>
              <Link className={styles.button} to="/admin/manage/admins">
              <Menu.Item key="5" icon={<UserOutlined/>}>
                Admins Management
              </Menu.Item>
              </Link>
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