import classNames from "classnames/bind";
import styles from "./HeadlineHeader.module.scss";

import images from "../../../assets/images";
import {
  CartIcon,
  SearchIcon,
  FacebookIcon,
  InstagramIcon,
  BellIcon,
  HelpIcon,
  GlobeIcon,
  DownIcon,
} from "../../../../components/Icons";

const cx = classNames.bind(styles);

function Header() {
  return (
    <header className={cx("wrapper", "text-white")}>
      <div className={cx("container")}>
        <div className={cx("settings", "d-flex")}>
          <div className={cx("connections", "d-flex")}>
            <div>Kênh Người Bán</div>
            <div>Tải ứng dụng</div>
            <div className={cx("media-connections", "d-flex")}>
              <p>Kết nối</p>
              <FacebookIcon />
              <InstagramIcon />
            </div>
          </div>
          <div className={cx("user-settings", "d-flex")}>
            <div className={cx("d-flex")}>
              <BellIcon />
              <p>Thông báo</p>
            </div>
            <div className={cx("d-flex")}>
              <HelpIcon />
              <p>Hỗ Trợ</p>
            </div>
            <div className={cx("d-flex")}>
              <GlobeIcon />
              <p>Language</p>
              <DownIcon />
            </div>
            <div className={cx("d-flex")}>
              <img src="https://picsum.photos/20/20" alt="#"></img>
              <p>User</p>
            </div>
          </div>
        </div>
        <div className={cx("main-header", "d-flex")}>
          <div className={cx("logo")}>
            <img src={images.logo} alt="Shopee" />
          </div>
          <div className={cx("nav-wrapper")}>
            <div className={cx("search-bar", "bg-white", "d-flex")}>
              <input placeholder="Shoppe Thời Trang"></input>
              <button className={cx("search-button")}>
                <SearchIcon />
              </button>
            </div>
            <div className={cx("header-nav-bar", "d-flex")}>
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
