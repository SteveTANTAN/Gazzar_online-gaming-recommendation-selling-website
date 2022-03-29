import styles from './SearchResult.less';
import { PageHeader, Checkbox, Tabs, Row, Col, Radio } from 'antd';
import GameCard from '../../components/GameCard';
import { useHistory, useParams } from 'umi';
import { useEffect, useState } from 'react';
import { get } from '@/user/utils/request';

export default function SearchResult() {
  const history = useHistory();
  const param = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!param.search) {
      return;
    }
    get('/api/user/search/' + param.search).then((res) => {
      setData(res);
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
          <Radio.Group style={{ width: '100%', marginLeft: 22 }}>
            <Row>
              {['Ascending', 'Descending'].map((item) => (
                <Col span={24}>
                  <Radio value={item}>{item}</Radio>
                </Col>
              ))}
            </Row>
          </Radio.Group>
          <h3 className="mt">Games</h3>
          <Checkbox.Group style={{ width: '100%', marginLeft: 22 }}>
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
          <Checkbox.Group style={{ width: '100%', marginLeft: 22 }}>
            <Row>
              {['Costumes', 'Game props'].map((item) => (
                <Col span={24}>
                  <Checkbox value={item}>{item}</Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </div>
        <div className={styles.right}></div>
        <Row gutter={[20, 20]}>
          {data.map((item) => (
            <Col span={8} key={item.id}>
              <GameCard id={item.product_id} name={item.name}></GameCard>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
