import classNames from "classnames/bind";
import styles from "./Home.module.scss";

import HomeFooter from "./components/HomeFooter";
import { useEffect, useRef, useState } from "react";

import * as httpRequest from "../../utils/httpRequest";

const cx = classNames.bind(styles);
function Home() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const res = await httpRequest.get("");
      setCustomers(res.customersFromDb);
    };

    fetchCustomers();
  }, []);

  return (
    <div>
      {customers.map((customer) => {
        return (
          <div>
            <div>{customer.Username} </div>
            <div>{customer.Email}</div>
            <br></br>
          </div>
        );
      })}
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
