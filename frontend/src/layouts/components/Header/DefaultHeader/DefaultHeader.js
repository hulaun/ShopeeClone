import classNames from "classnames/bind";
import styles from "./DefaultHeader.module.scss";

import { CartIcon, SearchIcon, ShopeeLogo } from "../../../../components/Icons";
import { PrimaryButton } from "../../../../components/Buttons";
import InputBox from "../../../../components/InputBox";

const cx = classNames.bind(styles);

function DefaultHeader() {
  const inputBoxStyle = {
    padding: "0.35rem",
    height: "3rem",
    width: "100%",
  };

  const inputProps = {
    type: "text",
    id: "search-input",
    name: "search",
    placeholder: "Shoppe Thời Trang",
  };

  const primaryButtonStyle = {
    width: "5rem",
    height: "100%",
  };

  return (
    <header className={cx("wrapper", "text-white")}>
      <div className={cx("container")}>
        <div className={cx("main-header", "d-flex")}>
          <div className={cx("logo", "d-flex")}>
            <ShopeeLogo />
          </div>
          <div className={cx("nav-wrapper")}>
            <InputBox inputProps={inputProps} inputBoxStyle={inputBoxStyle}>
              <PrimaryButton style={primaryButtonStyle}>
                <SearchIcon />
              </PrimaryButton>
            </InputBox>
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
