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
  message,
} from 'antd';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSetState } from 'ahooks';
import { useHistory } from 'umi';
import OrderItem from '../../components/OrderItem';
import { get, put } from '@/user/utils/request';
import { useEffect, useState } from 'react';
export default function Profile() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const getData = ()=>{
    get(`/api/user/show/cart/${sessionStorage.getItem('token')}`).then(
      (res) => {
        setData(res);
      },
    );
  }
  useEffect(() => {
    getData()
  }, []);
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.left}>
          <div>
            <PageHeader
              className={styles.header}
              onBack={() => history.goBack()}
              title="My Cart"
              subTitle="(tick multiple blocks to check out)"
            ></PageHeader>
            <div className={styles.items}>
              {data.map((item) => (
                <div className="fr" key={item.cart_id}>
                  <Checkbox
                    checked={item.checked !== 0}
                    onChange={(e) => {
                      put(`/api/user/edit/checked`, {
                        token: sessionStorage.getItem('token'),
                        cart_id: item.cart_id,
                        checked: e.target.checked ? 1 : 0,
                      }).then(getData);
                    }}
                  ></Checkbox>
                  <OrderItem {...item}></OrderItem>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <img
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1113%2F052420105424%2F200524105424-8-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649384798&t=f7a0a0bff022f75ffe30557d7cb5d60e"
            alt=""
          />
        </div>
      </div>

      <div className={styles.bottom + ' center mt'}>
        <Button type="primary" onClick={() => history.push('/user/payment')}>
          Check Out
        </Button>
      </div>
    </>
  );
}
