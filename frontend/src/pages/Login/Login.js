import classNames from "classnames/bind";
import styles from "./Login.module.scss";

import { Link } from "react-router-dom";

import { ShopeeIcon } from "../../components/Icons";

const cx = classNames.bind(styles);
function Home() {
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
            <div className={cx("section login")}>Đăng nhập</div>
            <form className={cx("section form")}>
              <div className={cx("input-section")}>
                <input
                  type="text"
                  placeholder="Email/Số điện thoại/Tên đăng nhập"
                  autocomplete="on"
                  name="loginKey"
                  maxlength="128"
                  aria-invalid="false"
                ></input>
                <div
                  id="authentication-input-error_a4c26be6-2281-4529-b32d-09504005b417"
                  class="pYVjxt"
                  aria-live="polite"
                ></div>
              </div>
              <div className={cx("input-section")}>
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  autocomplete="current-password"
                  name="password"
                  maxlength="16"
                  aria-invalid="false"
                ></input>
                <div
                  id="authentication-input-error_a4c26be6-2281-4529-b32d-09504005b417"
                  class="pYVjxt"
                  aria-live="polite"
                ></div>
              </div>
              <div className={cx("submit-section")}>
                <input type="submit" value="ĐĂNG NHẬP" />
                <Link to={"/"}>Quên mật khẩu</Link>
                <div>Hoặc</div>
              </div>
            </form>
            <div className={cx("section oauth-buttons")}>
              <button>Facebook</button>
              <button>Google</button>
            </div>
            <div className={cx("section signup-link")}>
              Bạn mới biết Shopee?
              <Link to={"/signup"}>Đăng ký</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

/*
<div class="D3QIf1">
                <div class="yup5K8">
                  <input
                    class="pDzPRp"
                    type="text"
                    placeholder="Email/Số điện thoại/Tên đăng nhập"
                    autocomplete="on"
                    name="loginKey"
                    maxlength="128"
                    aria-invalid="false"
                    value=""
                  />
                </div>
                <div
                  id="authentication-input-error_a4c26be6-2281-4529-b32d-09504005b417"
                  class="pYVjxt"
                  aria-live="polite"
                ></div>
              </div>
              <div class="vkgBkQ">
                <div class="yup5K8">
                  <input
                    class="pDzPRp"
                    type="password"
                    placeholder="Mật khẩu"
                    autocomplete="current-password"
                    name="password"
                    maxlength="16"
                    aria-invalid="false"
                    value=""
                  />
                  <button class="SnLyxu">
                    <svg fill="none" viewBox="0 0 20 10" class="_340FWs">
                      <path
                        stroke="none"
                        fill="#000"
                        fill-opacity=".54"
                        d="M19.834 1.15a.768.768 0 00-.142-1c-.322-.25-.75-.178-1 .143-.035.036-3.997 4.712-8.709 4.712-4.569 0-8.71-4.712-8.745-4.748a.724.724 0 00-1-.071.724.724 0 00-.07 1c.07.106.927 1.07 2.283 2.141L.631 5.219a.69.69 0 00.036 1c.071.142.25.213.428.213a.705.705 0 00.5-.214l1.963-2.034A13.91 13.91 0 006.806 5.86l-.75 2.535a.714.714 0 00.5.892h.214a.688.688 0 00.679-.535l.75-2.535a9.758 9.758 0 001.784.179c.607 0 1.213-.072 1.785-.179l.75 2.499c.07.321.392.535.677.535.072 0 .143 0 .179-.035a.714.714 0 00.5-.893l-.75-2.498a13.914 13.914 0 003.248-1.678L18.3 6.147a.705.705 0 00.5.214.705.705 0 00.499-.214.723.723 0 00.036-1l-1.82-1.891c1.463-1.071 2.32-2.106 2.32-2.106z"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div
                  id="authentication-input-error_9279bc65-8a72-4df6-8cbb-c43cd1a070d6"
                  class="pYVjxt"
                  aria-live="polite"
                ></div>
              </div>
*/
