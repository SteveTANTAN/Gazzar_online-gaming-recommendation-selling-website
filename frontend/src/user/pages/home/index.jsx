import styles from './index.less';
import { Button, Carousel, Tabs, Row, Col } from 'antd';
import GameCard from '../../components/GameCard';
import { useHistory } from 'umi';

export default function Home() {
  const history = useHistory();
  return (
    <>
      <div className={styles.top + ' fr'}>
        <div className={styles.left + ' shadow'}>
          <Carousel autoplay>
            <div>
              <img
                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1113%2F052420105424%2F200524105424-8-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649384798&t=f7a0a0bff022f75ffe30557d7cb5d60e"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1113%2F052420105424%2F200524105424-8-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649384798&t=f7a0a0bff022f75ffe30557d7cb5d60e"
                alt=""
              />
            </div>
          </Carousel>
        </div>
        <div className={styles.right + ' shadow'}>
          <div className="fr">
            <img src="" alt="" />
            <div>
              <h4>UserName</h4>
              <div className="desc">username@gmail.com</div>
            </div>
          </div>
          <div className={styles.info + ' fr'}>
            <div className="pointer" onClick={() => history.push('/user/cart')}>
              <h2>Cart</h2>
              <div>10</div>
            </div>
            <div
              className="pointer"
              onClick={() => history.push('/user/order')}
            >
              <h2>Order</h2>
              <div>10</div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <Tabs type="card">
        <Tabs.TabPane tab="Games" key="1"></Tabs.TabPane>
        <Tabs.TabPane tab="Peripherals" key="Peripherals"></Tabs.TabPane>
      </Tabs>
      <Row gutter={[20, 20]}>
        {[1, 2, 3, 4, 5].map((item) => (
          <Col span={6}>
            <GameCard></GameCard>
          </Col>
        ))}
      </Row>
    </>
  );
}
