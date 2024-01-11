import classNames from "classnames/bind";

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {

  return (<header className={cx('wrapper')}>
    <div className={cx('container')}>
      <div className={cx('settings | flex')}>
        <div className={cx('connections | flex')}>
          <div>Kênh Người Bán</div>
          <div>Tải ứng dụng</div>
          <div>
            <p>Kết nối</p>
            <i>fb</i>
            <i>inst</i>
          </div>
        </div>
        <div className={cx('user-settings | flex')}>
          <div>
            <i></i>
            <p>Thông báo</p>
          </div>
          <div>
            <i></i>
            <p>Hỗ Trợ</p>
          </div>
          <div>
            <i></i>
            <p>Language</p>
          </div>
          <div>
            <i></i>
            <p>User</p>
          </div>
        </div>
      </div>
      <div className={cx('main-header')}>
        <div className={cx('logo')}></div>
        <div className={cx('nav-wrapper')}>
          <div className={cx('search-bar')}>
            <input placeholder="Shoppe Thời Trang"></input>
            <button><i></i></button>
          </div>
          <div className={cx('header-nav-bar')}>
            <div>Bộ Vệ Sinh Laptop</div>
            <div>Ốp IPhone</div>
            <div>Tinh Dầu bưởi</div>
            <div>etc</div>
            <div>etc</div>
            <div>etc</div>
            <div>etc</div>
            <div>etc</div>
          </div>
          <div className={cx('cart-icon')}>
            <i>Cart</i>
          </div>
        </div>
      </div>
    </div>
  </header>
  )
}

export default Header;