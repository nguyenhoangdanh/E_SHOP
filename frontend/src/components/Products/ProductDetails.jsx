/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { getAllProductsShop } from "../../redux/actions/product";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions/cart";
import Ratings from "./Ratings";
import axios from "axios";
// import './styles.css'

const ProductDetails = ({ data }) => {
  const { seller } = useSelector((state) => state.seller);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist]);
  // console.log("iamges",`${backend_url}/${data && data?.images[select]}`)
  // console.log("Products", products)
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };
  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };
  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );
    

  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);
  

  const handleMessageSubmit = async() => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios.post(`${server}/conversation/create-new-conversation`, {
        groupTitle, 
        userId, 
        sellerId
      })
      .then((res)=>{
        navigate(`/conversation/${res.data.conversation._id}`);
      })
      .catch((error)=>{
        toast.error(error.response.data.message)
      })
    }else{
      toast.error("Please login to create a conversation")
    }
  };
 
  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%] `}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${backend_url}/${data && data?.images[select]}`}
                  alt=""
                  className="w-[80%]"
                />
                <div className="w-full flex">
                  {data &&
                    data.images.map((i, index) => (
                      <div
                        className={`${
                          select === 0 ? "border" : "null"
                        } cursor-pointer`}
                      >
                        <img
                          src={`${backend_url}/${i}`}
                          alt=""
                          className="h-[200px] overflow-hidden mr-3 mt-3"
                          onClick={() => setSelect(index)}
                        />
                      </div>
                    ))}
                </div>
              </div>
              <div className="w-full 800px:w-[50%] pt-3 leading-8 pb-8 whitespace-pre-line">
                <h1 className={`${styles.productTitle} mt-5`}>{data.name}</h1>
                <p className="mt-5">
                {data.description > 200 ? data.description.slice(0, 300) + "..." : data.description}
                  {/* {data.description} */}
                  </p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") + "đ" : null}
                  </h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div className="w-[180px] flex items-center justify-between">
                  <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-md px-[15px] py-[5px] shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      <i class="fa-solid fa-minus"></i>
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium rounded-sm px-[30px] py-[4px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-md px-[15px] py-[5px] shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                     <i class="fa-solid fa-plus"></i>
                    </button>
                  </div>
                  {click ? (
                    <AiFillHeart
                      size={22}
                      className="cursor-pointer "
                      onClick={() => removeFromWishlistHandler(data)}
                      color={click ? "red" : "#333"}
                      title="Xóa khỏi danh sách yêu thích"
                    />
                  ) : (
                    <AiOutlineHeart
                      size={22}
                      className="cursor-pointer"
                      onClick={() => addToWishlistHandler(data)}
                      color={click ? "red" : "#333"}
                      title="Thêm vào yêu thích"
                    />
                  )}
                </div>

               {/* <div className="add-to-card"> */}
               <div
                  className={`${styles.button} w-[200px] mt-6 rounded-[4px] h-11 flex items-center`}
                  onClick={() => addToCartHandler(data._id)}
                >
                  <span className="text-[#fff] flex items-center ">
                  Thêm vào giỏ hàng <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
               {/* </div> */}
                <div className="flex items-center pt-8 cursor-pointer">
                  <Link to={`/shop/preview/${data?.shop._id}`}>
                    <img
                      // src={`${backend_url}/${seller.avatar}`}
                      src={`${backend_url}/${data?.shop.avatar}`}
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                  </Link>
                  <div className="pr-8">
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                      <h3 className={`${styles.shop_name}pb-1 pt-1`}>
                        {data?.shop.name}
                      </h3>
                    </Link>
                    <h5 className="pb-3 text-[15px]">
                      ({averageRating}/5) Sao
                    </h5>
                  </div>
                  <div
                    className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center">
                      Liên hệ shop <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ProductDetailsInfo
            data={data}
            products={products}
            totalReviewsLength={totalReviewsLength}
            averageRating={averageRating}
          />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRating,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Chi tiết sản phẩm
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Xem đánh giá
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Thông tin shop
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
      </div>

      <div>
        {active === 1 ? (
          <>
            <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
              {data.description}
            </p>
          </>
        ) : null}

        {active === 2 ? (
          <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
            {data &&
              data.reviews.map((item, index) => (
                <div className="w-full flex my-2">
                  <img
                    src={`${backend_url}/${item.user.avatar}`}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  <div className="pl-2 ">
                    <div className="w-full flex items-center">
                      <h1 className="font-[500] mr-3">{item.user.name}</h1>
                      <Ratings rating={data?.ratings} />
                    </div>
                    <p>{item.comment}</p>
                  </div>
                </div>
              ))}
            <div className="w-full flex justify-center">
              {data && data.reviews.length === 0 && (
                <h5>Chưa có đánh giá nào cho sản phẩm này!</h5>
              )}
            </div>
          </div>
        ) : null}

        {active === 3 && (
          <div className="w-full block 800px:flex p-5">
            <div className="w-full 800px:w-[50%]">
              <Link to={`/shop/preview/${data.shop._id}`}>
                <div className="flex items-center">
                  <img
                    src={`${backend_url}/${data.shop.avatar}`}
                    className="w-[50px] h-[50px] rounded-full"
                    alt=""
                  />
                  <div className="pl-3">
                    <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                    <h5 className="pb-2 text-[15px]">
                      ({averageRating})/5 Sao
                    </h5>
                  </div>
                </div>
              </Link>
              <p className="pt-2">{data.shop.description}</p>
            </div>
            <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
              <div className="text-left">
                <h5 className="font-[600]">
                  Ngày tạo:{" "}
                  <span className="font-[500]">
                    {data.shop?.createdAt?.slice(0, 10)}
                  </span>
                </h5>
                <h5 className="font-[600] pt-3">
                  Tống sản phẩm:{" "}
                  <span className="font-[500]">
                    {products && products.length}
                  </span>
                </h5>
                <h5 className="font-[600] pt-3">
                  Tống đánh giá:{" "}
                  <span className="font-[500]">{totalReviewsLength}</span>
                </h5>
                <Link to="/">
                  <div
                    className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                  >
                    <h4 className="text-white">Xem shop</h4>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
