import React from 'react';
import { Input,  Space, Layout, Menu, message  } from 'antd';
import { Alert } from 'antd';
import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Rate,
  Checkbox,
  Typography,
  Row,
  Col,
} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { Table, Popconfirm } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link, useHistory } from 'umi';
const BASE_URL = 'http://localhost:55467';
const { Paragraph, Title} = Typography;
export default (props) => {
const { Option } = Select;
const { Header, Content, Footer, Sider } = Layout;
const history = useHistory();
const [Productname, setProductname] = React.useState('');
const [State, setState] = React.useState('');
const [description, setdescription] = React.useState('');
const [Uniteprice, setUniteprice] = React.useState(0);
const [Stock, setStock] = React.useState(0);
const [type, settype] = React.useState([]);
const [photo, setphoto] = React.useState([]);


const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const normFile = (e) => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const onFinish = (values) => {
  console.log('Received values of form: ', values);
  history.push('/admin/manage/games')
};






return (
  <Form
    name="validate_other"
    {...formItemLayout}
    onFinish={onFinish}
    initialValues={{

    }}
  >
    <center><Title level={3}>Add new Perpheral</Title></center>

      <Form.Item name="Product Name" label="Product Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="Unit Price" label="Unit Price" rules={[{ required: true }]}>
        <InputNumber min={1}/>
      </Form.Item>


    <Form.Item
      name="State"
      label="State"
      hasFeedback
      style={{width:'3 cm'}}
      rules={[
        {
          required: true,
          message: 'Please select your country!',
        },
      ]}
    >
      <Select placeholder="Please select a State" >
        <Option value="1">On Promotion</Option>
        <Option value="0">On Sales</Option>
      </Select>
    </Form.Item>
    <Form.Item name="Stock" label="Stock" rules={[{ required: true }]}>
        <InputNumber min={0}/>
    </Form.Item>


    <Form.Item
      name="Product Type"
      label="Product Type"
      rules={[
        {
          required: true,
          message: 'Please select the Product Type!',
          type: 'array',
        },
      ]}
    >
      <Select mode="multiple" placeholder="Please select the Product Type!">
        <Option value="Crafts">Crafts</Option>
        <Option value="Clothes">Clothes</Option>
        <Option value="Daily necessities">Daily necessities</Option>
        <Option value="GK">GK</Option>

      </Select>
    </Form.Item>
    <Form.Item name="Product description" label="Product description" rules={[{ required: true }]}>
        <Input.TextArea style={{height: '4cm'}}/>
      </Form.Item>

    <Form.Item
      name="Photo"
      label="Photo"
      valuePropName="fileList"
      getValueFromEvent={normFile}
      extra="Upload the photo here"
    >
      <Upload name="Photo" action="/upload.do" listType="picture">
        <Button icon={<UploadOutlined />}>Click to upload</Button>
      </Upload>
    </Form.Item>


    <Form.Item
      wrapperCol={{
        span: 12,
        offset: 6,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);
};