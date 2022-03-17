import { Table } from 'antd';
import React from 'react';
import { Input, Button, Space, Layout, Menu,Tooltip  } from 'antd';
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
        text: 'Crafts',
        value: 'Crafts',
      },
      {
        text: 'Clothes',
        value: 'Clothes',
      },
      {
        text: 'Daily necessities',
        value: 'Daily necessities',
      },
      {
        text: 'GK',
        value: 'GK',
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

];

const data = [
  {
    'id': '1',
    'product name': 'bbqbb',
    'type': 'Daily necessities',
    'rate': 4.3,
    'state': 'On Sale',
    'last modified by': 'xxxxx@xxx.com',
    'stock': 15,
  },
  {
    'id': '2',
    'product name': 'bbwbb',
    'type': 'Clothes',
    'rate': 1.3,
    'state': 'On Promotion',
    'last modified by': 'xxxxx@xxx.com',
    'stock': 5,
  },  
  {
    'id': '3',
    'product name': 'wbbbb',
    'type': 'Crafts',
    'rate': 3.3,
    'state': 'On Sale',
    'last modified by': 'xxxxx@xxx.com',
    'stock': 10,
  },  
  {
    'id': '4',
    'product name': 'bbqbb',
    'type': 'GK',
    'rate': 4.0,
    'state': 'On Promotion',
    'last modified by': 'xxxxx@xxx.com',
    'stock': 55,
  },
  {
    'id': '5',
    'product name': 'bwwwbbb',
    'type': 'GK',
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
  <Input onChange={e => setGamename(e.target.value)}  style={{ width: 240, borderRadius: 12, marginLeft: 20 }}
    value = {gamename} type = 'text' placeholder='Search Product Here' />
  <Tooltip title="search">
  <Button shape="circle" icon={<SearchOutlined />} onClick={() => {history.push('/user/search');}}/>
  </Tooltip>
  <Link onClick={() => {}} to="/admin/manage/Peripherals/add" >
  <Button  type="primary" shape="round" >
  Add new Perpherals
  </Button>
</Link>

  </center>
  <Table columns={columns} dataSource={data} onChange={onChange} />
  </div>);
}