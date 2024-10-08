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
      <div className={cx("wrapper")}>
        <div className={cx("container", "d-flex")}>
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
          <div className={cx("socials")}>
            <h3>Theo dõi chúng tôi trên</h3>
            <ul>
              <li>
                <FacebookIcon color="black" />
                <label>Facebook</label>
              </li>
              <li>
                <InstagramIcon color="black" />
                <label>Instagram</label>
              </li>
              <li>
                <LinkedinIcon color="black" />
                <label>Linkedin</label>
              </li>
            </ul>
          </div>
        </div>
        <div className={cx("container", "d-flex", "privileges")}>
          <p>© 2024 Shopee. Tất cả các quyền được bảo lưu.</p>
          <div className={cx("d-flex")}>
            <label>Quốc gia & Khu vực: </label>
            <ul className={cx("d-flex")}>
              <li>Singapore</li>
              <li>Indonesia</li>
              <li>Đài Loan</li>
              <li>Thái Lan</li>
              <li>Malaysia</li>
              <li>Việt Nam</li>
              <li>Philippines</li>
              <li>Brazil</li>
              <li>México</li>
              <li>Colombia</li>
              <li>Chile</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={cx("wrapper-secondary")}>
        <div className={cx("container")}>
          <ul className={cx("d-flex")}>
            <li>CHÍNH SÁCH BẢO MẬT</li>
            <li>QUY CHẾ HOẠT ĐỘNG</li>
            <li>CHÍNH SÁCH VẬN CHUYỂN</li>
            <li>CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN</li>
          </ul>
          <div className={cx("description")}>
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai,
            Phường Ngọc Khánh, Quận Ba Đình, Thành phố Hà Nội, Việt Nam. Tổng
            đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
            <br />
            Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên
            hệ: 024 73081221 (ext 4678)
            <br />
            Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp
            lần đầu ngày 10/02/2015
            <br />© 2015 - Bản quyền thuộc về Công ty TNHH Shopee
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
