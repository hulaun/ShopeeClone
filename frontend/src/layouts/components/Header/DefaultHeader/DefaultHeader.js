import classNames from "classnames/bind";
import styles from "./DefaultHeader.module.scss";

import { CartIcon, SearchIcon, ShopeeLogo } from "../../../../components/Icons";

const cx = classNames.bind(styles);

function DefaultHeader() {
  return (
    <header className={cx("wrapper", "text-white")}>
      <div className={cx("container")}>
        <div className={cx("main-header", "d-flex")}>
          <div className={cx("logo", "d-flex")}>
            <ShopeeLogo />
          </div>
          <div className={cx("nav-wrapper")}>
            <div className={cx("search-bar", "bg-white", "d-flex")}>
              <input placeholder="Shoppe Thời Trang"></input>
              <button className={cx("search-button")}>
                <SearchIcon />
              </button>
            </div>
            <div className={cx("header-navbar", "d-flex")}>
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

export default DefaultHeader;
