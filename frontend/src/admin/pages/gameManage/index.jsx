import { Table, Popconfirm } from 'antd';
import React from 'react';
import { Input, Button, Space, Layout, Menu,Tooltip, Row, Col, message} from 'antd';
import {
  UserOutlined,
  CustomerServiceOutlined,
  PieChartOutlined,
  CarOutlined,
  OrderedListOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Link, Redirect, useHistory } from 'umi';
const BASE_URL = 'http://localhost:55467';

export default (props) => {
const [gamename, setGamename] = React.useState('');
const [gamedata, setGamedata] = React.useState([]);
const [profileUpdate, setprofileUpdate] = React.useState(true);

const history = useHistory();

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: 'Product Name',
    dataIndex: 'product name',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    filters: [
      {
        text: 'Action & Adventure',
        value: 'Action & Adventure',
      },
      {
        text: 'FPS',
        value: 'FPS',
      },
      {
        text: 'Sports & Racing',
        value: 'Sports & Racing',
      },
      {
        text: 'RPG',
        value: 'RPG',
      },
      {
        text: 'Strategy',
        value: 'Strategy',
      },
      {
        text: 'Simulation',
        value: 'Simulation',
      },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.type.includes(value),
    width: '10%',
  },
  {
    title: 'Rate',
    dataIndex: 'rate',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: 'State',
    dataIndex: 'state',
    filters: [
      {
        text: 'On Sale',
        value: 'On Sale',
      },
      {
        text: 'On Promotion',
        value: 'On Promotion',
      },

    ],
    filterMode: 'tree',
    filterSearch: false,
    onFilter: (value, record) => record.state.includes(value),
    width: '10%',
  },
  {
    title: 'Last Modified by',
    dataIndex: 'last modified by',
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
    sorter: (a, b) => a.stock - b.stock,
  },
  {
    title: 'operation',
    key: 'delete',
    render: (text, record) =>
    <div>
      <Popconfirm title="Sure to delete?" onConfirm={() => {admindelete(record.email)}}>
        <a>Delete</a>
      </Popconfirm>
      <p></p>
        <Popconfirm title="Sure to Edit?" style={{}} onConfirm={() => {admindelete(record.email)}}>
        <a>Edit</a>
      </Popconfirm>
    </div>
  },

];

console.log('Success1:');
function admindelete (email) {


  console.log('record ddddddddddddddddd:', email);
  
  const delte = {
    email: email,
    token:localStorage.getItem('token'),
  };
  fetch(`${BASE_URL}/api/admin/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(delte),
  }).then((data) => {
    if (data.status === 200) {
      console.log('Success1:');
      data.json().then(result => {
        console.log('Success:', result);
        setprofileUpdate(true);
        message.success("Admin deleting successful 😊!!!")
      });
    } else if (data.status === 400) {
      data.json().then(result => {
        console.log('error 400', result.message);
        message.error((result.message.replace("<p>","")).replace("</p>",""))
      });
    }
  });
}

function setgamedata () {
  fetch(`${BASE_URL}/api/get/product/all/0/${localStorage.getItem('token')}`, {
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

        message.success("admin profile updating successful 😊!!!")
        setGamedata(result);
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
  setgamedata();
  setprofileUpdate(false);
}

const data = [
  {
    'id': '1',
    'product name': 'aaa',
    'type': 'FPS, RPG',
    'rate': 4.3,
    'state': 'On Sale',
    'last modified by': 'xxxxx@xxx.com',
    'stock': 15,
  },
  {
    'id': '2',
    'product name': 'aaa',
    'type': 'RPG',
    'rate': 1.3,
    'state': 'On Promotion',
    'last modified by': 'xxxxx@xxx.com',
    'stock': 5,
  },  {
    'id': '3',
    'product name': 'aaa',
    'type': 'RPG, Sports & Racing',
    'rate': 3.3,
    'state': 'On Sale',
    'last modified by': 'xxxxx@xxx.com',
    'stock': 10,
  },  {
    'id': '4',
    'product name': 'aaa',
    'type': 'Sports',
    'rate': 4.0,
    'state': 'On Promotion',
    'last modified by': 'xxxxx@xxx.com',
    'stock': 55,
  },
];

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

return(<div>

<center>
<Row>
<Col span={21}>
<Input onChange={e => setGamename(e.target.value)}  style={{ width: 240, borderRadius: 12, marginLeft: 20 }}
  value = {gamename} type = 'text' placeholder='Search Game Here' />
<Tooltip title="search">
<Button shape="circle" icon={<SearchOutlined />} onClick={() => {history.push('/user/search');}}/>
</Tooltip>
</Col>

<Link onClick={() => {}} to="/admin/manage/games/add" >
  <Button  type="primary" shape="round" >
  Add new Game
  </Button>
</Link>
</Row>

</center>
<Table columns={columns} dataSource={gamedata} onChange={onChange} />
</div>);
}