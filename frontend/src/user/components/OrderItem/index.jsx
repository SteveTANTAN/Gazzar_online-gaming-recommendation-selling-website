import { useHistory } from 'umi';
import styles from './index.less';
export default function GameCard() {
  const history = useHistory();
  return (
    <div className={styles.item + ' fr blank'}>
      <img src="" alt="" />
      <div>
        <h2>Name</h2>
        <p>
          mod bibendum laoreet. Proin gravida dolor sit amet lacmod bibendum
          laoreet. Proin gravida dolor sit amet lac
        </p>
      </div>
      <div className={styles.price}>
        <h2>$150</h2>
        <div className="blank"></div>
        <span>x10</span>
      </div>
    </div>
  );
}
