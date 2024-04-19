import classNames from "classnames/bind";
import styles from "./DefaultHeader.module.scss";
import { useState, useCallback, useEffect, useRef, useMemo } from "react";

import { CartIcon, SearchIcon, ShopeeLogo } from "../../../../components/Icons";
import { PrimaryButton } from "../../../../components/Buttons";

const cx = classNames.bind(styles);

function DefaultHeader() {
  const buttonChildren = useMemo(() => <SearchIcon />, []);

  const [text, setText] = useState("");

  const searchRef = useRef();
  const primaryButtonStyle = useRef({
    width: "5rem",
    height: "80%",
  });

  useEffect(() => {
    const searchBar = searchRef.current.parentNode;
    const handleSearchClick = () => {
      searchRef.current.focus();
    };
    searchBar.addEventListener("click", handleSearchClick);

    return () => {
      searchBar.removeEventListener("click", handleSearchClick);
    };
  }, []);

  const handleChange = useCallback(() => {
    setText(searchRef.current.value);
    console.log(text);
  }, [text]);

  return (
    <header className={cx("wrapper", "text-white")}>
      <div className={cx("container")}>
        <div className={cx("main-header", "d-flex")}>
          <div className={cx("logo", "d-flex")}>
            <ShopeeLogo />
          </div>
          <div className={cx("nav-wrapper")}>
            <div className={cx("search-bar")}>
              <input
                className={cx("input")}
                onChange={handleChange}
                // type="text"
                // id="search-input"
                // name="search"
                placeholder="Shoppe Thời Trang"
                ref={searchRef}
              ></input>
              <PrimaryButton style={primaryButtonStyle.current}>
                {buttonChildren}
              </PrimaryButton>
            </div>
            <div className={cx("header-navbar", "d-flex")}>
              <div>Bộ Vệ Sinh Laptop</div>
              <div>Ốp IPhone</div>
              <div>Tinh Dầu bưởi</div>
              <div>etc</div>
              <div>etc</div>
              <div>etc</div>
              <div>etc</div>
              <div>etc</div>
            </div>
          </div>
          <div className={cx("cart-icon")}>
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
}

export default DefaultHeader;
