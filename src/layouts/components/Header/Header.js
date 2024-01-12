import classNames from "classnames/bind";
import styles from "./Header.module.scss";

import images from "../../../assets/images";
import {
  CartIcon,
  SearchIcon,
  FacebookIcon,
  InstagramIcon,
  BellIcon,
  HelpIcon,
  GlobeIcon,
} from "../../../components/Icons";

const cx = classNames.bind(styles);

function Header() {
  return (
    <header className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("settings", "flex")}>
          <div className={cx("connections", "flex")}>
            <div>Kênh Người Bán</div>
            <div>Tải ứng dụng</div>
            <div className={cx("media-connections", "flex")}>
              <p>Kết nối</p>
              <FacebookIcon />
              <InstagramIcon />
            </div>
          </div>
          <div className={cx("user-settings", "flex")}>
            <div className={cx("flex")}>
              <BellIcon />
              <p>Thông báo</p>
            </div>
            <div className={cx("flex")}>
              <HelpIcon />
              <p>Hỗ Trợ</p>
            </div>
            <div className={cx("flex")}>
              <GlobeIcon />
              <p>Language</p>
            </div>
            <div className={cx("flex")}>
              <i></i>
              <p>User</p>
            </div>
          </div>
        </div>
        <div className={cx("main-header", "flex")}>
          <div className={cx("logo")}>
            <img src={images.logo} alt="Shopee" />
          </div>
          <div className={cx("nav-wrapper")}>
            <div className={cx("search-bar")}>
              <input placeholder="Shoppe Thời Trang"></input>
              <button className={cx("search-button")}>
                <SearchIcon />
              </button>
            </div>
            <div className={cx("header-nav-bar", "flex")}>
              <div>Bộ Vệ Sinh Laptop</div>
              <div>Ốp IPhone</div>
              <div>Tinh Dầu bưởi</div>
              <div>etc</div>
              <div>etc</div>
              <div>etc</div>
              <div>etc</div>
              <div>etc</div>
            </div>
          </div>
          <div className={cx("cart-icon")}>
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;