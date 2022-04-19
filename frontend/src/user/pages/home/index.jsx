import styles from './index.less';
import { Button, Carousel, Tabs, Row, Col } from 'antd';
import GameCard from '../../components/GameCard';
import { useHistory,Link } from 'umi';
import { useSelector } from 'dva';
import { get } from '@/user/utils/request';
import { useState, useEffect } from 'react';
import maleImg from '@/assets/Male.png';
import femaleImg from '@/assets/Female.png';
import mysteriousImg from '@/assets/Mysterious.png';
import bannerImg from '@/assets/banner1.png';
import { useSetState } from 'ahooks';
export default function Home() {
  const history = useHistory();
  const [profile, setProfile] = useState({});
  const [data, setData] = useState({});
  const [state, setState] = useSetState({ cart: 0, order: 0 });
  const { token } = useSelector((state) => state.app);
  useEffect(() => {
    if (!token) return;
    get(`/api/user/customized/homepage/${token}`).then((res) => {
      setData(res);
    });
    get(`/api/user/profile/${token}`).then((res) => {
      setProfile((res.user_info && res.user_info[0]) || {});
    });
    get(`/api/user/order/${token}`).then((res) => {
      setState({ order: res ?? 0 });
    });
    get(`/api/user/cart/${token}`).then((res) => {
      setState({ cart: res ?? 0 });
    });
  }, []);
  if(!token){
    return <div>
      <div className="center shadow mt" style={{height:140,background:'white',borderRadius: 8}}>
        <h1>Welcome to Gazzar! Your new option for game shopping!!!</h1>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="center">
        <h3>
          Want to browse more? Try <Link to='/user/login'>&nbsp;login&nbsp;</Link>!
        </h3>
      </div>
    </div>
  }
  return (
    <>
      <div className={styles.top + ' fr'}>
        <div className={styles.left + ' shadow'}>
          <Carousel autoplay>
            <div onClick={() => history.push('/user/discount')}>
              <img src={bannerImg} alt="" />
            </div>
          </Carousel>
        </div>
        {!!token && (
          <div className={styles.right + ' shadow'}>
            <div className="fr">
              <img
                src={[maleImg, femaleImg, mysteriousImg][profile.gender]}
                alt=""
                style={{cursor:'pointer'}}
                onClick={()=>history.push('/user/profile')}
              />
              <div>
                <h4>{profile.name}</h4>
                <div className="desc">{profile.email}</div>
              </div>
            </div>
            <div className={styles.info + ' fr'}>
              <div
                className="pointer"
                onClick={() => history.push('/user/cart')}
              >
                <h2>Cart</h2>
                <div>{state.cart ?? 0}</div>
              </div>
              <div
                className="pointer"
                onClick={() => history.push('/user/order')}
              >
                <h2>Order</h2>
                <div>{state.order ?? 0}</div>
              </div>
            </div>
          </div>
        )}
      </div>
      <br />
      <Tabs type="card">
        <Tabs.TabPane tab="Games" key="1">
          <Row gutter={[20, 20]}>
            {data.game?.map((item) => (
              <Col span={6} key={item.product_id}>
                <GameCard {...item}></GameCard>
              </Col>
            ))}
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Peripherals" key="Peripherals">
          <Row gutter={[20, 20]}>
            {data.peripheral?.map((item) => (
              <Col span={6} key={item.product_id}>
                <GameCard {...item}></GameCard>
              </Col>
            ))}
          </Row>
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}
