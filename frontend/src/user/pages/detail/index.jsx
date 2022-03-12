import styles from './index.less';
import {
  PageHeader,
  Carousel,
  Button,
  Space,
  Tabs,
  InputNumber,
  Rate,
  DatePicker,
} from 'antd';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSetState } from 'ahooks';
import { useHistory } from 'umi';

export default function Profile() {
  const history = useHistory();
  return (
    <div className="bg">
      <div className={styles.wrap}>
        <PageHeader
          className={styles.header}
          onBack={() => history.goBack()}
          title="Go Back"
        ></PageHeader>
        <br />
        <div className={styles.info}>
          <div className={styles.left}>
            <Carousel>
              <div>
                <img
                  src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1113%2F052420105424%2F200524105424-8-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649384798&t=f7a0a0bff022f75ffe30557d7cb5d60e"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1113%2F052420105424%2F200524105424-8-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649384798&t=f7a0a0bff022f75ffe30557d7cb5d60e"
                  alt=""
                />
              </div>
            </Carousel>
            <div className={styles.preview}>
              <img
                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1113%2F052420105424%2F200524105424-8-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649384798&t=f7a0a0bff022f75ffe30557d7cb5d60e"
                alt=""
              />{' '}
              <img
                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1113%2F052420105424%2F200524105424-8-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649384798&t=f7a0a0bff022f75ffe30557d7cb5d60e"
                alt=""
              />
            </div>
          </div>
          <div className={styles.right}>
            <div className="fr">
              <h2 className="blank">Elden Ring CDKey</h2>
              <h2 style={{ color: 'orange' }}>Overall Rate: 4.1</h2>
            </div>
            <br />
            <div className={styles.price + ' fr'}>
              <h4>Price</h4>
              <span>＄150.00</span>
            </div>
            <br />
            <div className="fr">
              <h4>Quantity</h4>
              <InputNumber></InputNumber>
            </div>
            <br />
            <div className="fr">
              <h4>Product Type</h4>
              <span>Product Type</span>
            </div>
            <br />
            <div className="fr">
              <h4>Stock</h4>
              <span>1000</span>
            </div>
            <br />
            <Space>
              <Button type="ghost">Buy Now</Button>
              <Button type="primary">Add to Cart</Button>
            </Space>
          </div>
        </div>
        <div className={styles.bottom}>
          <Tabs type="card" tabPosition="left">
            <Tabs.TabPane tab="Product Details" key="1">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                euismod bibendum laoreet. Proin gravida dolor sit amet lacus
                accumsan et viverra justo commodo. Proin sodales pulvinar
                tempor. Cum sociis natoque penatibus et magnis dis parturient
                montes, nascetur ridiculus mus. Nam fermentum, nulla luctus
                pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien
                nunc eget odio. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida
                dolor sit amet lacus accumsan et viverra justo commodo. Proin
                sodales pulvinar tempor. Cum sociis natoque penatibus et magnis
                dis parturient montes, nascetur ridiculus mus. Nam fermentum,
                nulla luctus pharetra vulputate, felis tellus mollis orci, sed
                rhoncus sapien nunc eget odio. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Aenean euismod bibendum laoreet.
                Proin gravida dolor sit amet lacus accumsan et viverra justo
                commodo. Proin sodales pulvinar tempor. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Nam fermentum, nulla luctus pharetra vulputate, felis
                tellus mollis orci, sed rhoncus sapien nunc eget odio. Lorem i
              </p>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Comments" key="Peripherals">
              <div>
                <h2 style={{ color: 'orange' }}>Overall Rate: 4.1</h2>
                {[1, 2, 4].map((item) => (
                  <div className={styles.comment}>
                    <Rate value={3}></Rate>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aenean euismod bibendum laoreet. Proin gravida dolor sit
                      amet lacus accumsan et viverra justo commodo. Proin
                      sodales pulvinar tempor. Cum sociis natoque penatibus et
                      magnis dis parturient montes, nascetur ridiculus mus. Nam
                      fermentum, nulla luctus pharetra vulputate, felis tellus
                      mollis orci, sed rhoncus sapien nunc eget odio. Lorem irem
                      i
                    </p>
                  </div>
                ))}
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
