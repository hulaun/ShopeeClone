import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import config from "../../config";
import { Link } from "react-router-dom";

import { OutlineButton } from "../../components/Buttons";
import { GoogleIcon, ShopeeIcon, FacebookIcon } from "../../components/Icons";
import { useCallback, useEffect, useRef, useState } from "react";
import httpRequest from "../../utils/httpRequest";

const cx = classNames.bind(styles);

function Login() {
  const outlineButtonStyle = useRef({
    width: "10rem",
    height: "3rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.2rem",
  });

  const [userInputValue, setUserInputValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [inputErrors, setInputErrors] = useState({
    username: false,
    password: false,
  });
  const userInputErrorRef = useRef();
  const passwordErrorRef = useRef();

  useEffect(() => {
    userInputErrorRef.current.style.display = "none";
    passwordErrorRef.current.style.display = "none";
  }, []);

  const handleBlur = (event) => {
    if (event.target.name === "username" && !userInputValue) {
      userInputErrorRef.current.style.display = "block";
      setInputErrors((prev) => ({
        ...prev,
        username: true,
      }));
    } else if (event.target.name === "password" && !passwordValue) {
      passwordErrorRef.current.style.display = "block";
      setInputErrors((prev) => ({
        ...prev,
        password: true,
      }));
    }
  };

  const handleInput = (event) => {
    const fieldName = event.target.name;
    const inputValue = event.target.value;

    setInputErrors((prev) => ({
      ...prev,
      [fieldName]: false,
    }));

    if (fieldName === "username") {
      setUserInputValue(inputValue);
      if (inputValue) {
        userInputErrorRef.current.style.display = "none";
      }
    } else if (fieldName === "password") {
      setPasswordValue(inputValue);
      if (inputValue) {
        passwordErrorRef.current.style.display = "none";
      }
    }
  };

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    // const validateInput = (input) => {
    //   const emailRegex = /^[a-zA-Z0-9]+@gmail\.com$/;
    //   const phoneRegex = /^\d{10}$/;
    //   const usernameRegex = /^[a-zA-Z0-9._-]{3,16}$/;

    const response = await httpRequest.post("customers/login", {
      loginKey: userInputValue,
      password: passwordValue,
    });

    if (response.status >= 200 && response.status <= 300) {
      window.location.href = config.routes.home;
    }
  }, []);

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
            <div className={cx("section", "login")}>Đăng nhập</div>
            <form className={cx("section", "form")} onSubmit={handleSubmit}>
              <div className={cx("input-section")}>
                <input
                  type="text"
                  placeholder="Email/Số điện thoại/Tên đăng nhập"
                  autoComplete="on"
                  name="username"
                  maxLength="128"
                  aria-invalid="false"
                  onBlur={handleBlur}
                  onInput={handleInput}
                  className={cx({ "field-error": inputErrors.username })}
                ></input>
                <div
                  aria-live="polite"
                  ref={userInputErrorRef}
                  className={cx("label-error")}
                >
                  Vui lòng điền vào mục này
                </div>
              </div>
              <div className={cx("input-section")}>
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  autoComplete="current-password"
                  name="password"
                  maxLength="16"
                  aria-invalid="false"
                  onBlur={handleBlur}
                  onInput={handleInput}
                  className={cx({ "field-error": inputErrors.password })}
                ></input>
                <div
                  aria-live="polite"
                  ref={passwordErrorRef}
                  className={cx("label-error")}
                >
                  Vui lòng điền vào mục này
                </div>
              </div>
              <div className={cx("submit-section")}>
                <input type="submit" value="ĐĂNG NHẬP" />
                <Link
                  to={config.routes.login}
                  style={{ textDecoration: "none", color: "blue" }}
                >
                  Quên mật khẩu
                </Link>
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
                to={config.routes.signup}
                style={{ textDecoration: "none", color: "red" }}
              >
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
