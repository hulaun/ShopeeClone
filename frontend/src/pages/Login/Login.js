import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import config from "../../config";
import { Link } from "react-router-dom";

import { OutlineButton } from "../../components/Buttons";
import { GoogleIcon, ShopeeIcon, FacebookIcon } from "../../components/Icons";
import { useCallback, useRef, useState } from "react";

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
  const userInputErrorRef = useRef();
  const passwordErrorRef = useRef();

  const handleBlur = (event) => {
    if (event.target.name === "username" && !userInputValue) {
      userInputErrorRef.current.style.display = "block";
    } else if (event.target.name === "password" && !passwordValue) {
      passwordErrorRef.current.style.display = "block";
    }
  };

  const handleInput = (event) => {
    if (event.target.name === "username") {
      setUserInputValue(event.target.value);
      if (event.target.value) {
        userInputErrorRef.current.style.display = "none";
      }
    } else if (event.target.name === "password") {
      setPasswordValue(event.target.value);
      if (event.target.value) {
        passwordErrorRef.current.style.display = "none";
      }
    }
  };

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    const validateInput = (input) => {
      const emailRegex = /^[a-zA-Z0-9]+@gmail\.com$/;
      const phoneRegex = /^\d{10}$/;
      const usernameRegex = /^[a-zA-Z0-9._-]{3,16}$/;

      if (emailRegex.test(input)) {
        return "Gmail";
      } else if (phoneRegex.test(input)) {
        return "Phone number";
      } else if (usernameRegex.test(input)) {
        return "Username";
      } else {
        return "Invalid input";
      }
    };

    const inputType = validateInput(userInputValue);
    if (inputType === "Invalid input") {
      userInputErrorRef.current.style.display = "block";
      return;
    }

    const response = await fetch("https://your-api.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loginKey: userInputValue,
        password: passwordValue,
      }),
    });

    if (response.ok) {
      console.log("Login successful");
    } else {
      console.error("Failed to login");
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
                ></input>
                <div
                  id="authentication-input-error"
                  aria-live="polite"
                  ref={userInputErrorRef}
                >
                  Invalid input
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
                ></input>
                <div
                  id="authentication-input-error"
                  aria-live="polite"
                  ref={passwordErrorRef}
                >
                  Please enter your password
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
