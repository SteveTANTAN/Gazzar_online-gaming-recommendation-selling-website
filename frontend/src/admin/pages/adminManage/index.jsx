
import { Table, Popconfirm } from 'antd';
export default (props) => {
const columns = [
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Password', dataIndex: 'password', key: 'password' },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: ( ) => (
      <Popconfirm title="Sure to delete?" >
        <a>Delete</a>
      </Popconfirm>
    ),
  },
];

const data = [
  {
    key: 1,
    email: 'xxxxxxxx@xxxxx.com',
    password: 'asdasdasdasd',
    description: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  },

];

return (
  <Table
    columns={columns}
    dataSource={data}
  />);
  };