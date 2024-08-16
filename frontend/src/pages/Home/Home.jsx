import classNames from "classnames/bind";
import styles from "./Home.module.scss";

import HomeFooter from "./components/HomeFooter";
import { useEffect, useRef, useState, React } from "react";
import { DropDownSuggestions } from "../../components/DrowDownSuggestions";

import * as httpRequest from "../../utils/httpRequest";
import Category from "./components/Category";

const cx = classNames.bind(styles);
function Home() {
  const [customers, setCustomers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentIndexCarousel, setCurrentIndexCarousel] = useState(0);
  const images = [
    'https://picsum.photos/id/236/800/200',
    'https://picsum.photos/id/237/800/200',
    'https://picsum.photos/id/238/800/200',
    'https://picsum.photos/id/239/800/200',
  ];

  const compStyles = {
    dropDownStyle: {
      position: "absolute",
      backgroundColor: "grey",
    },
  };
  
  const handlePrev = () => {
    setCurrentIndexCarousel((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndexCarousel((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
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
      <div className="lg:px-40">
        <div className="relative flex items-center justify-center mt-4">
          <div onClick={handlePrev} className="left-4 w-7 absolute">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
            </svg>
          </div>
          <div className="w-full">
            <img src={images[currentIndexCarousel]} alt="Carousel" className="w-full h-auto object-cover" />
          </div>
          <div onClick={handleNext} className="right-4 w-7 absolute">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
            </svg>
          </div>
        </div>
        <Category />
        <div
          style={compStyles.labelStyle}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          {showDropdown && (
            <DropDownSuggestions>
              <div>
                <ul>
                  <li>Tài khoản của tôi</li>
                  <li>Đơn mua</li>
                  <li>Đăng xuất</li>
                </ul>
              </div>
            </DropDownSuggestions>
          )}
        </div>
      </div>
      <HomeFooter />
    </div>
  );
}

export default Home;
