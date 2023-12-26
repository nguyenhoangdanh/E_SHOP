import React from 'react'
import ShopUpdatePassword from "../../components/Shop/ShopUpdatePassword.jsx";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
const ShopUpdatePasswordPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={13} />
        </div>
        <ShopUpdatePassword />
      </div>
    </div>
  )
}

export default ShopUpdatePasswordPage

