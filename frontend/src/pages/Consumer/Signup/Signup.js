import classNames from "classnames/bind";
import styles from "./Signup.module.scss";
import config from "../../../config";
import { Link } from "react-router-dom";

import {
  GoogleIcon,
  ShopeeIcon,
  FacebookIcon,
} from "../../../components/Icons";
import { useRef, useEffect } from "react";

const cx = classNames.bind(styles);
function Signup() {
  const googleButtonRef = useRef(null);
  const facebookButtonRef = useRef(null);

  useEffect(() => {
    const googleButton = googleButtonRef.current;
    const facebookButton = facebookButtonRef.current;

    // Add event listeners using the captured refs
    googleButton.addEventListener("click", handleGoogleClick);
    facebookButton.addEventListener("click", handleFacebookClick);

    // Cleanup function to remove the event listeners using the captured refs
    return () => {
      googleButton.removeEventListener("click", handleGoogleClick);
      facebookButton.removeEventListener("click", handleFacebookClick);
    };
  }, []);

  const handleGoogleClick = () => {
    window.location.href = `${process.env.REACT_APP_SERVER_ENDPOINT}/auth/signin/oauth/google/login`;
  };

  const handleFacebookClick = () => {
    // Handle Facebook button click
  };
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
                  className="border border-grey-400 rounded-sm p-2"
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
                  className="border border-grey-400 rounded-sm p-2"
                ></input>
                <div id="authentication-input-error" aria-live="polite"></div>
              </div>
              <div className={cx("submit-section")}>
                <input type="submit" value="Đăng ký" className="uppercase" />
                <div>Hoặc</div>
              </div>
              <div className={cx("oauth-section")}>
                <button
                  ref={facebookButtonRef}
                  className="button w-1/2 bg-white border border-grey-400 flex justify-center items-center p-2 rounded-sm"
                >
                  <FacebookIcon color="blue" />
                  Facebook
                </button>
                <button
                  ref={googleButtonRef}
                  className="button w-1/2 bg-white border border-grey-400 flex justify-center items-center p-2 rounded-sm"
                >
                  <GoogleIcon color="red" />
                  Google
                </button>
              </div>
            </form>
            <div className={cx("section", "signup-link")}>
              Bạn mới biết Shopee?
              <Link
                to={config.routes.public.login}
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
