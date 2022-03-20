import React from 'react';
import { Input,  Space, Layout, Menu, message, Modal} from 'antd';
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
  visible,
  Row,
  Col,
} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { Table, Popconfirm } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link, useHistory, useParams} from 'umi';
const BASE_URL = 'http://localhost:55467';
const { Paragraph, Title} = Typography;
export default (props) => {
const params = useParams();
const { Option } = Select;
const { Header, Content, Footer, Sider } = Layout;
const history = useHistory();
const [Productname, setProductname] = React.useState('');
const [State, setState] = React.useState('');
const [description, setdescription] = React.useState('');
const [Uniteprice, setUniteprice] = React.useState(0);
const [Stock, setStock] = React.useState(0);
const [type, settype] = React.useState([]);
const [product_data, setproduct_data] = useState();

const [cover, setcover] = React.useState([]);
const [fileList, setFileList] = React.useState([]);
const [update, setupdate] = React.useState(true);

console.log('Received values of gameid: ', params.gameid);


const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
const [form] = Form.useForm(); //定义form
form.setFieldsValue(product_data)
function productdata () {
  fetch(`${BASE_URL}/api/get/product/${localStorage.getItem('token')}/${params.gameid}`, {
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
        console.log('Success output:', result.output);
        message.success("product details fetching successful 😊!!!")
        /* for (let i = 0; i < result.output['Photo']; i++) {
          result.output['Photo'][i]= "data:image/png;base64," + result.output[i]['thumbUrl'];
        }
        result.output['Cover']= "data:image/png;base64," + result.output['Cover'][0]['thumbUrl']; */
        //setproduct_data(result);
        setFileList(result['Photo'])
        setcover(result['Cover'])
        form.setFieldsValue(result)
        console.log('Success pppoutput:', product_data);
        console.log('Success rrroutput:', result);

      });
    } else if (data.status === 400) {
      data.json().then(result => {
        console.log('error 400', result.message);
        message.error("cannot fetch this product details!!!")
        message.error((result.message.replace("<p>","")).replace("</p>",""))
      });
    }
  })
}

if (update) {
  productdata(setproduct_data);
  setupdate(false);
}
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
  values['Photo'] = fileList;
  values['Cover'] = cover;
  values['Product Id'] = params.gameid;

  console.log('Received values of form: ', values);
  const delte = {
    token:localStorage.getItem('token'),
    product_dict: values,
  };
  fetch(`${BASE_URL}/api/edit/products`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(delte),
  }).then((data) => {
    if (data.status === 200) {
      console.log('Success1:');
      data.json().then(result => {
        console.log('Success:', result);
        // setprofileUpdate(true);
        history.push('/admin/manage/games')

      });
    } else if (data.status === 400) {
      data.json().then(result => {
        console.log('error 400', result.message);
        message.error((result.message.replace("<p>","")).replace("</p>",""))
      });
    }
  });
};



const ChangefileList = ({ fileList: newFileList }) => {
  setFileList(newFileList);
};
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

if (!fileList) {
  message.success("Game editing successful 😊!!!")


} 

return (

  <Form
    form={form}
    name="validate_other"
    {...formItemLayout}
    onFinish={onFinish}
    initialValues={product_data}
  >
  <center><Title level={3}>Edit Game</Title></center>
    <Form.Item name="Product Id" label="Game ID" >
    {params.gameid}
    </Form.Item>
    <Form.Item name="Product Name" label="Game Name" rules={[{ required: true }]}>
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
    label="Game Type"
    rules={[
      {
        required: true,
        message: 'Please select the Game Type!',
        type: 'array',
      },
    ]}
  >
    <Select mode="multiple" placeholder="Please select the Product Type!">
      <Option value="Action & Adventure">Action & Adventure</Option>
      <Option value="FPS">FPS</Option>
      <Option value="Sports & Racing">Sports & Racing</Option>
      <Option value="RPG">RPG</Option>
      <Option value="Strategy">Strategy</Option>
      <Option value="Simulation">Simulation</Option>
    </Select>
  </Form.Item>
  <Form.Item name="Product description" label="Game Description" rules={[{ required: true }]}>
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

)

};