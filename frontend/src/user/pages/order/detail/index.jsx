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
// Order detail page
export default function Profile() {
  const history = useHistory();
  const params = useParams();
  const [submit, setSubmit] = useSetState({ rate: 0, comment: '' });
  const [data, setData] = useState({});
  const [update, setupdata] = useState(true);
  const [alloder, setalloder] = useState({});
  const updateData = () => {
    get(`/api/user/show_order/${localStorage.getItem('utoken')}`).then(
      (res) => {
        setData(res);
        var d=JSON.stringify(res);
        localStorage.setItem("uorder",d);
      },
    );
  };
  const getData = () => {
    var json=localStorage.getItem("uorder");
    var jsonObj=JSON.parse(json);
    setalloder(jsonObj);
    console.log("123");
    console.log(alloder);
    for (let i = 0; i < jsonObj.length;i++) {
      if (jsonObj[i].order_detail_id == params.id) {
        console.log(i);
        setData(jsonObj[i]);
        break;
      }
    }
    
  };
  const save = () => {
    post('/api/user/order_rate&comment', {
      token: localStorage.getItem('utoken'),
      order_detail_id: params.id,
      ...submit,
    }).then(() => {
      updateData();
      message.success('success');
    });
  };
  if (update) {
    
    getData();

    setupdata(false);
  }

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
            { k: 'Actual transaction price', v: data.product_discount_price },
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
