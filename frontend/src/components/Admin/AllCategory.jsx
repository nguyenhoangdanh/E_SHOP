import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { roleData } from "../../static/data";
import { DataGrid } from "@material-ui/data-grid";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Box, Button } from "@material-ui/core";
import { PiNotePencilFill } from "react-icons/pi";
import { toast } from "react-toastify";
import { server } from "../../server";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  AdminCreateCategory,
  getAllCategory,
} from "../../redux/actions/category";

const AllCategory = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  const { success, error } = useSelector((state) => state.category);
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [openUpdate, setOpenUpdate] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    axios
      .get(`${server}/category/get-all-category`, { withCredentials: true })
      .then((res) => {
        setData(res.data.category);
      });
  }, [dispatch]);

  const handleDelete = async (id) => {
    await axios
      .delete(`${server}/category/delete-category/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
      });
  };
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setImages(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (openCreate) {
      const newForm = new FormData();
      newForm.append("name", name);
      newForm.append("description", description);
      newForm.append("images", images);
      dispatch(AdminCreateCategory(newForm));
      setOpenCreate(false);
      if (success) {
        toast.success("Category created successfull!");
      }
    }
    if (openUpdate) {
      console.log("update");
      const handleUpdate = async () => {
        console.log("update");
        await axios
          .put(
            `${server}/category/update-category`,
            { name, description },
            { withCredentials: true }
          )
          .then((res) => {
            toast.success("Update role successfully!");
            setOpenUpdate(false);
          });

        dispatch(getAllCategory());
      };
      handleUpdate();
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "Category ID",
      minWidth: 100,
      flex: 0.7,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "name",
      headerName: "Name",
      minWidth: 130,
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "description",
      headerName: "Description",
      type: "text",
      minWidth: 130,
      flex: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "joinedAt",
      headerName: "joinedAt",
      type: "text",
      minWidth: 80,
      flex: 0.6,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "  ",
      flex: 0.6,
      minWidth: 150,
      headerName: "Update",
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
                setCategoryId(params.id) ||
                setName(params.row.name) ||
                setDescription(params.row.description) ||
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
      flex: 0.6,
      minWidth: 150,
      headerName: "Delete",
      type: "number",
      sortable: false,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setCategoryId(params.id) || setOpen(true)}
            >
              <AiOutlineDelete color="white" size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];
  data &&
    data.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        description: item.description,
        joinedAt: item.createdAt.slice(0, 10),
      });
    });

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Category</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
              onClick={() => setOpenCreate(true)}
            >
              <span className="text-white">Create Category</span>
            </div>
          </div>
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
                  onClick={() => setOpen(false) || handleDelete(categoryId)}
                >
                  Confirm
                </div>
              </div>
            </div>
          </div>
        )}
        {openCreate && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[90%] 800px:w-[40%] bg-white mt-10 shadow h-[70vh] rounded-[4px] p-3 overflow-y-scroll">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpenCreate(false)} />
              </div>
              <h5 className="text-[30px] font-Poppins text-center">
                Create Category
              </h5>
              {/* create categories form */}
              <form onSubmit={handleSubmit}>
                <br />
                <div>
                  <label className="pb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your product name..."
                  />
                </div>
                <br />
                <div>
                  <label className="pb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    cols="10"
                    required
                    rows="5"
                    type="text"
                    name="description"
                    value={description}
                    className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter your product description..."
                  ></textarea>
                </div>
                <br />

                <div>
                  <label className="pb-2">
                    Upload Images <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name=""
                    id="upload"
                    className="hidden"
                    multiple
                    onChange={handleFileInputChange}
                  />
                  <div className="w-full flex items-center flex-wrap">
                    <label htmlFor="upload">
                      <AiOutlinePlusCircle
                        size={30}
                        className="mt-3"
                        color="#555"
                      />
                    </label>
                    {images && (
                      <img
                        src={URL.createObjectURL(images)}
                        alt="images"
                        className="h-[80px] w-[80px] object-cover m-2"
                      />
                    )}
                  </div>
                  <br />
                  <div>
                    <input
                      type="submit"
                      value="Create"
                      className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </form>
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
                Change category
              </h3>
              <form onSubmit={handleSubmit}>
                <br />
                <div>
                  <label className="pb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your category name..."
                  />
                </div>
                <br />
                <div>
                  <label className="pb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    cols="10"
                    required
                    rows="5"
                    type="text"
                    name="description"
                    value={description}
                    className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter your category description..."
                  ></textarea>
                </div>
                <br />
                <div>
                  <input
                    type="submit"
                    value="Update"
                    className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCategory;
