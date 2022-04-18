import { useEffect, useState } from 'react';
import styles from './index.less';
import {
  PageHeader,
  Pagination,
  Button,
  Space,
  Tabs,
  InputNumber,
  Rate,
  Checkbox,
} from 'antd';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSetState } from 'ahooks';
import { Link, useHistory } from 'umi';
import GameCard from '../../components/GameCard';
import OrderItem from '../../components/OrderItem';
import { get, post } from '@/user/utils/request';

export default function Profile() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [like, setLike] = useState([]);
  const [page, setPage] = useSetState({ current: 1, total: 0, size: 5 });
  const getData = () => {
    get(`/api/user/show_order/${sessionStorage.getItem('token')}`).then(
      (res) => {
        setData(res ?? []);
        setPage({ current: 1, total: res.length ?? 0 });
      },
    );
  };

  useEffect(() => {
    getData();
    get(`/api/user/customized/homepage/${sessionStorage.getItem('token')}`).then((res) => {
      const l = res?.game??[]
      if(l.length>3)length=3
      setLike(l);
    });
  }, []);
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.left}>
          <div>
            <PageHeader
              className={styles.header}
              onBack={() => history.goBack()}
              title="My Order"
              subTitle="(click blocks to check more details)"
            ></PageHeader>
            <div className={styles.items}>
              {data
                .slice((page.current - 1) * page.size, page.current * page.size)
                .map((item) => (
                  <div key={item.order_detail_id}>
                    <Link to={'/user/order-detail/' + item.order_detail_id}>
                      <OrderItem
                        {...item}
                        onDelete={() => {
                          getData();
                        }}
                      ></OrderItem>
                    </Link>
                  </div>
                ))}
            </div>
            <div className="center mt">
              <Pagination
                total={page.total}
                pageSize={page.size}
                current={page.current}
                onChange={(current) => setPage({ current })}
              ></Pagination>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <h1>Guess you Like...</h1>
          {like.map((item) => (
            <div className="fr">
              <GameCard {...item}></GameCard>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
