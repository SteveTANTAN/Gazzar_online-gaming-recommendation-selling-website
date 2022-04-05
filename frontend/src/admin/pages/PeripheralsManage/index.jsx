import { Table, Popconfirm } from 'antd';
import React from 'react';
import { Input, Button, Space, Layout, Menu,Tooltip, Row, Col, message,PageHeader} from 'antd';
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
        text: 'Game Props',
        value: 'Game Props',
      },
      {
        text: 'Costume',
        value: 'Costume',
      },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.type.includes(value),
    width: '20%',
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
      <Popconfirm title="Sure to delete?" onConfirm={() => {productdelete(record.id)}}>
        <a>Delete</a>
      </Popconfirm>
      <p></p>
        <Popconfirm title="Sure to Edit?" style={{}} onConfirm={() => {{history.push(`/admin/manage/peripherals/edit/${record.id}`);}}}>
        <a>Edit</a>
      </Popconfirm>
    </div>
  },
];

console.log('Success1:');
function productdelete (id) {
  console.log('record ddddddddddddddddd:', id);
  
  const delte = {
    product_id: id,
    token:localStorage.getItem('token'),
  };
  fetch(`/api/delete/product`, {
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
        message.success("Peripherals deleting successful 😊!!!")
      });
    } else if (data.status === 400) {
      data.json().then(result => {
        console.log('error 400', result.message);
        message.error((result.message.replace("<p>","")).replace("</p>",""))
      });
    }
  });
}
function productsearch (text) {
  if (!text) {
    setgamedata();
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

function setgamedata () {
  fetch(`/api/get/product/all/1/${localStorage.getItem('token')}`, {
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

        message.success("Peripherals details updating successful 😊!!!")
        
        setGamedata(result);
        var d=JSON.stringify(result);
        localStorage.setItem("PeipheralsData",d);
        //将JSON字符串转换成为JSON对象输出
        var json=localStorage.getItem("PeipheralsData");
        var jsonObj=JSON.parse(json);
        //localStorage.setItem('PeipheralsData', gamedata);
        console.log("data", jsonObj)
        
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
  if (localStorage.getItem('PeipheralsData') != null) {
    var json=localStorage.getItem("PeipheralsData");
    var jsonObj=JSON.parse(json);
    setGamedata(jsonObj);
  }

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
  <PageHeader
    className="site-page-header"
    title="Peripherals Management Page"
    subTitle=""
  />
<center>
<Row>
<Col span={21}>
<Input onChange={e => setGamename(e.target.value)}  style={{ width: 240, borderRadius: 12, marginLeft: 20 }}
  value = {gamename} type = 'text' placeholder='Search Peripherals Here' />
<Tooltip title="search">
<Button shape="circle" icon={<SearchOutlined />} onClick={() => {productsearch(gamename)}}/>
</Tooltip>
</Col>

<Link onClick={() => {}} to="/admin/manage/Peripherals/add" >
  <Button  type="primary" shape="round" >
  Add new Peripherals
  </Button>
</Link>
</Row>

</center>
<Table columns={columns} dataSource={gamedata} onChange={onChange} />
</div>);
}