import React from "react";
import { Link, useLocation } from "react-router-dom";
import HomeFooter from "./components/HomeFooter";
import { motion } from "framer-motion";
import config from "../../../config";

function OrderVNPay() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const vnp_Amount = queryParams.get("vnp_Amount");
  const vnp_BankCode = queryParams.get("vnp_BankCode");
  const vnp_BankTranNo = queryParams.get("vnp_BankTranNo");
  const vnp_CardType = queryParams.get("vnp_CardType");
  const vnp_OrderInfo = queryParams.get("vnp_OrderInfo");
  const vnp_PayDate = queryParams.get("vnp_PayDate");
  const vnp_TransactionNo = queryParams.get("vnp_TransactionNo");
  const vnp_TxnRef = queryParams.get("vnp_TxnRef");

  return (
    <motion.div className="bg-grey-100 min-h-screen py-8">
  <motion.div className="max-w-7xl mx-auto p-4">
    <motion.div className="lg:px-20 px-4 py-6">
      <motion.div className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-semibold text-green-500 mb-4">Order Successful</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-16 text-green-500 mb-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <p className="text-lg text-gray-700 mb-2">Amount: <span className="font-medium">{vnp_Amount}</span></p>
          <p className="text-lg text-gray-700 mb-2">Bank Code: <span className="font-medium">{vnp_BankCode}</span></p>
          <p className="text-lg text-gray-700 mb-2">Bank Transaction No: <span className="font-medium">{vnp_BankTranNo}</span></p>
          <p className="text-lg text-gray-700 mb-2">Card Type: <span className="font-medium">{vnp_CardType}</span></p>
          <p className="text-lg text-gray-700 mb-2">Order Info: <span className="font-medium">{vnp_OrderInfo}</span></p>
          <p className="text-lg text-gray-700 mb-2">Pay Date: <span className="font-medium">{vnp_PayDate}</span></p>
          <p className="text-lg text-gray-700 mb-2">Transaction No: <span className="font-medium">{vnp_TransactionNo}</span></p>
          <p className="text-lg text-gray-700 mb-4">Transaction Reference: <span className="font-medium">{vnp_TxnRef}</span></p>
          
          <button className="px-6 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition duration-300">
            <Link to={config.routes.public.home}>Quay Lại</Link>
          </button>
        </div>
      </motion.div>
    </motion.div>
  </motion.div>
  <HomeFooter />
</motion.div>

  );
}

export default OrderVNPay;