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
import { useHistory } from 'umi';
import { LuckyWheel, LuckyGrid } from '@lucky-canvas/react';
import { useRef } from 'react';
export default function Profile() {
  const history = useHistory();
  const ref = useRef();
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
            <LuckyGrid
              ref={ref}
              width="500px"
              height="300px"
              blocks={[
                { padding: '10px', background: '#869cfa' },
                { padding: '10px', background: '#e9e8fe' },
              ]}
              prizes={[
                { x: 0, y: 0, fonts: [{ text: '0', top: '25%' }] },
                { x: 1, y: 0, fonts: [{ text: '1', top: '25%' }] },
                { x: 2, y: 0, fonts: [{ text: '2', top: '25%' }] },
                { x: 2, y: 1, fonts: [{ text: '3', top: '25%' }] },
                { x: 2, y: 2, fonts: [{ text: '4', top: '25%' }] },
                { x: 1, y: 2, fonts: [{ text: '5', top: '25%' }] },
                { x: 0, y: 2, fonts: [{ text: '6', top: '25%' }] },
                { x: 0, y: 1, fonts: [{ text: '7', top: '25%' }] },
              ]}
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
                ref.current.play();
                setTimeout(() => {
                  const index = 0;
                  ref.current.stop(index);
                }, 2500);
              }}
              onEnd={(prize) => {
                console.log(prize);
              }}
            ></LuckyGrid>
          </div></div>
        </div>
      </div>
    </div>
  );
}
