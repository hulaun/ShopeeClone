import { ShopeeIcon } from "../../components/Icons/Icons";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const bgVariants = {
  active: {
    backgroundColor: "#e5e7eb",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  passive: { 
    backgroundColor: "#FFFFFF",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
}

const svgVariants = {
  active: {
    fill: "#fd5e31",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  passive: { 
    fill: "#d2d6dc",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
}

const labelVariants = {
  active: {
    color: "#fd5e31",
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  passive: {
    color: "#d2d6dc",
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
}

const sideBarVariants = {
  hovered: {
    width: 150
  },
  none: {}
}


function AuthLayout({ children}) {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  const handleCurrentTab = (tab) => {
    setCurrentTab(tab);
    navigate(`/admin/${tab}`);
  }

  return (
    <motion.div className='flex bg-grey-100 w-dvh h-dvh'>
      <motion.div className='flex flex-col bg-white justify-between h-full'
        variants={sideBarVariants}
        whileHover="hovered"
        initial="none"
        animate="none"
        onHoverStart={handleMouseEnter}
        onHoverEnd={handleMouseLeave}
        >
        <motion.div className='pt-6 flex flex-col items-center'>
          <ShopeeIcon width="56" height="56"/>
          <motion.h2 className='text-lg font-bold text-secondary px-2'>Shopee</motion.h2>
          <motion.div className='flex flex-col pt-12 h-full w-full'>
            <motion.div 
              className={`flex ${!isHovered?"justify-center":"justify-start pl-4"} items-center gap-3 h-full w-full p-3`}
              variants={bgVariants}
              initial={currentTab === "dashboard"?"active":"passive"}
              animate={currentTab === "dashboard" ? "active" : "passive"}
              whileHover="active"
              onClick={() => handleCurrentTab("dashboard")}
              >
              <motion.svg
                className='hover:basis-1/3'
                width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  variants={svgVariants}
                  fill="#d2d6dc" fillRule="evenodd" clipRule="evenodd" d="M4.54 2.33008H7.92C9.33 2.33008 10.46 3.4894 10.46 4.91184V8.34847C10.46 9.77998 9.33 10.9292 7.92 10.9292H4.54C3.14 10.9292 2 9.77998 2 8.34847V4.91184C2 3.4894 3.14 2.33008 4.54 2.33008ZM4.54 13.8927H7.92C9.33 13.8927 10.46 15.043 10.46 16.4745V19.9111C10.46 21.3326 9.33 22.4919 7.92 22.4919H4.54C3.14 22.4919 2 21.3326 2 19.9111V16.4745C2 15.043 3.14 13.8927 4.54 13.8927ZM19.4601 2.33008H16.0801C14.6701 2.33008 13.5401 3.4894 13.5401 4.91184V8.34847C13.5401 9.77998 14.6701 10.9292 16.0801 10.9292H19.4601C20.8601 10.9292 22.0001 9.77998 22.0001 8.34847V4.91184C22.0001 3.4894 20.8601 2.33008 19.4601 2.33008ZM16.0801 13.8927H19.4601C20.8601 13.8927 22.0001 15.043 22.0001 16.4745V19.9111C22.0001 21.3326 20.8601 22.4919 19.4601 22.4919H16.0801C14.6701 22.4919 13.5401 21.3326 13.5401 19.9111V16.4745C13.5401 15.043 14.6701 13.8927 16.0801 13.8927Z"
                ></motion.path>
              </motion.svg>
              <motion.div
              style={
                isHovered?{
                  display: "flex",
                }:{
                  display: "none",
                }
              }
              variants={labelVariants}>
                Dashboard
              </motion.div>
            </motion.div>
            <motion.div 
              className={`flex ${!isHovered?"justify-center":"justify-start pl-4"} items-center gap-3 h-full w-full p-3`}
              variants={bgVariants}
              initial={currentTab === "analitics"?"active":"passive"}
              animate={currentTab === "analitics" ? "active" : "passive"}
              whileHover="active"
              onClick={() => handleCurrentTab("analitics")}
              >
              <motion.svg
                className='hover:basis-1/3'
                width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  variants={svgVariants}
                  fill="#d2d6dc" fillRule="evenodd" clipRule="evenodd" d="M7.33 2.76953H16.669C20.07 2.76953 21.99 4.71417 22 8.14273V17.5584C22 20.986 20.07 22.9316 16.669 22.9316H7.33C3.929 22.9316 2 20.986 2 17.5584V8.14273C2 4.71417 3.929 2.76953 7.33 2.76953ZM12.0494 18.7583C12.4804 18.7583 12.8394 18.4357 12.8794 18.0022V7.72962C12.9194 7.41711 12.7704 7.10359 12.5004 6.93322C12.2194 6.76184 11.8794 6.76184 11.6104 6.93322C11.3394 7.10359 11.1904 7.41711 11.2194 7.72962V18.0022C11.2704 18.4357 11.6294 18.7583 12.0494 18.7583ZM16.6499 18.7571C17.0699 18.7571 17.4289 18.4345 17.4799 18.0011V14.6945C17.5089 14.3709 17.3599 14.0694 17.0889 13.8981C16.8199 13.7267 16.4799 13.7267 16.1999 13.8981C15.9289 14.0694 15.7799 14.3709 15.8199 14.6945V18.0011C15.8599 18.4345 16.2189 18.7571 16.6499 18.7571ZM8.21945 18.0023C8.17945 18.4358 7.82045 18.7584 7.38945 18.7584C6.95945 18.7584 6.59945 18.4358 6.56045 18.0023V11.0363C6.53045 10.7227 6.67945 10.4112 6.95045 10.2399C7.21945 10.0685 7.56045 10.0685 7.83045 10.2399C8.09945 10.4112 8.25045 10.7227 8.21945 11.0363V18.0023Z"
                ></motion.path>
              </motion.svg>
              <motion.div
              style={
                isHovered?{
                  display: "flex"
                }:{
                  display: "none"
                }
              }
              variants={labelVariants}>
                Analytics
              </motion.div>
            </motion.div>
            <motion.div 
              className={`flex ${!isHovered?"justify-center":"justify-start pl-4"} items-center gap-3 h-full w-full p-3`}
              variants={bgVariants}
              initial={currentTab === "users"?"active":"passive"}
              animate={currentTab === "users" ? "active" : "passive"}
              whileHover="active"
              onClick={() => handleCurrentTab("users")}
              >
              <motion.svg
                className='hover:basis-1/3'
                width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  variants={svgVariants}
                  fillRule="evenodd" clipRule="evenodd" d="M21.7872 10.8147C21.6518 10.9473 21.4681 11.0231 21.2747 11.0231C20.559 11.0231 19.9787 11.5914 19.9787 12.2828C19.9787 12.9789 20.5522 13.5443 21.2611 13.5519C21.6605 13.5557 22 13.8285 22 14.2197V16.649C22 18.6939 20.3075 20.3523 18.2186 20.3523H15.0658C14.7398 20.3523 14.4758 20.0938 14.4758 19.7746V17.7288C14.4758 17.331 14.1567 17.0184 13.7505 17.0184C13.354 17.0184 13.0251 17.331 13.0251 17.7288V19.7746C13.0251 20.0938 12.7611 20.3523 12.4362 20.3523H5.78143C3.70213 20.3523 2 18.6949 2 16.649V14.2197C2 13.8285 2.33946 13.5557 2.73888 13.5519C3.44874 13.5443 4.02128 12.9789 4.02128 12.2828C4.02128 11.6103 3.46035 11.0988 2.72534 11.0988C2.53191 11.0988 2.34816 11.0231 2.21277 10.8905C2.07737 10.7579 2 10.5779 2 10.3885V7.93542C2 5.8934 3.706 4.22266 5.7911 4.22266H12.4362C12.7611 4.22266 13.0251 4.48122 13.0251 4.80041V7.22507C13.0251 7.61339 13.354 7.93542 13.7505 7.93542C14.1567 7.93542 14.4758 7.61339 14.4758 7.22507V4.80041C14.4758 4.48122 14.7398 4.22266 15.0658 4.22266H18.2186C20.3075 4.22266 22 5.88014 22 7.92595V10.3127C22 10.5022 21.9226 10.6821 21.7872 10.8147ZM13.7507 15.1819C14.1569 15.1819 14.4761 14.8599 14.4761 14.4715V10.683C14.4761 10.2947 14.1569 9.97266 13.7507 9.97266C13.3542 9.97266 13.0254 10.2947 13.0254 10.683V14.4715C13.0254 14.8599 13.3542 15.1819 13.7507 15.1819Z"/>
              </motion.svg>
              <motion.div
              style={
                isHovered?{
                  display: "flex"
                }:{
                  display: "none"
                }
              }
              variants={labelVariants}>
                Users
              </motion.div>
            </motion.div>
            <motion.div 
              className={`flex ${!isHovered?"justify-center":"justify-start pl-4"} items-center gap-3 h-full w-full p-3`}
              variants={bgVariants}
              initial={currentTab === "calendar"?"active":"passive"}
              animate={currentTab === "calendar" ? "active" : "passive"}
              whileHover="active"
              onClick={() => handleCurrentTab("calendar")}
              >
              <motion.svg
                className='hover:basis-1/3'
                width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  variants={svgVariants}
                  fillRule="evenodd" clipRule="evenodd" d="M16.4109 2.85297L16.4119 3.60867C19.1665 3.82631 20.9862 5.71859 20.9891 8.62048L21 17.1146C21.0039 20.2784 19.0322 22.2251 15.8718 22.2301L8.15188 22.2402C5.01119 22.2442 3.01482 20.2512 3.01087 17.0783L3.00001 8.68396C2.99606 5.76292 4.75153 3.87569 7.50617 3.62076L7.50518 2.86506C7.5042 2.42172 7.83001 2.0882 8.26444 2.0882C8.69886 2.0872 9.02468 2.4197 9.02567 2.86305L9.02666 3.56837L14.8914 3.56031L14.8904 2.85499C14.8894 2.41164 15.2152 2.07913 15.6497 2.07813C16.0742 2.07712 16.4099 2.40963 16.4109 2.85297ZM4.52149 8.99462L19.4696 8.97447V8.62181C19.4272 6.45547 18.349 5.31889 16.4139 5.14961L16.4148 5.92547C16.4148 6.35874 16.0801 6.70233 15.6556 6.70233C15.2212 6.70334 14.8944 6.36075 14.8944 5.92748L14.8934 5.11133L9.02865 5.11939L9.02963 5.93454C9.02963 6.36881 8.7048 6.7114 8.27038 6.7114C7.83595 6.7124 7.50915 6.37083 7.50915 5.93655L7.50816 5.1607C5.58287 5.35517 4.51755 6.49577 4.52051 8.68125L4.52149 8.99462ZM15.2402 13.5749V13.586C15.2501 14.0495 15.6253 14.4011 16.0804 14.3911C16.5247 14.38 16.8792 13.9961 16.8693 13.5326C16.8486 13.0892 16.4922 12.7275 16.0489 12.7285C15.5947 12.7386 15.2392 13.1114 15.2402 13.5749ZM16.055 18.0987C15.6009 18.0886 15.2346 17.7067 15.2336 17.2432C15.2237 16.7797 15.588 16.3958 16.0422 16.3848H16.0521C16.5161 16.3848 16.8923 16.7666 16.8923 17.2402C16.8933 17.7138 16.5181 18.0977 16.055 18.0987ZM11.1719 13.5902C11.1916 14.0537 11.5678 14.4154 12.022 14.3953C12.4663 14.3741 12.8207 13.9912 12.801 13.5277C12.7901 13.0743 12.4248 12.7216 11.9805 12.7227C11.5263 12.7428 11.1709 13.1267 11.1719 13.5902ZM12.0259 18.0535C11.5717 18.0736 11.1965 17.7119 11.1758 17.2484C11.1758 16.7849 11.5302 16.402 11.9844 16.3809C12.4287 16.3799 12.795 16.7325 12.8049 17.1849C12.8256 17.6494 12.4702 18.0323 12.0259 18.0535ZM7.10434 13.6256C7.12409 14.089 7.50026 14.4518 7.95443 14.4306C8.39873 14.4105 8.75318 14.0266 8.73245 13.5631C8.72257 13.1097 8.35726 12.757 7.91198 12.758C7.45781 12.7782 7.10336 13.1621 7.10434 13.6256ZM7.95848 18.0593C7.50431 18.0805 7.12913 17.7178 7.10839 17.2543C7.10741 16.7908 7.46284 16.4069 7.91702 16.3867C8.36131 16.3857 8.72761 16.7384 8.73748 17.1918C8.75822 17.6553 8.40377 18.0392 7.95848 18.0593Z"/>
              </motion.svg>
              <motion.div
              style={
                isHovered?{
                  display: "flex"
                }:{
                  display: "none"
                }
              }
              variants={labelVariants}>
                Calendar
              </motion.div>
            </motion.div>
            <motion.div 
              className={`flex ${!isHovered?"justify-center":"justify-start pl-4"} items-center gap-3 h-full w-full p-3`}
              variants={bgVariants}
              initial={currentTab === "messages"?"active":"passive"}
              animate={currentTab === "messages" ? "active" : "passive"}
              whileHover="active"
              onClick={() => handleCurrentTab("messages")}
              >
              <motion.svg
                className='hover:basis-1/3'
                width="24" height="24"
                viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  variants={svgVariants}
                  fill='#788B9A' d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z"/>
              </motion.svg>
              <motion.div
              style={
                isHovered?{
                  display: "flex"
                }:{
                  display: "none"
                }
              }
              variants={labelVariants}>
                Messages
              </motion.div>
            </motion.div>
            <motion.div 
              className={`flex ${!isHovered?"justify-center":"justify-start pl-4"} items-center gap-3 h-full w-full p-3`}
              variants={bgVariants}
              initial={currentTab === "settings"?"active":"passive"}
              animate={currentTab === "settings" ? "active" : "passive"}
              whileHover="active"
              onClick={() => handleCurrentTab("settings")}
              >
              <motion.svg
                className='hover:basis-1/3'
                width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  variants={svgVariants}
                  fillRule="evenodd" clipRule="evenodd" d="M20.4023 14.0664C20.76 14.258 21.036 14.5604 21.2301 14.8628C21.6083 15.4879 21.5776 16.254 21.2097 16.9295L20.4943 18.1392C20.1162 18.7844 19.411 19.1876 18.6855 19.1876C18.3278 19.1876 17.9292 19.0868 17.6022 18.8852C17.3365 18.7138 17.0299 18.6533 16.7029 18.6533C15.6911 18.6533 14.8429 19.49 14.8122 20.4881C14.8122 21.6474 13.872 22.5547 12.6968 22.5547H11.3069C10.1215 22.5547 9.18125 21.6474 9.18125 20.4881C9.16081 19.49 8.31259 18.6533 7.30085 18.6533C6.96361 18.6533 6.65702 18.7138 6.40153 18.8852C6.0745 19.0868 5.66572 19.1876 5.31825 19.1876C4.58245 19.1876 3.87729 18.7844 3.49917 18.1392L2.79402 16.9295C2.4159 16.2742 2.39546 15.4879 2.77358 14.8628C2.93709 14.5604 3.24368 14.258 3.59115 14.0664C3.87729 13.9253 4.06125 13.6934 4.23498 13.4213C4.74596 12.5543 4.43937 11.4151 3.57071 10.901C2.55897 10.3264 2.23194 9.04607 2.81446 8.04805L3.49917 6.85848C4.09191 5.86046 5.35913 5.50762 6.38109 6.09232C7.27019 6.57622 8.425 6.25362 8.9462 5.39673C9.10972 5.11446 9.20169 4.81203 9.18125 4.5096C9.16081 4.11644 9.27323 3.74344 9.4674 3.44101C9.84553 2.81598 10.5302 2.41274 11.2763 2.39258H12.7172C13.4735 2.39258 14.1582 2.81598 14.5363 3.44101C14.7203 3.74344 14.8429 4.11644 14.8122 4.5096C14.7918 4.81203 14.8838 5.11446 15.0473 5.39673C15.5685 6.25362 16.7233 6.57622 17.6226 6.09232C18.6344 5.50762 19.9118 5.86046 20.4943 6.85848L21.179 8.04805C21.7718 9.04607 21.4447 10.3264 20.4228 10.901C19.5541 11.4151 19.2475 12.5543 19.7687 13.4213C19.9322 13.6934 20.1162 13.9253 20.4023 14.0664ZM9.10937 12.4838C9.10937 14.0665 10.4073 15.3267 12.0117 15.3267C13.6162 15.3267 14.8834 14.0665 14.8834 12.4838C14.8834 10.9011 13.6162 9.63086 12.0117 9.63086C10.4073 9.63086 9.10937 10.9011 9.10937 12.4838Z"/>
              </motion.svg>
              <motion.div
              style={
                isHovered?{
                  display: "flex"
                }:{
                  display: "none"
                }
              }
              variants={labelVariants}>
                Settings
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div className='flex flex-col items-center py-6 gap-4'>
          <motion.img src="https://picsum.photos/40/40" alt="#" className='rounded-lg' />
          <motion.div className={`flex ${!isHovered?"justify-center":"justify-start pl-4"} items-center gap-3 h-full w-full p-3`}
              variants={bgVariants}
              initial={currentTab === "exit"?"active":"passive"}
              animate={currentTab === "exit" ? "active" : "passive"}
              whileHover="active"
              onClick={() => handleCurrentTab("exit")}
              >
            <motion.svg
              className='hover:basis-1/3' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path 
                variants={svgVariants}
                fill='#d2d6dc' fillRule="evenodd" clipRule="evenodd" d="M6.57946 8.03819C6.21487 8.03819 5.9266 8.32382 5.9266 8.68506C5.9266 9.0379 6.21487 9.33193 6.57946 9.33193H11.6667V13.3475C11.6667 15.4058 9.97941 17.0859 7.89365 17.0859H3.76453C1.68726 17.0859 0 15.4142 0 13.3559V4.02257C0 1.95595 1.69574 0.28418 3.77301 0.28418H7.91061C9.97941 0.28418 11.6667 1.95595 11.6667 4.01417V8.03819H6.57946ZM14.692 5.77864L17.1253 8.22329C17.2503 8.3493 17.317 8.50892 17.317 8.68534C17.317 8.85336 17.2503 9.02137 17.1253 9.13899L14.692 11.5836C14.567 11.7097 14.4003 11.7769 14.242 11.7769C14.0753 11.7769 13.9087 11.7097 13.7837 11.5836C13.5337 11.3316 13.5337 10.92 13.7837 10.6679L15.117 9.33221H11.667V8.03847H15.117L13.7837 6.70273C13.5337 6.45071 13.5337 6.03906 13.7837 5.78704C14.0337 5.52661 14.442 5.52661 14.692 5.77864Z"/>
            </motion.svg>
            <motion.div
              style={
                isHovered?{
                  display: "flex"
                }:{
                  display: "none"
                }
              }
              variants={labelVariants}>
              Exit
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
      {children}
    </motion.div>
  );
}

export default AuthLayout;
