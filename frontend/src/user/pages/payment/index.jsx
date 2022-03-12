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
import { useHistory } from 'umi';
import OrderItem from '@/user/components//OrderItem';
import Payment from '@/user/components//Payment';
export default function PaymentPage() {
  const history = useHistory();
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.left}>
          <div>
            <PageHeader
              className={styles.header}
              onBack={() => history.goBack()}
              title="Place My Order"
            ></PageHeader>
            <div className={styles.content}>
              <div className={styles.items}>
                {[1, 3].map((item) => (
                  <div>
                    <OrderItem></OrderItem>
                  </div>
                ))}
              </div>
              <br />
              <PageHeader
                className={styles.header}
                title="Payment Option"
              ></PageHeader>
              <div className={styles.items}>
                {[1, 3].map((item) => (
                  <div>
                    <Payment></Payment>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right + ' shadow'}>
          <hr />
          <div className="fr">
            <h4 className="blank">Original Price</h4>
            <span>＄450</span>
          </div>
          <div className="fr">
            <h4 className="blank">Original Price</h4>
            <span>＄450</span>
          </div>
          <div className="fr">
            <h4 className="blank">Original Price</h4>
            <span>＄450</span>
          </div>
          <hr />
          <div className="center">
            <Button type="primary">Place Your Order in AUD</Button>
          </div>
        </div>
      </div>
    </>
  );
}
