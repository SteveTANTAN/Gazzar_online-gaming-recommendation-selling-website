import styles from './index.less';
import {
  PageHeader,
  Carousel,
  Button,
  Space,
  Tabs,
  InputNumber,
  Rate,
  Checkbox,
} from 'antd';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSetState } from 'ahooks';
import { useHistory, useParams } from 'umi';
import OrderItem from '@/user/components//OrderItem';
import Payment from '@/user/components//Payment';
import { useEffect, useState } from 'react';
import { get } from '@/user/utils/request';
export default function PaymentPage() {
  const history = useHistory();
  const param = useParams();
  const [data, setData] = useState({});
  const [payment, setPayment] = useState([]);
  useEffect(() => {
    if (param.id) {
      get(
        `/api/user/buynow/${param.id}/${
          param.quantity
        }/${sessionStorage.getItem('token')}`,
      ).then((res) => {
        setData({ ...res, checkout_products: [res.checkout_product || {}] });
      });
    } else {
      get(`/api/user/checkout/cart/${sessionStorage.getItem('token')}`).then(
        (res) => {
          setData(res);
        },
      );
    }
    get(`/api/user/show/payment/${sessionStorage.getItem('token')}`).then(
      (res) => {
        setPayment(res);
      },
    );
  }, [param.id]);
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.left}>
          <div>
            <PageHeader
              className={styles.header}
              onBack={() => history.goBack()}
              title=""
            ></PageHeader>
            <div className={styles.content}>
              <div className={styles.items}>
                {data.checkout_products?.map((item) => (
                  <div key={item.product_id}>
                    <OrderItem {...item}></OrderItem>
                  </div>
                ))}
              </div>
              <br />
              <PageHeader
                className={styles.header}
                title="Payment Option"
              ></PageHeader>
              <div className={styles.items}>
                {payment?.map((item) => (
                  <div key={item.payment_detail_id}>
                    <Payment {...item}></Payment>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right + ' shadow'}>
          <hr />
          <div className="fr">
            <h4 className="blank">Original Price</h4>
            <span>＄{data.original_price}</span>
          </div>
          <div className="fr">
            <h4 className="blank">Total Discount</h4>
            <span>＄{data.total_discount}</span>
          </div>
          <div className="fr">
            <h4 className="blank">Actual Transaction</h4>
            <span>＄{data.actual_transaction}</span>
          </div>
          <hr />
          <div className="center">
            <Button type="primary">Place Your Order in AUD</Button>
          </div>
        </div>
      </div>
    </>
  );
}
