import styles from './index.less';
import {
  PageHeader,
  Button,
  Space,
  Modal,
  Input,
  Form,
  DatePicker,
} from 'antd';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSetState } from 'ahooks';
import { useHistory } from 'umi';

export default function Profile() {
  const history = useHistory();
  return (
    <div className={styles.wrap}>
      <PageHeader
        className={styles.header}
        onBack={() => history.goBack()}
        title="Go Back"
      ></PageHeader>
      123
    </div>
  );
}
