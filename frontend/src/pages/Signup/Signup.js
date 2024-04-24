import classNames from "classnames/bind";
import styles from "./Signup.module.scss";
import config from "../../config";
import { Link } from "react-router-dom";

import { OutlineButton } from "../../components/Buttons";
import { GoogleIcon, ShopeeIcon, FacebookIcon } from "../../components/Icons";
import { useRef } from "react";

const cx = classNames.bind(styles);
function Signup() {
  const outlineButtonStyle = useRef({
    width: "10rem",
    height: "3rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.2rem",
  });

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container", "d-flex")}>
        <div className={cx("logo")}>
          <ShopeeIcon
            primaryColor="#F84C2E"
            secondaryColor="white"
            height="225"
            width="225"
          />
          <h1>Shopee</h1>
          <h2>
            Nền tảng thương mại điện tử <br />
            yêu thích ở Đông Nam Á & Đài Loan
          </h2>
        </div>
        <div className={cx("card")}>
          <div className={cx("card-container")}>
            <div className={cx("section", "login")}>Đăng ký</div>
            <form className={cx("section", "form")}>
              <div className={cx("input-section")}>
                <input
                  type="text"
                  placeholder="Số điện thoại"
                  autoComplete="on"
                  name="loginKey"
                  maxLength="128"
                  aria-invalid="false"
                ></input>
                <div id="authentication-input-error" aria-live="polite"></div>
              </div>
              <div className={cx("input-section")}>
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  autoComplete="current-password"
                  name="password"
                  maxLength="16"
                  aria-invalid="false"
                ></input>
                <div id="authentication-input-error" aria-live="polite"></div>
              </div>
              <div className={cx("submit-section")}>
                <input type="submit" value="Đăng ký" />
                <div>Hoặc</div>
              </div>
              <div className={cx("oauth-section")}>
                <OutlineButton style={outlineButtonStyle.current}>
                  <FacebookIcon color="blue" />
                  Facebook
                </OutlineButton>
                <OutlineButton style={outlineButtonStyle.current}>
                  <GoogleIcon color="red" />
                  Google
                </OutlineButton>
              </div>
            </form>
            <div className={cx("section", "signup-link")}>
              Bạn mới biết Shopee?
              <Link
                to={config.routes.login}
                style={{ textDecoration: "none", color: "red" }}
              >
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
