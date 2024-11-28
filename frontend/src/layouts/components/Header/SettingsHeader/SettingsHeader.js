import classNames from "classnames/bind";
import styles from "./SettingsHeader.module.scss";
import { useAuth } from "../../../../context/AuthContext";
import {
  FacebookIcon,
  InstagramIcon,
  BellIcon,
  HelpIcon,
  GlobeIcon,
  DownIcon,
  UpIcon,
} from "../../../../components/Icons";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "../../../../components/Drowdown/Drowdown";
import React, { useCallback } from "react";
import config from "../../../../config";
import { publicGet } from "../../../../utils/httpRequest";

const cx = classNames.bind(styles);

function SettingsHeader() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    const fetchLogout = async () => {
      await publicGet({ path: "/auth/signout" });
      logout();
    };
    fetchLogout();
  }, []);

  const handleCheckProfile = useCallback(() => {
    navigate(config.routes.consumer.profile);
  }, []);

  const handleCheckOrders = () => {
    console.log("check orders");
  };
  return (
    <header className={cx("wrapper", "text-white")}>
      <div className={cx("container")}>
        <div className={cx("settings", "d-flex")}>
          <div className={`items-center ${cx("connections", "d-flex")}`}>
            <div>Kênh Người Bán</div>
            <div>Tải ứng dụng</div>
            <div
              className={`items-center ${cx("media-connections", "d-flex")}`}
            >
              <p>Kết nối</p>
              <FacebookIcon />
              <InstagramIcon />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <BellIcon />
              <p>Thông báo</p>
            </div>
            <div className="flex items-center gap-1">
              <HelpIcon />
              <p>Hỗ Trợ</p>
            </div>
            <div className="pt-1">
              <Dropdown>
                <Dropdown.Button
                  className="gap-1"
                  CloseIcon={DownIcon}
                  ActiveIcon={UpIcon}
                  // onHover={true}
                >
                  <GlobeIcon />
                  <span>Language</span>
                </Dropdown.Button>
                <Dropdown.Menu onValueChange={(option) => {}}>
                  <Dropdown.Options className="text-grey-600" id="1">
                    Tiếng Việt
                  </Dropdown.Options>
                  <Dropdown.Options className="text-grey-600" id="2">
                    English
                  </Dropdown.Options>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {currentUser ? (
              <Dropdown>
                <Dropdown.Button
                  // onHover={true}
                  CloseIcon={React.Fragment}
                  ActiveIcon={React.Fragment}
                >
                  <img
                    className="rounded-full"
                    src="https://picsum.photos/20/20"
                    alt="#"
                  />
                  <span>{currentUser.username}</span>
                </Dropdown.Button>
                <Dropdown.Menu
                  className="ml-56 mt-6"
                  onValueChange={(value) => {
                    switch (parseInt(value)) {
                      case 1: {
                        handleCheckProfile();
                        break;
                      }
                      case 2: {
                        handleCheckOrders();
                        break;
                      }
                      case 3: {
                        handleLogout();
                        break;
                      }
                    }
                  }}
                >
                  <Dropdown.Options className="text-grey-600" id="1">
                    Tài khoản của tôi
                  </Dropdown.Options>
                  <Dropdown.Options className="text-grey-600" id="2">
                    Đơn mua
                  </Dropdown.Options>
                  <Dropdown.Options className="text-grey-600" id="3">
                    Đăng xuất
                  </Dropdown.Options>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className="flex gap-3 items-center">
                <Link to={config.routes.public.signup} className="text-white">
                  Đăng ký
                </Link>
                <span className="text-xl">|</span>
                <Link to={config.routes.public.login} className="text-white">
                  Đăng nhập
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default SettingsHeader;
