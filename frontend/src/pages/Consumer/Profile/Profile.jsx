import React, { useRef, useState } from "react";
import HomeFooter from "./components/HomeFooter";
import { AnimatePresence, delay, motion,} from "framer-motion";
import ProfileSettings from "./components/ProfileSettings/ProfileSettings";


const navAni = {
  hidden: { 
    opacity: 0,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemAni = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0 },
}

function Profile() {
  const [currentTab, setCurrentTab] = useState("");
  const [currentComponent, setCurrentComponent] = useState(React.Fragment);
  const tabs =useRef([
    {
      id: "profile",
      name: "Tài khoản của tôi",
      Icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>),
      onClick: () => setCurrentComponent(ProfileSettings),
      items: [{
        name:"Hồ sơ",
        component: ProfileSettings
      },{
        name:"Ngân hàng",
        component: ProfileSettings
      },{
        name:"Địa chỉ",
        component: ProfileSettings
      },{
        name:"Đổi mật khẩu",
        component: ProfileSettings
      },{
        name:"Cài đặt thông báo",
        component: ProfileSettings
      }]
    },
    {
      id: "orders",
      name: "Đơn mua",
      Icon:(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>),
      onClick: () => setCurrentComponent(ProfileSettings),
      items: [],
    },
    {
      id: "notification",
      name: "Thông báo",
      Icon:(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>),
      onClick: () => setCurrentComponent(ProfileSettings),
      items: [{
        name:"Cập nhật đơn hàng",
        component: ProfileSettings
      }, {
        name:"Khuyến mãi",
        component: ProfileSettings
      }, {
        name:"Cập nhật ví",
        component: ProfileSettings
      }, {
        name:"Cập nhật Shopee",
        component: ProfileSettings
      }],
    },
    {
      id: "voucher",
      name: "Voucher",
      Icon:(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>),
      onClick: () => setCurrentComponent(ProfileSettings),
      items: [],
    },
  ]);

  return (
    <motion.div>
      <motion.div className="lg:px-64 py-3 bg-grey-100">
        <motion.div className="lg:mx-4 my-2 flex gap-12">
          <motion.section className="w-48">
            <motion.div className="flex py-5 gap-2 border border-grey-100 border-b-grey-300">
              <motion.img className="rounded-full size-12" src="https://picsum.photos/440/440" alt="" />
              <motion.div>
                <motion.h1 className="text-lg font-semibold">User Name</motion.h1>
              </motion.div>
            </motion.div>
            <motion.nav>
              <motion.ul className="py-8 list-image-none flex flex-col gap-4">
                <AnimatePresence>
                  {tabs.current.map((tab, index) => (
                    <motion.li>
                      <motion.div
                        key={index}
                        onClick={() => {
                          setCurrentTab(tab.id)
                          tab.onClick()
                        }}
                        className={`flex items-center gap-4 p-2 hover:text-red cursor-pointer ${currentTab === tab.id ? "text-red" : ""}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tab.Icon}
                        <motion.span>{tab.name}</motion.span>
                      </motion.div>
                      {currentTab === tab.id && (
                        <motion.ul 
                          className="flex flex-col gap-2 pl-12"
                          variants={navAni}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          >
                          {tab.items.map((item, index) => (
                            <motion.li
                              variants={itemAni}
                              key={index}
                              className="cursor-pointer hover:text-red"
                              onClick={() => setCurrentComponent(item.component)}
                            >
                              {item}
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>
            </motion.nav>
          </motion.section>
          <motion.section className="bg-white rounded-md p-4 w-full border border-grey-200">
            {currentComponent}
          </motion.section>
        </motion.div>
      </motion.div>
      <HomeFooter />
    </motion.div>
  );
}

export default Profile;
