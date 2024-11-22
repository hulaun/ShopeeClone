import React, { useRef, useState } from "react";
import HomeFooter from "./components/HomeFooter";
import { AnimatePresence, delay, motion,} from "framer-motion";
import MainProfile from "./components/MainProfile/MainProfile";
import { useAuth } from "../../../context/AuthContext";

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
  const { currentUser } = useAuth();
  const [currentTab, setCurrentTab] = useState("");
  const [currentComponent, setCurrentComponent] = useState(React.Fragment);
  const tabs =useRef([
    {
      id: "profile",
      name: "Tài khoản của tôi",
      Icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>),
      onClick: () => setCurrentComponent(MainProfile),
      items: [{
        id: "mainProfile",
        name:"Hồ sơ",
        component: MainProfile
      },{
        id: "bankProfile",
        name:"Ngân hàng",
        component: MainProfile
      },{
        id: "addressProfile",
        name:"Địa chỉ",
        component: MainProfile
      },{
        id: "changePassword",
        name:"Đổi mật khẩu",
        component: MainProfile
      },{
        id: "notificationProfile",
        name:"Cài đặt thông báo",
        component: MainProfile
      }]
    },
    {
      id: "orders",
      name: "Đơn mua",
      Icon:(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
      </svg>),
      onClick: () => setCurrentComponent(MainProfile),
      items: [],
    },
    {
      id: "notification",
      name: "Thông báo",
      Icon:(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
      </svg>),
      onClick: () => setCurrentComponent(MainProfile),
      items: [{
        id: "mainNotification",
        name:"Cập nhật đơn hàng",
        component: MainProfile
      }, {
        id: "promotionNotification",
        name:"Khuyến mãi",
        component: MainProfile
      }, {
        id: "systemNotification",
        name:"Cập nhật ví",
        component: MainProfile
      }, {
        id: "shopeeNotification",
        name:"Cập nhật Shopee",
        component: MainProfile
      }],
    },
    {
      id: "voucher",
      name: "Voucher",
      Icon:(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
      </svg>),
      onClick: () => setCurrentComponent(MainProfile),
      items: [],
    },
  ]);

  return (
    <motion.div className="bg-grey-100">
      <motion.div className="max-w-7xl py-3 m-auto">
        <motion.div className="my-2 flex gap-12">
          <motion.section className="w-48">
            <motion.div className="flex py-5 gap-2 border border-grey-100 border-b-grey-200">
              <motion.img className="rounded-full size-12" src="https://picsum.photos/440/440" alt="" />
              <motion.div>
                <motion.h1 className="text-lg font-semibold">{currentUser?currentUser.username:JSON.stringify(currentUser)}</motion.h1>
              </motion.div>
            </motion.div>
            <motion.nav>
              <motion.ul className="py-8 list-image-none flex flex-col gap-4">
                <AnimatePresence>
                  {tabs.current.map((tab) => (
                    <motion.li
                      key={tab.id}
                      >
                      <motion.div
                        onClick={() => {
                          setCurrentTab(tab.id)
                          tab.onClick()
                        }}
                        className={`flex items-center gap-4 hover:text-red cursor-pointer ${currentTab === tab.id ? "text-red" : ""}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tab.Icon}
                        <motion.span>{tab.name}</motion.span>
                      </motion.div>
                      {(currentTab === tab.id || tab.items.find((item)=>item.id===currentTab) ) && (
                        <motion.ul
                          className="flex flex-col gap-3 pl-12"
                          variants={navAni}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          >
                          {tab.items.map((item) => (
                            <motion.li
                              variants={itemAni}
                              key={item.name}
                              className={`cursor-pointer hover:text-red ${currentTab === item.id ? "text-red" : ""}`}
                              onClick={() => {
                                setCurrentTab(item.id)
                                setCurrentComponent(item.component)
                              }}
                            >
                              {item.name}
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
            <MainProfile></MainProfile>
          </motion.section>
        </motion.div>
      </motion.div>
      <HomeFooter />
    </motion.div>
  );
}

export default Profile;
