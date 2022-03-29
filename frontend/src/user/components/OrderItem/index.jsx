import { InputNumber } from 'antd';
import { useHistory } from 'umi';
import styles from './index.less';
import { put } from '@/user/utils/request';
export default function GameCard(props) {
  const history = useHistory();
  return (
    <div className={styles.item + ' fr blank'}>
      <img src={props.main_image} alt="" />
      <div>
        <h2>{props.name}</h2>
        <p>{props.description}</p>
      </div>
      <div className={styles.price}>
        <h2>${props.current_price}</h2>
        <div className="blank"></div>
        {props.editable ? (
          <InputNumber
            defaultValue={props.quantity}
            min={1}
            onChange={(v) => {
              put(`/api/user/notify/quantity`, {
                token: sessionStorage.getItem('token'),
                cart_id: props.cart_id,
                quantity: v,
              });
            }}
          />
        ) : (
          <span>x{props.quantity}</span>
        )}
      </div>
    </div>
  );
}
