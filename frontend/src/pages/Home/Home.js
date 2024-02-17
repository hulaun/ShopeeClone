import classNames from "classnames/bind";
import styles from "./Home.module.scss";

import HomeFooter from "./components/HomeFooter";

const cx = classNames.bind(styles);
function Home() {
  var products;
  return (
    <div>
      {/* {
        products.map(product => {

        })
      } */}
      <div className={cx("product")}>
        <div className={cx("product-image")}>{/* todo */}</div>
        <div className={cx("product-description")}>
          <p className={cx("product-name")}></p>
          <p className={cx("product-price")}></p>
          <p className={cx("product-purchased")}></p>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
}

export default Home;
