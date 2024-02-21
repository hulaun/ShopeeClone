import classNames from "classnames/bind";
import styles from "./Profile.module.scss";

const cx = classNames.bind(styles);
function Profile() {
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
    </div>
  );
}

export default Profile;
