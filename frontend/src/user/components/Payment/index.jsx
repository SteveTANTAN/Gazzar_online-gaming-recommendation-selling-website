import { useHistory } from 'umi';
import styles from './index.less';
import { DeleteOutlined } from '@ant-design/icons';
import { del } from '@/user/utils/request';
export default function Payment(props) {
  // About the payment
  const history = useHistory();
  return (
    <div className={styles.card + ' fr'}>
      <div className="blank">
        <h4>{props.card_type}</h4>
        <h4>{props.card_number}</h4>
      </div>
      {props.onDelete && (
        <div
          className={styles.del}
          onClick={() => {
            del('/api/user/delete/payment', {
              token: localStorage.getItem('utoken'),
              payment_detail_id: props.payment_detail_id,
            }).then(() => {
              props.onDelete();
            });
          }}
        >
          <DeleteOutlined></DeleteOutlined>
        </div>
      )}
    </div>
  );
}
