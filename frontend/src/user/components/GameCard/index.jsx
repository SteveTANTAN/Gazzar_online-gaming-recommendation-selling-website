import { useHistory } from 'umi';
import styles from './index.less';
export default function GameCard({ id, name }) {
  const history = useHistory();
  return (
    <div
      className={styles.card + ' shadow'}
      onClick={() => history.push('/user/detail/' + id)}
    >
      <img
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1113%2F052420105424%2F200524105424-8-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649384798&t=f7a0a0bff022f75ffe30557d7cb5d60e"
        alt=""
      />
      <div>
        <div className="fr">
          <div className="blank">$0</div>
          <span className={styles.rate}>4.5</span>
        </div>
        <div>{name}</div>
      </div>
    </div>
  );
}
