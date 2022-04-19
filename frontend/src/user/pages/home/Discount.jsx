import styles from './SearchResult.less';
import { PageHeader, Checkbox, Tabs, Row, Col, Radio } from 'antd';
import GameCard from '../../components/GameCard';
import { useHistory, useParams } from 'umi';
import { useEffect, useState } from 'react';
import { get } from '@/user/utils/request';
// 打折商品页面
export default function SearchResult() {
  const history = useHistory();
  const [data, setData] = useState([]);
  useEffect(() => {
    get('/api/user/surprise/store/' + sessionStorage.getItem('token')).then(
      (res) => {
        setData(res);
      },
    );
  }, []);
  return (
    <>
      <br />
      <PageHeader title=" " onBack={() => history.goBack()}></PageHeader>
      <br />
      <div className="center">
        <span
          style={{
            fontSize: 24,
            padding: 22,
            color: 'white',
            background: 'red',
          }}
        >
          Discount of This Week: {data.surprise_discount??''}% OFF
        </span>
      </div>
      <br /> <br />
      <div style={{ display: 'flex' }}>
        <div className={styles.right}></div>
        <Row gutter={[20, 20]}>
          {data.surprise_product?.map((item) => (
            <Col span={6} key={item.product_id}>
              <GameCard
                isDiscount
                id={item.product_id}
                name={item.name}
                {...item}
              ></GameCard>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
