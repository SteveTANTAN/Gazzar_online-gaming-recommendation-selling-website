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
  message,
} from 'antd';
import { useHistory, useParams } from 'umi';
import { useEffect, useState, useRef } from 'react';
import { get, post } from '@/user/utils/request';
// 商品详情页面
export default function Profile() {
  const history = useHistory();
  const param = useParams();
  const imgRef = useRef();
  const [data, setData] = useState({});
  const [comment, setComment] = useState({});
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    get(`/api/user/show/${param.id}/${sessionStorage.getItem('token')}`).then(
      (res) => {
        setData(res);
      },
    );
    get(`/api/user/show/rate/comment/${param.id}`).then((res) => {
      setComment(res);
    });
  }, []);
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
            <Carousel ref={imgRef}>
              {data.main_image?.map((item) => (
                <div>
                  <img src={item.thumbUrl} alt="" />
                </div>
              ))}
            </Carousel>
            <div className={styles.preview}>
              {data.main_image?.map((item, index) => (
                <img
                  src={item.thumbUrl}
                  alt=""
                  onClick={() => imgRef.current.goTo(index)}
                />
              ))}
            </div>
          </div>
          <div className={styles.right}>
            <div className="fr">
              <h2 className="blank">{data.name}</h2>
              <h2 style={{ color: 'orange' }}>Overall Rate: {data.rate}</h2>
            </div>
            <br />
            {data.status === 1 ? (
              <div className={styles.discount + ' fr'}>
                <div className="blank">
                  <div className={'fr'}>
                    <h4>Original Price</h4>
                    <span className={styles.delPrice}>
                      &nbsp;${data.price}&nbsp;
                    </span>
                  </div>
                  <div className={'fr'}>
                    <h4>Price After discount</h4>
                    <span>
                      ${Math.round((data.price * (100 - data.discount)) / 100)}
                    </span>
                  </div>
                </div>
                <div className={'center ' + styles.r}>{data.discount}% OFF</div>
              </div>
            ) : (
              <div className={styles.price + ' fr'}>
                <h4>Price</h4>
                <span>${data.price}</span>
              </div>
            )}
            <br />
            <div className="fr">
              <h4>Quantity</h4>
              <InputNumber
                value={quantity}
                onChange={(v) => {
                  if (v > data.stock) {
                    message.warn('quantity wrong');
                    return;
                  }
                  setQuantity(v);
                }}
                min={1}
              ></InputNumber>
            </div>
            <br />
            <div className="fr">
              <h4>Product Type</h4>
              <span>{data.type?.join('、')}</span>
            </div>
            <br />
            <div className="fr">
              <h4>Stock</h4>
              <span>{data.stock || 0}</span>
            </div>
            <br />
            <Space>
              <Button
                type="ghost"
                onClick={() => {
                  history.push(`/user/payment/${param.id}/${quantity}`);
                }}
              >
                Buy Now
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  post(`/api/user/add/cart`, {
                    token: sessionStorage.getItem('token'),
                    product_id: param.id,
                    quantity,
                  }).then(() => {
                    message.success('add cart success');
                  });
                }}
              >
                Add to Cart
              </Button>
            </Space>
          </div>
        </div>
        <div className={styles.bottom}>
          <Tabs type="card" tabPosition="left">
            <Tabs.TabPane tab="Product Details" key="1">
              <p>{data.description}</p>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Comments" key="Peripherals">
              <div>
                <h2 style={{ color: 'orange' }}>
                  Overall Rate: {comment.overall_rate || 0}
                </h2>
                {comment.rate_comment_details?.map?.((item) => (
                  <div className={styles.comment}>
                    <Rate value={item.rate}></Rate>
                    <span style={{marginLeft:66}}>{item.user_name}</span>
                    <p>{item.comment}</p>
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
