import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import config from "../../config";
import { Link } from "react-router-dom";

import { GoogleIcon, ShopeeIcon, FacebookIcon } from "../../components/Icons";
import { useCallback, useEffect, useRef, useState } from "react";
import httpRequest from "../../utils/httpRequest";

const cx = classNames.bind(styles);

function Login() {
  const [userInputValue, setUserInputValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [inputErrors, setInputErrors] = useState({
    username: false,
    password: false,
  });
  const userInputErrorRef = useRef();
  const passwordErrorRef = useRef();
  const googleButtonRef = useRef();
  const facebookButtonRef = useRef();

  useEffect(() => {
    const googleButton = googleButtonRef.current;
    const facebookButton = facebookButtonRef.current;

    // Hide the error messages
    userInputErrorRef.current.style.display = "none";
    passwordErrorRef.current.style.display = "none";

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
    console.log(process.env.REACT_APP_SERVER_ENDPOINT);
    window.location.href = `${process.env.REACT_APP_SERVER_ENDPOINT}/auth/signin/oauth/google/login`;
  };

  const handleFacebookClick = () => {
    console.log("Facebook button clicked");
  };

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
                  className={cx(
                    "border",
                    "border-grey-400",
                    "rounded-sm",
                    "p-2",
                    {
                      "field-error": inputErrors.username,
                    }
                  )}
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
                  className={cx(
                    "border",
                    "border-grey-400",
                    "rounded-sm",
                    "p-2",

                    { "field-error": inputErrors.password }
                  )}
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
