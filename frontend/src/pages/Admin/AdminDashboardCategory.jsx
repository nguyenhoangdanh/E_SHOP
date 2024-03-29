import React from 'react'
import AdminHeader from '../../components/Layouts/AdminHeader'
import AdminSideBar from '../../components/Admin/Layout/AdminSideBar'
import AllCategory from "../../components/Admin/AllCategory";

const AdminDashboardCategoty = () => {
  return (
    <div>
    <AdminHeader />
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={9} />
        </div>
        <AllCategory />
      </div>
    </div>
  </div>
  )
}

export default AdminDashboardCategoty