import classNames from "classnames/bind";

import styles from "./Footer.module.scss";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "../../../components/Icons/Icons";

const cx = classNames.bind(styles);

function Footer() {
  return (
    <>
      <div className={cx("d-flex")}>
        <div>
          <h3>Chăm Sóc khách hàng</h3>
          <ul>
            <li>Trung Tâm Trợ Giúp</li>
            <li>Shopee Blog</li>
            <li>Shopee Mail</li>
            <li>Hướng Dẫn Mua Hàng</li>
            <li>Hướng Dẫn Bán Hàng</li>
            <li>Thanh Toán</li>
            <li>Shopee Xu</li>
            <li>Vận Chuyển</li>
            <li>Trả Hàng & Hoàn Tiền</li>
            <li>Chăm Sóc Khách Hàng</li>
            <li>Chính Sách Bảo Hành</li>
          </ul>
        </div>
        <div>
          <h3>Về shopee</h3>
          <ul>
            <li>Giới Thiệu Về Shopee Việt Nam</li>
            <li>Tuyển Dụng</li>
            <li>Điều Khoản Shopee</li>
            <li>Chính Sách Bỏa Mật</li>
            <li>Chính Hãng</li>
            <li>Kênh Người Bán</li>
            <li>Flash Sales</li>
            <li>Chương Trình Tiếp Thị Liên Kết Shopee</li>
            <li>Liên Hệ Với Truyền Thông</li>
          </ul>
        </div>
        <div>
          <h3>Thanh toán</h3>
          <ul>
            <li>
              <img
                src="https://down-vn.img.susercontent.com/file/d4bbea4570b93bfd5fc652ca82a262a8"
                alt="logo"
              />
            </li>
            <li>
              <img
                src="https://down-vn.img.susercontent.com/file/a0a9062ebe19b45c1ae0506f16af5c16"
                alt="logo"
              />
            </li>
            <li>
              <img
                src="https://down-vn.img.susercontent.com/file/38fd98e55806c3b2e4535c4e4a6c4c08"
                alt="logo"
              />
            </li>
            <li>
              <img
                src="https://down-vn.img.susercontent.com/file/bc2a874caeee705449c164be385b796c"
                alt="logo"
              />
            </li>
            <li>
              <img
                src="https://down-vn.img.susercontent.com/file/2c46b83d84111ddc32cfd3b5995d9281"
                alt="logo"
              />
            </li>
            <li>
              <img
                src="https://down-vn.img.susercontent.com/file/5e3f0bee86058637ff23cfdf2e14ca09"
                alt="logo"
              />
            </li>
            <li>
              <img
                src="https://down-vn.img.susercontent.com/file/9263fa8c83628f5deff55e2a90758b06"
                alt="logo"
              />
            </li>
            <li>
              <img
                src="https://down-vn.img.susercontent.com/file/0217f1d345587aa0a300e69e2195c492"
                alt="logo"
              />
            </li>
          </ul>
        </div>
        <div>
          <h3>Theo dõi chúng tôi trên</h3>
          <ul>
            <li>
              <FacebookIcon color="grey" />
            </li>
            <li>
              <InstagramIcon color="grey" />
            </li>
            <li>
              <LinkedinIcon color="grey" />
            </li>
          </ul>
        </div>
      </div>
      <div></div>
      <div></div>
    </>
  );
}

export default Footer;
