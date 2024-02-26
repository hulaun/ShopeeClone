import classNames from "classnames/bind";
import styles from "./Buttons.module.scss";

const cx = classNames.bind(styles);

export const PrimaryButton = ({ children, style = {} }) => (
  <button className={cx("primary-button")} style={style}>
    {children}
  </button>
);
