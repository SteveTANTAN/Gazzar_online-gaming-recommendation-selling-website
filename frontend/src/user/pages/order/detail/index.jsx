import styles from './index.less';
import {
  PageHeader,
  Table,
  Button,
  Space,
  Tabs,
  Input,
  Rate,
  DatePicker,
} from 'antd';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSetState } from 'ahooks';
import { useHistory } from 'umi';
import OrderItem from '@/user/components//OrderItem';

export default function Profile() {
  const history = useHistory();
  return (
    <div className="bg">
      <PageHeader
        className={styles.header}
        onBack={() => history.goBack()}
        title=" "
      ></PageHeader>
      <div className={styles.wrap}>
        <OrderItem></OrderItem>
        <div className="fr mt">
          <h2>CDKEY</h2>
          <div className="blank center">xxxxx-xxxxx-xxxxx</div>
        </div>
        <Table
          bordered
          showHeader={false}
          pagination={false}
          size="small"
          className="mt"
          columns={[{ dataIndex: 'k' }, { dataIndex: 'v' }]}
          dataSource={[
            { k: 'Order number', v: '24455463489804852731' },
            { k: 'Trading hours', v: '2022-01-01 00：00：00 (UTC+9:30)‎' },
            { k: 'Product Name', v: '2022-01-01 00：00：00 (UTC+9:30)‎' },
            { k: 'Discount', v: '50%' },
            { k: 'Quantity', v: '1' },
            { k: 'Unit Price', v: '50%' },
            { k: 'Actual transaction price', v: '50%' },
          ]}
        ></Table>
        <br />
        <PageHeader
          className={styles.header}
          title="My Rate & Comment"
          subTitle="(Less than 500 character)"
          extra={<Rate />}
        ></PageHeader>
        <Input.TextArea
          rows={6}
          defaultValue={
            'orem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus p'
          }
        ></Input.TextArea>
      </div>
    </div>
  );
}
