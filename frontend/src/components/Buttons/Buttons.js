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

export const IconButton = memo(({ children, style = {}, handleClick }) => {
  return (
    <button
      className="bg-primary rounded-full aspect-square p-2 w-10 flex items-center justify-center"
      style={style}
      onClick={handleClick}
    >
      {children}
    </button>
  );
});
