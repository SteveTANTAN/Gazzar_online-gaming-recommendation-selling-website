import { useState } from 'react';
import { useHistory } from 'umi';
import styles from './index.less';
import img from '@/assets/w.png';
export default function GameCard({ id, name, ...props }) {
  const history = useHistory();
  const [init, setInit] = useState(false);
  if (props.isDiscount && !init) {
    return (
      <div className={styles.card + ' shadow'} onClick={() => setInit(true)}>
        <img src={img} alt="" />
      </div>
    );
  }
  return (
    <div
      className={styles.card + ' shadow'}
      onClick={() => history.push('/user/detail/' + (id ?? props.product_id))}
    >
      <img src={props.main_image?.[0]?.thumbUrl} alt="" />
      <div>
        <div className="fr">
          <div className="blank">${props.price}</div>
          <span className={styles.rate}>{props.rate}</span>
        </div>
        <div className="fr">
          <div className="blank">{name}</div>
          {props.status === 1 && (
            <span style={{ color: 'red', textAlign: 'right' }}>
              {props.discount}% OFF
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
