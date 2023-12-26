import React, { useEffect } from "react";
import AdminHeader from "../../components/Layouts/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../../redux/actions/order";
import { Box } from "@material-ui/core";

const AdminDashboardOrders = () => {
  const dispatch = useDispatch();

  const { adminOrders, adminOrderLoading } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
  }, []);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7,headerClassName: "super-app-theme--header", },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      headerClassName: "super-app-theme--header",
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
      headerClassName: "super-app-theme--header",
    },
    {
        field: "createdAt",
        headerName: "Order Date",
        type: "number",
        minWidth: 130,
        flex: 0.8,
        headerClassName: "super-app-theme--header",
      },
  ];

  const row = [];
  adminOrders &&
    adminOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
        total: item?.totalPrice + " $",
        status: item?.status,
        createdAt: item?.createdAt.slice(0,10),
      });
    });
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={2} />
          </div>

          <div className="w-full min-h-[45vh] pt-5 rounded flex justify-center">
            <div className="w-[97%] flex justify-center">
            <Box
            sx={{
              height: 300,
              width: "100%",
              "& .super-app-theme--header": {
                backgroundColor: "rgba(4, 57, 10, 0.79)",
                fontSize: 16,
                fontWeight: "700",
                color: "#fff",
              },
            }}
          >
              <DataGrid
                rows={row}
                columns={columns}
                pageSize={4}
                disableSelectionOnClick
                autoHeight
              /></Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOrders;
