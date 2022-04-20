import { InputNumber } from 'antd';
import { useHistory } from 'umi';
import styles from './index.less';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import { put, del } from '@/user/utils/request';
export default function OrderCard(props) {
  const history = useHistory();
  console.log(props?.product_main_image);
  return (
    <div className={styles.item + ' fr blank'}>
      <img src={props?.product_main_image?.[0]?.thumbUrl} alt="" />
      <div style={{ flex: 1 }}>
        <h2>{props.product_name}</h2>
        <p className={styles.desc}>{props.product_description}</p>
      </div>
      <div className={styles.price}>
        <h2>${props.product_discount_price??props.product_price}</h2>
        <div className="blank"></div>
      </div>
      {/* {props.onDelete && (
        <div
          className={styles.del}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            del('/api/user/order/delete', {
              token: sessionStorage.getItem('token'),
              order_detail_id: props.order_id,
            }).then(() => {
              props.onDelete();
            });
          }}
        >
          <DeleteOutlined></DeleteOutlined>
        </div>
      )} */}
    </div>
  );
}
