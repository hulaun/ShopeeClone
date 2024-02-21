import classNames from "classnames/bind";
import styles from "./AuthHeader.module.scss";

import { ShopeeLogo } from "../../../../components/Icons";

const cx = classNames.bind(styles);

function AuthHeader(props) {
  return (
    <header className={cx("wrapper")}>
      <div className={cx("container", "d-flex")}>
        <div className={cx("d-flex")}>
          <ShopeeLogo color="#F84C2E" />
          <h2>{props.headline}</h2>
        </div>
        <div>Bạn cần giúp đỡ?</div>
      </div>
    </header>
  );
}

export default AuthHeader;
