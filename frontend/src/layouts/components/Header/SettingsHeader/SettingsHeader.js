import classNames from "classnames/bind";
import styles from "./SettingsHeader.module.scss";
import config from "../../../../config";
import {
  FacebookIcon,
  InstagramIcon,
  BellIcon,
  HelpIcon,
  GlobeIcon,
  DownIcon,
} from "../../../../components/Icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";

const cx = classNames.bind(styles);

function SettingsHeader() {
  const { user } = useAuth();

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
          <div className={cx("customer-settings", "d-flex")}>
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
            <Link to={config.routes.public.login} className={cx("d-flex")}>
              <img src="https://picsum.photos/20/20" alt="#"></img>
              <p>customer</p>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default SettingsHeader;
