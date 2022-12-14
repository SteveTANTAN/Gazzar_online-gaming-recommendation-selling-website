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
import bannerImg1 from '@/assets/1.jpg';
import bannerImg2 from '@/assets/2.jpg';
import bannerImg3 from '@/assets/3.jpg';
import bannerImg1l from '@/assets/1.jpg';
import bannerImg2l from '@/assets/2.jpg';
import bannerImg3l from '@/assets/3.jpg';
import { useSetState } from 'ahooks';
// Home Page
export default function Home() {
  const history = useHistory();
  const [profile, setProfile] = useState({});
  const [data, setData] = useState({});
  const [state, setState] = useSetState({ cart: 0, order: 0 });
  const  token  = localStorage.getItem('utoken');
  useEffect(() => {
    if (!token) return;
    get(`/api/user/customized/homepage/${token}`).then((res) => {
      setData(res);
    });
    get(`/api/user/profile/${token}`).then((res) => {
      setProfile((res.user_info && res.user_info[0]) || {});
    });
    // get(`/api/user/order/${token}`).then((res) => {
    //   setState({ order: res ?? 0 });
    // });
    // get(`/api/user/cart/${token}`).then((res) => {
    //   setState({ cart: res ?? 0 });
    // });
  }, []);
  // Before Login
  if(!token){
    return <div className={styles.top}>
      <div className={styles.left + ' shadow'}>
          <Carousel autoplay>
            <div>
              <img src={bannerImg1l} alt="" />
            </div>
            <div onClick={() => history.push('/user/discount')}>
              <img src={bannerImg2l} alt="" />
            </div>
            <div>
              <img src={bannerImg3l} alt="" />
            </div>
          </Carousel>
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
  // After Login
  return (
    <>
      <div className={styles.top + ' fr'}>
        <div className={styles.left + ' shadow'}>
          <Carousel autoplay>
            <div>
              <img src={bannerImg1} alt="" />
            </div>
            <div onClick={() => history.push('/user/discount')}>
              <img src={bannerImg2} alt="" />
            </div>
            <div>
              <img src={bannerImg3} alt="" />
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
              </div>
              <div
                className="pointer"
                onClick={() => history.push('/user/order')}
              >
                <h2>Order</h2>
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
