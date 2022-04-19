import React from 'react';
import { Input, Button, Space, Layout, Menu, message,PageHeader} from 'antd';
import { List, Card } from 'antd';

import { Alert } from 'antd';
import {
  Form,
  Checkbox,
  InputNumber,
  Row,
  Col,
} from 'antd';
import { Table, Popconfirm } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link, useHistory } from 'umi';
const BASE_URL = 'http://localhost:55467';

export default (props) => {
const { Header, Content, Footer, Sider } = Layout;
const history = useHistory();
const [email, setemail] = React.useState('');
const [password, setpassword] = React.useState('');
const [admin_data, setadmin_data] = React.useState([]);
const [profileUpdate, setprofileUpdate] = React.useState(true);


function admindata () {

  fetch(`/api/get/overview/all/${localStorage.getItem('token')}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    // body: JSON.stringify(loginPeople),
  }).then((data) => {
    if (data.status === 200) {
      console.log('Success1:');

      data.json().then(result => {
        console.log('Success:', result);

        message.success("Overall profile updating successful 😊!!!")
        setadmin_data(result);
      });
    } else if (data.status === 400) {
      data.json().then(result => {
        console.log('error 400', result.message);
        message.error((result.message.replace("<p>","")).replace("</p>",""))
      });
    }
  })
}
if (profileUpdate) {
  admindata();
  setprofileUpdate(false);
}
 return (
   <div>
    <PageHeader
    className="site-page-header"
    title="Overview Page"
    subTitle=""
  />
  <Header className="site-layout-sub-header-background" style={{ padding: 0 }} ></Header>
  <List
    grid={{
      gutter: 16,
      xs: 1,
      sm: 2,
      md: 4,
      lg: 4,
      xl: 6,
      xxl: 3,
    }}
    dataSource={admin_data}
    renderItem={item => (
      <List.Item>
        <Card title={item.title}>{item.result}</Card>
      </List.Item>
    )}
  /></div>
)
    }