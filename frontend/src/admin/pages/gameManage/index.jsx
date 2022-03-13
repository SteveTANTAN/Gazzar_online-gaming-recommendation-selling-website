import { Table } from 'antd';
export default (props) => {
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
        text: 'Action&Adventure',
        value: 'Action&Adventure',
      },
      {
        text: 'FPS',
        value: 'FPS',
      },
      {
        text: 'Sports&Racing',
        value: 'Sports&Racing',
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

];

const data = [
  {
    'id': '1',
    'product name': 'aaa',
    'type': 'FPS',
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
    'type': 'RPG',
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

return(<Table columns={columns} dataSource={data} onChange={onChange} />);
}