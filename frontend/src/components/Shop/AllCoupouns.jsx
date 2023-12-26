/* eslint-disable jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProductsShop } from "../../redux/actions/product";
import {
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { Box, Button } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import Loader from "../Layouts/Loader";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { deletecouponCode, getAllCouponCodesShop } from "../../redux/actions/coupon";
import { PiNotePencilFill } from "react-icons/pi";

const AllCoupouns = () => {
  const { products } = useSelector((state) => state.products);
  const {couponCodes} = useSelector((state) => state.couponCodes);
  const { seller } = useSelector((state) => state.seller);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [idCode, setCode] = useState("");
  const [coupouns, setCoupouns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [minAmount, setMinAmout] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [value, setValue] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/coupon/get-coupon/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        setCoupouns(res.data.couponCodes);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCouponCodesShop(seller._id));
  }, []);

  const handleDelete = (id) => {
    dispatch(deletecouponCode(id));
    window.location.reload();
    // setTimeout(function(){window.location.reload(true);},100)
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${server}/coupon/create-coupon-code`,
        {
          name,
          minAmount,
          maxAmount,
          selectedProducts,
          value,
          shopId: seller,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Coupon code created successfully!");
        setOpen(false);
        // window.location.reload(true);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const columns = [
    {
      field: "name",
      headerName: "Tên mã",
      minWidth: 180,
      flex: 0.8,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "value",
      headerName: "Phần trăm",
      minWidth: 180,
      flex: 0.9,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "minAmount",
      headerName: "Giá trị đơn tối thiếu",
      minWidth: 180,
      flex: 0.9,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "maxAmount",
      headerName: "Giá trị đơn tối đa",
      minWidth: 180,
      flex: 0.9,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "sold",
      headerName: "Đã bán",
      type: "number",
      minWidth: 100,
      flex: 0.7,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "  ",
      flex: 0.5,
      minWidth: 50,
      headerName: "Chỉnh sửa",
      type: "number",
      sortable: false,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setCode(params.id) || setOpenUpdate(true)}
            >
              <PiNotePencilFill color="white" size={20} />
            </Button>
          </>
        );
      },
    },
    {
      field: "Xóa",
      flex: 0.5,
      minWidth: 50,
      headerName: "",
      type: "number",
      sortable: false,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDelete(params.id)}
            >
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  console.log("id", idCode)
    console.log("code", couponCodes)

    useEffect(() => {
     if(openUpdate===true){
       const code = couponCodes.find((item) => {
        return item._id === idCode;
      });
      setData(code);
     }
    }, [idCode, openUpdate]);

  
    useEffect(() => {
      setName(data.name);
      setValue(data.value);
      setMinAmout(data.minAmount);
      setMaxAmount(data.maxAmount);
    }, [data,idCode, openUpdate]);

    useEffect(() => {
      if (open) {
        setName("");
        setValue("");
        setMinAmout("");
        setMaxAmount("");
      }
    }, [open]);

  coupouns &&
    coupouns.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        value: item.value + " %",
        minAmount: item.minAmount,
        maxAmount: item.maxAmount,
        sold: item.sold,
      });
    });

    

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white">Tạo mã giảm giá</span>
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
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
              <div className="w-[90%] 800px:w-[40%] h-[85vh] bg-white rounded-md shadow p-4">
                <div className="w-full flex justify-end">
                  <RxCross1
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h5 className="text-[30px] font-Poppins text-center">
                  Tạo mã giảm giá
                </h5>
                {/* create coupoun code */}
                <form onSubmit={handleSubmit} aria-required={true}>
                  <br />
                  <div>
                    <label className="pb-2">
                      Tên mã <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={name}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nhập mã giảm giá..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Phần trăm chiết khấu{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="value"
                      value={value}
                      required
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Nhập phần trăm giá giảm..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Số tiền tối thiểu</label>
                    <input
                      type="number"
                      name="value"
                      value={minAmount}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setMinAmout(e.target.value)}
                      placeholder="Nhập số tiền tối thiểu..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Số tiền tối đa</label>
                    <input
                      type="number"
                      name="value"
                      value={maxAmount}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setMaxAmount(e.target.value)}
                      placeholder="Nhập số tiền tối đa..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Chọn sản phẩm</label>
                    <select
                      className="w-full mt-2 border h-[35px] rounded-[5px]"
                      value={selectedProducts}
                      onChange={(e) => setSelectedProducts(e.target.value)}
                    >
                      <option value="Chọn sản phẩm">
                       Chọn một sản phẩm
                      </option>
                      {products &&
                        products.map((i) => (
                          <option value={i.name} key={i.name}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <br />
                  <div>
                    <input
                      type="submit"
                      value="Tạo mã"
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}

          {openUpdate && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
              <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
                <div className="w-full flex justify-end cursor-pointer">
                  <RxCross1 size={25} onClick={() => setOpenUpdate(false)} />
                </div>
                <h5 className="text-[30px] font-Poppins text-center">
                  Cập nhật mã giảm giá
                </h5>
                {/* Update product form */}
                <form onSubmit={handleSubmit}>
                  <br />
                  <div>
                    <label className="pb-2">
                      Tên mã <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nhập tên mã..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Phần trăm <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      cols="30"
                      required
                      rows="8"
                      type="text"
                      name="value"
                      value={value}
                      className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Nhập phần trăm chiết khấu..."
                    ></textarea>
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Giá trị đơn tối thiểu</label>
                    <input
                      type="text"
                      name="minAmount"
                      value={minAmount}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setMinAmout(e.target.value)}
                      placeholder="Nhập giá trị đơn tối thiểu..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Giá trị đơn tối đã</label>
                    <input
                      type="number"
                      name="maxAmount"
                      value={maxAmount}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setMaxAmount(e.target.value)}
                      placeholder="Nhập giá trị đơn tối đa..."
                    />
                  </div>
                  <br />
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllCoupouns;
