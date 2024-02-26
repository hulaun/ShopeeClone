import classNames from "classnames/bind";

import styles from "./InputBox.module.scss";

const cx = classNames.bind(styles);
function InputBox({
  inputBoxStyle = {},
  inputStyle = {},
  inputProps = {},
  children,
}) {
  return (
    <div className={cx("input-box")} style={inputBoxStyle}>
      <input className={cx("input")} style={inputStyle} {...inputProps}></input>
      {children}
    </div>
  );
}
export default InputBox;
