import { Table, Popconfirm, Select,Cascader, Radio} from 'antd';
import React from 'react';
import { Input, Button, Space, Layout, Menu,Tooltip, PageHeader} from 'antd';
import {
  UserOutlined,
  CustomerServiceOutlined,
  PieChartOutlined,
  CarOutlined,
  OrderedListOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Link, Redirect, useHistory } from 'umi';
export default (props) => {
const [gamename, setGamename] = React.useState('');
const [orderseach, setorderseach] = React.useState('');
const [orderData, setorderData] = React.useState([]);
const [profileUpdate, setprofileUpdate] = React.useState(true);

const history = useHistory();

const columns = [
  {
    title: 'Order Number',
    dataIndex: 'Order_id',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: 'Product Name',
    dataIndex: 'product_name',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
  },
  {
    title: 'Tranding Hours',
    dataIndex: 'tranding_hours',
  },
  {
    title: 'Actual Transaction Price (AUD)',
    dataIndex: 'actual_price',
    sorter: (a, b) => a.actual_price - b.actual_price,
  },

];

function Ordersearch (text, type){
  console.log('Success:', text, type);
/*
  if (!text) {
    setOrderData();
    return
  }

  fetch(`/api/admin/search/${localStorage.getItem('token')}/${text}/1`, {
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

        message.success("Games search results updating successful 😊!!!")
        setorderData(result);

      });
    } else if (data.status === 400) {
      data.json().then(result => {
        console.log('error 400', result.message);
        message.error((result.message.replace("<p>","")).replace("</p>",""))
      });
    }
  }) */
}

function setOrderData () {
  fetch(`/api/get/orders/all/${localStorage.getItem('token')}`, {
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

        message.success("Orders details updating successful 😊!!!")
        setorderData(result);
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
  setOrderData();
  setprofileUpdate(false);
}
function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}
const Search_options = [
{
  value: '0',
  label: 'By Order ID',
},
{
  value: '1',
  label: 'By Product Name',
},
];


return(<div>
  <PageHeader
    className="site-page-header"
    title="Order Management Page"
    subTitle=""
  />
<center>
<Input onChange={e => setGamename(e.target.value)}  style={{ width: 240, borderRadius: 12, marginLeft: 20 }}
  value = {gamename} type = 'text' placeholder='Search Here'/>
{/* <Cascader onChange={e => setorderseach(e.target.value)} style={{ width: 240, borderRadius: 12, marginLeft: 20 }}
type = 'text' options={Search_options}  placeholder="Please select" /> */}

{/* <Cascader style={{ width: 120, borderRadius: 12, marginLeft: 20 }} placeholder="Please select" options={Search_options}  
 onChange={e => setorderseach(e.target.value)}/> */}

<Radio.Group  onChange={e => setorderseach(e.target.value)} value={orderseach} options={Search_options}>
  
  {/* <Radio value={1}>A</Radio>
  <Radio value={2}>B</Radio>
  <Radio value={3}>C</Radio>
  <Radio value={4}>D</Radio> */}
</Radio.Group>

<Tooltip title="search">
<Button shape="circle" icon={<SearchOutlined />} onClick={() => {Ordersearch(gamename, orderseach)}}/>
</Tooltip>

</center>
{/* <Table columns={columns} dataSource={orderData} onChange={onChange} /> */}
</div>);
}