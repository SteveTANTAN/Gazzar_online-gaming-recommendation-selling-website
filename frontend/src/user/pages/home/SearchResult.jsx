import styles from './SearchResult.less';
import { PageHeader, Checkbox, Tabs, Row, Col, Radio } from 'antd';
import GameCard from '../../components/GameCard';
import { useHistory, useParams } from 'umi';
import { useEffect, useState } from 'react';
import { get } from '@/user/utils/request';

export default function SearchResult() {
  const history = useHistory();
  const param = useParams();
  const [orData, setOrData] = useState([]);
  const [data, setData] = useState([]);
  const [sort, setSort] = useState();
  const [type, setType] = useState([]);
  const [type2, setType2] = useState([]);
  useEffect(() => {
    let newData = [...orData];
    if (type.length > 0) {
      newData = [];
      orData.forEach((item) => {
        let f = false;
        type.forEach((t) => {
          if (item?.type?.some((i) => i.startsWith(t))) {
            f = true;
          }
        });
        type2.forEach((t) => {
          if (item?.type?.some((i) => i.startsWith(t))) {
            f = true;
          }
        });
        if (f) {
          newData.push(item);
        }
      });
    }
    if (sort) {
      newData.sort((a, b) => {
        if (sort === 'Ascending') {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    }

    setData(newData);
  }, [orData, sort, type,type2]);
  useEffect(() => {
    if (!param.search) {
      return;
    }
    get('/api/user/search/' + param.search).then((res) => {
      setOrData(res);
    });
  }, [param.search]);
  return (
    <>
      <br />
      <PageHeader
        title="Search Result"
        onBack={() => history.goBack()}
      ></PageHeader>
      <br />
      <div style={{ display: 'flex' }}>
        <div className={styles.left + ' shadow'}>
          <h3>Price</h3>
          <Radio.Group
            style={{ width: '100%', marginLeft: 22 }}
            onChange={(e) => setSort(e.target.value)}
          >
            <Row>
              {['Ascending', 'Descending'].map((item) => (
                <Col span={24}>
                  <Radio value={item}>{item}</Radio>
                </Col>
              ))}
            </Row>
          </Radio.Group>
          <h3 className="mt">Games</h3>
          <Checkbox.Group
            style={{ width: '100%', marginLeft: 22 }}
            onChange={(v) => setType(v)}
          >
            <Row>
              {[
                'Action',
                'Casual',
                'FPS',
                'Sports',
                'RPG',
                'Strategy',
                'Simulation',
              ].map((item) => (
                <Col span={24}>
                  <Checkbox value={item}>{item}</Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
          <h3 className="mt">Peripherals</h3>
          <Checkbox.Group style={{ width: '100%', marginLeft: 22 }} onChange={(v) => setType2(v)}>
            <Row>
              {['Costume', 'Game props'].map((item) => (
                <Col span={24}>
                  <Checkbox value={item}>{item}</Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </div>
        <div className={styles.right}>
          <Row gutter={[20, 20]}>
            {data.map((item) => (
              <Col span={8} key={item.product_id}>
                <GameCard
                  id={item.product_id}
                  name={item.name}
                  {...item}
                ></GameCard>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
}
