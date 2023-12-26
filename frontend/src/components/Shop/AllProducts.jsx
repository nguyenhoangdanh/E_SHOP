import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  deleteProduct,
  getAllProductsShop,
} from "../../redux/actions/product";
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
import { toast } from "react-toastify";
import { categoriesData } from "../../static/data";
import { PiNotePencilFill } from "react-icons/pi";
import { getAllCategory } from "../../redux/actions/category";
import axios from "axios";
import { server } from "../../server";
import { Editor } from "@tinymce/tinymce-react"; //1. Import TinyMCE Editor

const AllProducts = () => {
  const { products, isLoading, success, error } = useSelector(
    (state) => state.products
  );
  const { seller } = useSelector((state) => state.seller);
  const { category } = useSelector((state) => state.category);
  const [productId, setProductId] = useState("");
  // const [categoryId, setcategoryId] = useState(seller._id);
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
    dispatch(getAllCategory());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    //  window.location.reload();
    // setTimeout(function(){window.location.reload(true);},100)
  };

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //   }
  //   if (success) {
  //     toast.success("Product created successfully!");
  //     navigate("/dashboard");
  //     // window.location.reload();
  //     // setTimeout(function(){window.location.reload(true);},100)
  //   }
  // }, [dispatch, error, success]);
  // useEffect(() => {
  //   dispatch(getAllCategory());
  // }, [openUpdate]);

  const handleImageChange = (e) => {
    let files = Array.from(e.target.files);

    setImages((prevImage) => [...prevImage, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (open === true) {
      const newForm = new FormData();

      images.forEach((image) => {
        newForm.append("images", image);
      });
      newForm.append("name", name);
      newForm.append("description", description);
      newForm.append("category", categories);
      newForm.append("tags", tags);
      newForm.append("originalPrice", originalPrice);
      newForm.append("discountPrice", discountPrice);
      newForm.append("stock", stock);
      newForm.append("shopId", seller._id);
      dispatch(createProduct(newForm));
      setOpen(false);
    }
    if (openUpdate === true) {
      await axios
        .put(
          `${server}/product/update-shop-product/${productId}`,
          {
            name,
            description,
            categories,
            tags,
            originalPrice,
            discountPrice,
            stock,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          toast.success("Cập nhật sản phẩm thành công!");
          setOpenUpdate(false);
          // setTimeout(function(){window.location.reload(true);},100)
          // localStorage.setItem('seller', JSON.stringify(seller));
          //  window.location.reload();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };

  const columns = [
    // { field: "id", headerName: "Id sản phẩm", minWidth: 150, flex: 0.5 },
    {
      field: "name",
      headerName: "Tên sản phẩm",
      minWidth: 180,
      flex: 0.6,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "price",
      headerName: "Giá bán",
      minWidth: 100,
      flex: 0.45,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "Stock",
      headerName: "Tổng số lượng",
      type: "number",
      minWidth: 80,
      flex: 0.45,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "sold",
      headerName: "Đã bán",
      type: "number",
      minWidth: 130,
      flex: 0.45,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "Xem",
      flex: 0.45,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "  ",
      flex: 0.5,
      minWidth: 150,
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
              onClick={() =>
                setProductId(params.id) ||
                //   setRole(params.row.role) ||
                //   setStatus(params.row.status) ||
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
      flex: 0.5,
      minWidth: 150,
      headerName: "Xóa",
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
              <AiOutlineDelete color="white" size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  products &&
    products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.discountPrice + " đ",
        Stock: item.stock,
        sold: item?.sold_out,
      });
    });

  useEffect(() => {
    const product = products.find((item) => {
      return item._id === productId;
    });
    setData(product);
  }, [productId, openUpdate]);

  useEffect(() => {
    setName(data?.name);
    setDescription(data?.description);
    setCategories(data?.category);
    setTags(data?.tags);
    setOriginalPrice(data?.originalPrice);
    setDiscountPrice(data?.discountPrice);
    setStock(data?.stock);
  }, [data, productId, openUpdate]);

  useEffect(() => {
    if (open) {
      setName("");
      setDescription("");
      setCategories("");
      setTags("");
      setOriginalPrice("");
      setDiscountPrice("");
      setStock("");
    }
  }, [open]);

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
              <span className="text-white"> Thêm sản phẩm</span>
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
              <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
                <div className="w-full flex justify-end cursor-pointer">
                  <RxCross1 size={25} onClick={() => setOpen(false)} />
                </div>
                <h5 className="text-[30px] font-Poppins text-center">
                  Thêm sản phẩm
                </h5>
                {/* create product form */}
                <form onSubmit={handleSubmit}>
                  <br />
                  <div>
                    <label className="pb-2">
                      Tên sản phẩm <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nhập tên sản phẩm..."
                    />
                  </div>
                  <br />
                  {/* <div>
                    <label className="pb-2">
                      Mô tả <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      cols="30"
                      required
                      rows="8"
                      type="text"
                      name="description"
                      value={description}
                      className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Nhập mô tả sản phẩm..."
                    ></textarea>
                  </div> */}
                  {/* <div className="w-full"> */}
                    <label className="pb-2">
                      Mô tả
                    </label>

                    <Editor
                      tinymceScriptSrc={
                        process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"
                      }
                      apiKey="your-api-key"
                      init={{
                        name:description,
                        value:{description},
                        onChange:(e) => setDescription(e.target.value),
                        height: 400,
                        selector: "textarea",
                        backgroundColor: "red",
                        toolbar_mode: "scrolling",
                        toolbar_location: "top",
                        content_style:
                          "div { margin: 10px; border: 5px solid red; padding: 3px; } " +
                          ".blue { color: blue; } .red { color: red; }",
                        plugins: [
                          "a11ychecker advcode advlist advtable anchor autocorrect autosave editimage image link linkchecker lists media mediaembed pageembed powerpaste searchreplace table template tinymcespellchecker typography visualblocks wordcount",
                        ],
                        toolbar:
                          "undo redo | blocks fontfamily fontsize | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify lineheight | removeformat | link ",
                        menubar: false,
                        block_formats:
                          "Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3",
                        content_style: `
                        body {
                        font-family: Arial, sans-serif;
                        margin: 12px;
                      }
                      h1, h2, h3, p {
                        color: #4D66CB;
                        margin: 10px;
                      }
                      `,
                      }}
                    />
                  {/* </div> */}

                  <br />
                  <div>
                    <label className="pb-2">
                      Loại sản phẩm <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full mt-2 border h-[35px] rounded-[5px]"
                      value={categories}
                      onChange={(e) => setCategories(e.target.value)}
                    >
                      <option value="Chọn loại sản phẩm">
                        Chọn loại sản phẩm
                      </option>
                      {category &&
                        category.map((i) => (
                          <option value={i.name} key={i.name}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Tags</label>
                    <input
                      type="text"
                      name="tags"
                      value={tags}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="Nhập tags..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Giá gốc <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={originalPrice}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      placeholder="Nhập giá gốc sản phẩm..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Giá (Có chiết khấu){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={discountPrice}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setDiscountPrice(e.target.value)}
                      placeholder="Nhập giá sản phẩm của bạn với mức giảm giá..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Số lượng <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={stock}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setStock(e.target.value)}
                      placeholder="Nhập số lượng sản phẩm..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Tải ảnh lên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name=""
                      id="upload"
                      className="hidden"
                      multiple
                      onChange={handleImageChange}
                    />
                    <div className="w-full flex items-center flex-wrap">
                      <label htmlFor="upload">
                        <AiOutlinePlusCircle
                          size={30}
                          className="mt-3"
                          color="#555"
                        />
                      </label>
                      {images &&
                        images.map((i) => (
                          <img
                            src={URL.createObjectURL(i)}
                            key={i}
                            alt=""
                            className="h-[120px] w-[120px] object-cover m-2"
                          />
                        ))}
                    </div>
                    <br />
                    <div>
                      <input
                        type="submit"
                        value="Thêm"
                        className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
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
                  Cập nhật sản phẩm
                </h5>
                {/* Update product form */}

                <form onSubmit={handleSubmit}>
                  <br />
                  <div>
                    <label className="pb-2">
                      Tên sản phẩm <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nhập tên sản phẩm của bạn..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Mô tả <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      cols="30"
                      required
                      rows="8"
                      type="text"
                      name="description"
                      value={description}
                      className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Nhập mô tả sản phẩm của bạn..."
                    ></textarea>
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Loại sản phẩm <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full mt-2 border h-[35px] rounded-[5px]"
                      value={categories}
                      onChange={(e) => setCategories(e.target.value)}
                    >
                      <option value="Chọn loại sản phẩm">{categories}</option>
                      {category &&
                        category.map((i) => (
                          <option value={i.name} key={i.name}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Thẻ</label>
                    <input
                      type="text"
                      name="tags"
                      value={tags}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="Nhập thẻ sản phẩm của bạn..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Giá gốc</label>
                    <input
                      type="number"
                      name="price"
                      value={originalPrice}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      placeholder="Nhập giá gốc của sản phẩm..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Giá (Có chiết khấu){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={discountPrice}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setDiscountPrice(e.target.value)}
                      placeholder="Nhập giá sản phẩm của bạn với mức giảm giá..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Số lượng <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={stock}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setStock(e.target.value)}
                      placeholder="Nhập số lượng sản phẩm..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Tải ảnh lên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name=""
                      id="upload"
                      className="hidden"
                      multiple
                      onChange={handleImageChange}
                    />
                    <div className="w-full flex items-center flex-wrap">
                      <label htmlFor="upload">
                        <AiOutlinePlusCircle
                          size={30}
                          className="mt-3"
                          color="#555"
                        />
                      </label>
                      {images &&
                        images.map((i) => (
                          <img
                            src={URL.createObjectURL(i)}
                            key={i}
                            alt=""
                            className="h-[120px] w-[120px] object-cover m-2"
                          />
                        ))}
                    </div>
                    <br />
                    <div>
                      <input
                        type="submit"
                        value="Cập nhật"
                        className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllProducts;
