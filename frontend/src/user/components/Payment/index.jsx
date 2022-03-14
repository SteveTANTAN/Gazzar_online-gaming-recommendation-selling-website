import { useHistory } from 'umi';
import styles from './index.less';
import { DeleteOutlined } from '@ant-design/icons';
export default function GameCard() {
  const history = useHistory();
  return (
    <div className={styles.card + ' fr'}>
      <div className="blank">
        <h4>Mastercard</h4>
        <h4>●●●● ●●●● ●●●● 0000</h4>
      </div>
      <div className={styles.del}>
        <DeleteOutlined></DeleteOutlined>
      </div>
    </div>
  );
}
