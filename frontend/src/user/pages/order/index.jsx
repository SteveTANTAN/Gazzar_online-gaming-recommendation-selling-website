import styles from './index.less';
import {
  PageHeader,
  Carousel,
  Button,
  Space,
  Tabs,
  InputNumber,
  Rate,
  Checkbox,
} from 'antd';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSetState } from 'ahooks';
import { Link, useHistory } from 'umi';
import GameCard from '../../components/GameCard';
import OrderItem from '../../components/OrderItem';

export default function Profile() {
  const history = useHistory();
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.left}>
          <div>
            <PageHeader
              className={styles.header}
              onBack={() => history.goBack()}
              title="My Order"
              subTitle="(click blocks to check more details)"
            ></PageHeader>
            <div className={styles.items}>
              {[1, 2, 3].map((item) => (
                <div>
                  <Link to={'/user/order-detail'}>
                    <OrderItem></OrderItem>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <h1>Guess you Like...</h1>
          {[1, 3].map((item) => (
            <div className="fr">
              <GameCard></GameCard>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
