import classNames from "classnames/bind";
import styles from "./SettingsHeader.module.scss";

import {
  FacebookIcon,
  InstagramIcon,
  BellIcon,
  HelpIcon,
  GlobeIcon,
  DownIcon,
} from "../../../../components/Icons";

const cx = classNames.bind(styles);

function SettingsHeader() {
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
      </div>
    </header>
  );
}

export default SettingsHeader;
