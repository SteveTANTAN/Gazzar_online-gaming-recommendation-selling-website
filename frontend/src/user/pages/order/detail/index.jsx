import { useEffect, useState } from 'react';
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
  message,
} from 'antd';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSetState } from 'ahooks';
import { useHistory, useParams } from 'umi';
import OrderItem from '@/user/components//OrderItem';
import { get, post } from '@/user/utils/request';
export default function Profile() {
  const history = useHistory();
  const params = useParams();
  const [submit, setSubmit] = useSetState({ rate: 0, comment: '' });
  const [data, setData] = useState({});
  const getData = () => {
    get(`/api/user/show_order/${sessionStorage.getItem('token')}`).then(
      (res) => {
        setData(res?.filter((i) => i.order_detail_id == params.id)?.[0] ?? {});
      },
    );
  };
  const save = () => {
    post('/api/user/order_rate&comment', {
      token: sessionStorage.getItem('token'),
      order_detail_id: params.id,
      ...submit,
    }).then(() => {
      getData();
      message.success('success');
    });
  };

  useEffect(() => {
    getData();
  }, []);
  const disabled = data.product_comment && data.product_rate;
  return (
    <div className="bg">
      <PageHeader
        className={styles.header}
        onBack={() => history.goBack()}
        title=" "
      ></PageHeader>
      <div className={styles.wrap}>
        <OrderItem {...data}></OrderItem>
        <div className="fr mt">
          <h2>CDKEY</h2>
          <div className="blank center">{data.cdkey}</div>
        </div>
        <Table
          bordered
          showHeader={false}
          pagination={false}
          size="small"
          className="mt"
          columns={[{ dataIndex: 'k' }, { dataIndex: 'v' }]}
          dataSource={[
            { k: 'Order number', v: data.order_id },
            { k: 'Trading hours', v: data.create_time },
            { k: 'Product Name', v: data.product_name },
            { k: 'Discount', v: data.product_discount },
            { k: 'Quantity', v: data.quantity },
            { k: 'Unit Price', v: data.product_price },
            { k: 'Actual transaction price', v: data.product_price },
          ]}
        ></Table>
        <br />
        <PageHeader
          className={styles.header}
          title="My Rate & Comment"
          subTitle="(Less than 500 character)"
          extra={
            <Rate
              disabled={disabled}
              defaultValue={data.product_rate}
              onChange={(v) => {
                setSubmit({ rate: v });
              }}
            />
          }
        ></PageHeader>
        <Input.TextArea
          disabled={disabled}
          rows={6}
          onChange={(e) => {
            setSubmit({ comment: e.target.value });
          }}
          defaultValue={data.product_comment}
        ></Input.TextArea>
        <br />
        {!disabled && (
          <Button
            type="primary"
            onClick={() => {
              save();
            }}
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}
