import classNames from "classnames/bind";
import styles from "./Home.module.scss";

import HomeFooter from "./components/HomeFooter";
import { useEffect, useRef, useState, React } from "react";
import { DropDownSuggestions } from "../../components/DrowDownSuggestions";

import * as httpRequest from "../../utils/httpRequest";

const cx = classNames.bind(styles);
function Home() {
  const [customers, setCustomers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const compStyles = {
    dropDownStyle: {
      position: "absolute",
      backgroundColor: "grey",
    },
  };
  const handleMouseOver = () => {
    setShowDropdown(true);
  };
  const handleMouseOut = () => {
    setShowDropdown(false);
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      const res = await httpRequest.get("");
      setCustomers(res.customersFromDb);
    };

    //fetchCustomers();
  }, []);

  return (
    <div>
      {/* {customers.map((customer) => {
        return (
          <div>
            <div>{customer.Username} </div>
            <div>{customer.Email}</div>
            <br></br>
          </div>
        );
      })} */}

      <div
        style={compStyles.labelStyle}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        Hello
        {showDropdown ? (
          <DropDownSuggestions>
            <div>
              <ul>
                <li>Tài khoản của tôi</li>
                <li>Đơn mua</li>
                <li>Đăng xuất</li>
              </ul>
            </div>
          </DropDownSuggestions>
        ) : (
          <></>
        )}
      </div>

      <div className={cx("product")}>
        <div className={cx("product-image")}>{/* todo */}</div>
        <div className={cx("product-description")}>
          <p className={cx("product-name")}></p>
          <p className={cx("product-price")}></p>
          <p className={cx("product-purchased")}></p>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
}

export default Home;
