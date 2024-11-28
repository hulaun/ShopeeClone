import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import config from "../../../config";
import { Link, useNavigate } from "react-router-dom";

import {
  GoogleIcon,
  ShopeeIcon,
  FacebookIcon,
} from "../../../components/Icons";
import { useEffect, useRef, useState } from "react";
import { publicPost } from "../../../utils/httpRequest";
import { useAuth } from "../../../context/AuthContext";

const cx = classNames.bind(styles);

function Login() {
  const { setCurrentUser, setAccessToken, isAdmin, isConsumer, isVendor } =
    useAuth();
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

  const navigate = useNavigate();

  useEffect(() => {
    const googleButton = googleButtonRef.current;
    const facebookButton = facebookButtonRef.current;

    userInputErrorRef.current.style.display = "none";
    passwordErrorRef.current.style.display = "none";

    googleButton.addEventListener("click", handleGoogleClick);
    facebookButton.addEventListener("click", handleFacebookClick);

    return () => {
      googleButton.removeEventListener("click", handleGoogleClick);
      facebookButton.removeEventListener("click", handleFacebookClick);
    };
  }, []);

  const handleGoogleClick = () => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await publicPost({
        path: "auth/signin",
        data: {
          loginKey: userInputValue,
          password: passwordValue,
        },
      });

      if (response.status >= 200 && response.status <= 300) {
        const { user, accessToken } = response.data.data;
        setCurrentUser(user);
        setAccessToken(accessToken);
        sessionStorage.setItem("accessToken", accessToken);

        if (isConsumer()) {
          console.log("Consumer");
          navigate(config.routes.public.home);
        } else if (isVendor()) {
          navigate(config.routes.public.home);
        } else if (isAdmin()) {
          navigate(config.routes.admin.dashboard);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setInputErrors({
          username: true,
          password: true,
        });
        userInputErrorRef.current.style.display = "block";
        passwordErrorRef.current.style.display = "block";
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
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
                  // onKeyDown={(e) => {
                  //   if (e.key === "Enter") {
                  //     handleSubmit(e);
                  //   }
                  // }}
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
                  to={config.routes.public.login}
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
                to={config.routes.public.signup}
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
