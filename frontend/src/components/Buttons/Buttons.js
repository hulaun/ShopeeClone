import classNames from "classnames/bind";
import styles from "./Buttons.module.scss";
import { memo } from "react";

const cx = classNames.bind(styles);

export const PrimaryButton = memo(({ children, style = {} }) => {
  return (
    <button className={cx("primary-button")} style={style}>
      {children}
    </button>
  );
});

export const OutlineButton = memo(({ children, style = {} }) => {
  return (
    <button className={cx("outline-button")} style={style}>
      {children}
    </button>
  );
});
