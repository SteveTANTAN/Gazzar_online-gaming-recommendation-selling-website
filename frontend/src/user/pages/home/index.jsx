import styles from './index.less';
import { Button, Carousel, Tabs, Row, Col } from 'antd';
import GameCard from '../../components/GameCard';
import { useHistory } from 'umi';
import { useSelector } from 'dva';
import { get } from '@/user/utils/request';
import { useState,useEffect } from 'react';
import maleImg from '@/assets/Male.png'
import femaleImg from '@/assets/Female.png'
import mysteriousImg from '@/assets/Mysterious.png'
export default function Home() {
  const history = useHistory();
  const [data, setData] = useState({  });
  const {token} = useSelector(state=>state.app)
  useEffect(()=>{
    if(!token)return
    get(`/api/user/profile/${token}`).then(res=>{
      setData(res.user_info&&res.user_info[0]||{})
    })
  },[])
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
        {!!token&&<div className={styles.right + ' shadow'}>
          <div className="fr">
            <img src={[maleImg,femaleImg,mysteriousImg][data.gender]} alt="" />
            <div>
              <h4>{data.name}</h4>
              <div className="desc">{data.email}</div>
            </div>
          </div>
          <div className={styles.info + ' fr'}>
            <div className="pointer" onClick={() => history.push('/user/cart')}>
              <h2>Cart</h2>
              <div>0</div>
            </div>
            <div
              className="pointer"
              onClick={() => history.push('/user/order')}
            >
              <h2>Order</h2>
              <div>0</div>
            </div>
          </div>
        </div>}
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
