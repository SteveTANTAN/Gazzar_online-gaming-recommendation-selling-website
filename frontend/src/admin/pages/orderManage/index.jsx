import { Table, Popconfirm } from 'antd';
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

const data = [
  {
    'Order_id': '999342342444',
    'product_name': 'Elden Ring',
    'quantity': 10,
    'discount': '50%',
    'tranding_hours': '2022-01-01 00:00:00 (UTC+9:30)',
    'actual_price': 100,
  },
  {
    'Order_id': '999342342444',
    'product_name': 'Elden Ring',
    'quantity': 1,
    'discount': '50%',
    'tranding_hours': '2022-01-01 00:00:00 (UTC+9:30)',
    'actual_price': 70,
  },
  {
    'Order_id': '999342342445',
    'product_name': 'Elden Ring',
    'quantity': 8,
    'discount': '10%',
    'tranding_hours': '2022-01-01 00:00:00 (UTC+9:30)',
    'actual_price': 100,
  },
  {
    'Order_id': '999342342446',
    'product_name': 'Elden Ring',
    'quantity': 16,
    'discount': '30%',
    'tranding_hours': '2022-01-01 00:00:00 (UTC+9:30)',
    'actual_price': 80,
  },
];

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

return(<div>
  <PageHeader
    className="site-page-header"
    title="Order Management Page"
    subTitle=""
  />
<center>
<Input onChange={e => setGamename(e.target.value)}  style={{ width: 240, borderRadius: 12, marginLeft: 20 }}
  value = {gamename} type = 'text' placeholder='Search order by number Here' />
<Tooltip title="search">
<Button shape="circle" icon={<SearchOutlined />} onClick={() => {history.push('/user/search');}}/>
</Tooltip>

</center>
<Table columns={columns} dataSource={data} onChange={onChange} />
</div>);
}