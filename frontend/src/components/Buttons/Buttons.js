import classNames from "classnames/bind";
import styles from "./Buttons.module.scss";
import { memo } from "react";

const cx = classNames.bind(styles);

export const PrimaryButton = memo(({ children, className }) => {
  return (
    <button className={`bg-primary flex items-center p-2 px-6 ${className}`}>
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
