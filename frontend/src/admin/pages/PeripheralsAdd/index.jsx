import React, { useState } from 'react';
import { Input,  Space, Layout, Menu, message  } from 'antd';
import ImgCrop from 'antd-img-crop';
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



const onFinish = (values) => {
  values['Photo'] = fileList;
  values['Cover'] = cover;
  console.log('Received values of form: ', values);
  console.log('Received values of form: ', values);
  const add = {
    token:localStorage.getItem('token'),
    product_dict: values,
  };
  fetch(`${BASE_URL}/api/add/peripherals`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(add),
  }).then((data) => {
    if (data.status === 200) {
      console.log('Success1:');
      data.json().then(result => {
        console.log('Success:', result);
        // setprofileUpdate(true);
        message.success("Peripherals adding successful 😊!!!")
        history.push('/admin/manage/Peripherals')

      });
    } else if (data.status === 400) {
      data.json().then(result => {
        console.log('error 400', result.message);
        message.error((result.message.replace("<p>","")).replace("</p>",""))
      });
    }
  });

};

  const [fileList, setFileList] = useState([]);

  const ChangefileList = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const [cover, setcover] = useState([]);
  const ChangecoverList =({ fileList: newFileList }) => {
    setcover(newFileList);
  };
  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
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
      <Form.Item name="Discount" label="Discount(%)" rules={[{ required: true }]}>
        <InputNumber min={0} Max={100} />
      </Form.Item>

    <Form.Item
      name="State"
      label="State"
      hasFeedback
      style={{width:'3 cm'}}
      rules={[
        {
          required: true,
          message: 'Please select a State!',
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
        <Option value="Garage Kit">Garage Kit</Option>

      </Select>
    </Form.Item>
    <Form.Item name="Product description" label="Product description" rules={[{ required: true }]}>
        <Input.TextArea style={{height: '4cm'}}/>
      </Form.Item>



    <Form.Item
    name="Photo"
    label="Photo"
    extra="Upload the photo here"
    >
    <ImgCrop rotate>
      <Upload
        //name="Photo"
        //listType="picture"
        listType="picture-card"
        fileList={fileList}
        onChange={ChangefileList}
        onPreview={onPreview}
      >
        {fileList.length < 5 && '+ Upload'}
      </Upload>
    </ImgCrop>
    </Form.Item>

    <Form.Item
    name="Cover"
    label="Cover"
    extra="Upload the Cover here (only One)"
    >
    <ImgCrop rotate>
      <Upload
        //listType="picture"
        listType="picture-card"
        fileList={cover}
        onChange={ChangecoverList}
        onPreview={onPreview}
      >
        {cover.length < 1 && '+ Upload'}
      </Upload>
    </ImgCrop>
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
}