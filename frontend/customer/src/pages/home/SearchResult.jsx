import styles from './SearchResult.less';
import { PageHeader, Checkbox, Tabs, Row, Col, Radio } from 'antd';
import GameCard from './GameCard';
import { useHistory } from 'umi';

export default function SearchResult() {
  const history = useHistory();
  return (
    <>
      <br />
      <PageHeader
        className={styles.pageHeader}
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
          {[1, 2, 3, 4, 5].map((item) => (
            <Col span={8}>
              <GameCard></GameCard>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
