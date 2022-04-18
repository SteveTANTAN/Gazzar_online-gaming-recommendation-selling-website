import styles from './index.less';
import {
  PageHeader,
  Carousel,
  Button,
  Space,
  Tabs,
  InputNumber,
  Rate,
  DatePicker,
} from 'antd';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSetState } from 'ahooks';
import { useHistory, Link } from 'umi';
import { LuckyWheel, LuckyGrid } from '@lucky-canvas/react';
import { useRef, useEffect, useState } from 'react';
import { get, post } from '@/user/utils/request';
const place = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 2, y: 1 },
  { x: 2, y: 2 },
  { x: 1, y: 2 },
  { x: 0, y: 2 },
  { x: 0, y: 1 },
];
export default function Profile() {
  const history = useHistory();
  const [prize, setPrize] = useState();
  const [prizes, setPrizes] = useState([]);
  const ref = useRef();
  useEffect(() => {
    get(`/api/user/lottery/${sessionStorage.getItem('token')}`).then((res) => {
      res.length = 7;
      setPrizes([
        ...res.map((item, index) => ({
          ...place[index],
          fonts: [{ text: item.name, top: '70%', fontSize: '12px' }],
          imgs: [
            {
              id: item.product_id,
              src: item.main_image?.[0]?.thumbUrl,
              width: '25%',
              top: '10%',
            },
          ],
        })),
        { ...place[7], fonts: [{ text: 'thanks', top: '30%' }] },
      ]);
    });
  }, []);
  return (
    <div className="bg">
      <div className={styles.wrap}>
        <PageHeader className={styles.header} title="Lottery"></PageHeader>
        <br />
        <div className={styles.info}>
          <div className={styles.left}>
            <h3>Lottery Rules</h3>
            <p className="mt">
              According to your personal preferences, search records and other
              data, we have selected some products that may be of interest to
              you as the prizes of the lottery. Gazzar thank you for your
            </p>

            <p className={styles.small + ' mt'}>
              *Please note that there is one and only one lucky draw opportunity
              per order. The final interpretation right of this event belongs to
              Gazzar
            </p>
          </div>
          <div className={styles.right}>
            <div className="center">
              {prizes.length > 0 && (
                <LuckyGrid
                  ref={ref}
                  width="500px"
                  height="300px"
                  blocks={[
                    { padding: '10px', background: '#869cfa' },
                    { padding: '10px', background: '#e9e8fe' },
                  ]}
                  prizes={prizes}
                  buttons={[
                    {
                      x: 1,
                      y: 1,
                      background: '#7f95d1',
                      fonts: [{ text: 'Start', top: '25%' }],
                    },
                  ]}
                  defaultStyle={{
                    background: '#b8c5f2',
                  }}
                  onStart={() => {
                    if (!ref.current) return;
                    ref.current.play();
                    setTimeout(() => {
                      const index = Math.random() < 0.98 ? 7 : 0;
                      ref.current.stop(index);
                      ref.current = null;
                    }, 5000);
                  }}
                  onEnd={(prize) => {
                    setPrize(prize);
                  }}
                ></LuckyGrid>
              )}
            </div>
            <br />
            {prize?.imgs && (
              <h2 className="center">
                Congrats! You Have Won the xxxxx！Click{' '}
                <a
                  onClick={() => {
                    post('/api/user/lottery/order', {
                      token: sessionStorage.getItem('token'),
                      product_id: prize?.imgs[0]?.id,
                    }).then(() => {
                      history.push('/user/order');
                    });
                  }}
                >
                  &nbsp;here&nbsp;
                </a>
                to check!!!{' '}
              </h2>
            )}
            {prize && !prize?.imgs && prize?.fonts && (
              <>
              <h2 className="center">
                Thank you for your patronage, welcome to visit next time!
              </h2>
              <div className="center">
                <h2>
                <Link
                 to='/user/home'
                >
                  Browse More
                </Link>
                </h2>
              </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
