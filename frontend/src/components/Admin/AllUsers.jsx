import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../redux/actions/user";
import { DataGrid } from "@material-ui/data-grid";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { PiNotePencilFill, PiNotePencilLight } from "react-icons/pi";
import { Box, Button } from "@material-ui/core";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { StatusUser, roleData } from "../../static/data";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [openUpdate, setOpenUpdate] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await axios
      .delete(`${server}/user/delete-user/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
      });

    dispatch(getAllUsers());
  };

  const handleUpdateRole = async () => {
    await axios
      .put(
        `${server}/user/update-user-role`,
        { role, status },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Update role successfully!");
        // window.location.reload();
      });

    dispatch(getAllUsers());
  };

  const columns = [
    {
      field: "id",
      headerName: "User ID",
      minWidth: 150,
      flex: 0.7,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "name",
      headerName: "name",
      minWidth: 130,
      flex: 0.7,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 130,
      flex: 0.7,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "role",
      headerName: "User Role",
      type: "text",
      minWidth: 100,
      flex: 0.7,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "status",
      headerName: "Status",
      type: "text",
      minWidth: 100,
      flex: 0.7,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "joinedAt",
      headerName: "joinedAt",
      type: "text",
      minWidth: 130,
      flex: 0.8,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "  ",
      flex: 1,
      minWidth: 150,
      headerName: "Update role",
      type: "number",
      sortable: false,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                setUserId(params.id) ||
                setRole(params.row.role) ||
                setStatus(params.row.status) ||
                setOpenUpdate(true)
              }
            >
              <PiNotePencilFill color="white" size={20} />
            </Button>
          </>
        );
      },
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "Delete User",
      type: "number",
      sortable: false,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setUserId(params.id) || setOpen(true)}
            >
              <AiOutlineDelete color="white" size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];
  users &&
    users.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        status: item.status,
        joinedAt: item.createdAt.toString().slice(8, 10) + "/" +item.createdAt.toString().slice(5, 7)+"/"+item.createdAt.toString().slice(0, 4),
      });
    });

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Users</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
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
              pageSize={10}
              disableSelectionOnClick
              autoHeight
            />
          </Box>
        </div>
        {open && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpen(false)} />
              </div>
              <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                Are you sure you wanna delete this user?
              </h3>
              <div className="w-full flex items-center justify-center">
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </div>
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
                  onClick={() => setOpen(false) || handleDelete(userId)}
                >
                  Confirm
                </div>
              </div>
            </div>
          </div>
        )}
        {openUpdate && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpenUpdate(false)} />
              </div>
              <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                Change role user
              </h3>
              <div>
                <label className="pb-2">
                  Role user <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full mt-2 border h-[35px] rounded-[5px]"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="Choose a role">{role}</option>
                  {roleData &&
                    roleData.map((i) => (
                      <option value={i.role} key={i.role}>
                        {i.role}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="pb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full mt-2 border h-[35px] rounded-[5px]"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Choose a role">{status}</option>
                  {StatusUser &&
                    StatusUser.map((i) => (
                      <option value={i.status} key={i.status}>
                        {i.status}
                      </option>
                    ))}
                </select>
              </div>
              <div className="w-full flex items-center justify-center">
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
                  onClick={() =>
                    setOpenUpdate(false) || handleUpdateRole(userId)
                  }
                >
                  Update role
                </div>
              </div>
            </div>
          </div>
          // </form>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
