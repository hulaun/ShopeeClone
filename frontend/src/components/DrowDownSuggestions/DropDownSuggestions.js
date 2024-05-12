import classNames from "classnames/bind";
import styles from "./DropDownSuggestions.module.scss";
import { memo } from "react";

const cx = classNames.bind(styles);

export const DropDownSuggestions = memo(({ children, style = {} }) => {
  const handleMouseOver = ()=>{
    
  }
  return <div className={cx("primary")}>{children}</div>;
});
