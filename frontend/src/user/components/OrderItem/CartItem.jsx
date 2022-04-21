import { InputNumber } from 'antd';
import { useHistory } from 'umi';
import styles from './index.less';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import { put, del } from '@/user/utils/request';
// Shopping Cart Card Component Package
export default function GameCard(props) {
  const history = useHistory();
  return (
    <div className={styles.item + ' fr blank'}>
      <img src={props.main_image?.image ?? props.main_image} alt="" />
      <div style={{ flex: 1 }}>
        <h2>{props.name}</h2>
        <p className={styles.desc}>{props.description}</p>
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
                token: localStorage.getItem('utoken'),
                cart_id: props.cart_id,
                quantity: v,
              });
            }}
          />
        ) : (
          <span>x{props.quantity}</span>
        )}
      </div>
      {props.onDelete && (
        <div
          className={styles.del}
          onClick={() => {
            del('/api/user/delete/cart', {
              token: localStorage.getItem('utoken'),
              cart_id: props.cart_id,
              quantity: props.quantity,
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
