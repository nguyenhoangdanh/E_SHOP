import React, { useState } from "react";
import {
  AiFillEye,
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCart from "./ProductDetailsCart/ProductDetailsCart.jsx";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { backend_url } from "../../server";
import { addToCart } from "../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import Ratings from "../Products/Ratings";
import CurrencyFormat from "react-currency-format";

import "./style.css";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

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
      toast.error("Sản phẩm đã có trong giỏ hàng!");
    } else {
      if (data.stock < 1) {
        toast.error("Rât tiếc, sản phẩm này đã hết hàng!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Thêm vào giỏ hàng thành công!");
      }
    }
  };
  

  return (
    <>
      <div className="product">
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-center">
          <Link
            to={`${
              isEvent === true
                ? `/product/${data._id}?isEvent=true`
                : `/product/${data._id}`
            }`}
          >
            <img
              src={`${backend_url}/${data.images && data.images[0]}`}
              alt=""
              style={{ height: 170, width: 185 }}
              // className="w-[185px] h-[170px] object-contain"
            />
          </Link>
        </div>
        <div className="flex items-center justify-between">
        <Link to={`/shop/preview/${data?.shop._id}`}>
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
          <span className="font-[400] text-[17px] text-[#68d284]">
            {data?.sold_out} đã bán
          </span>
        </div>
        <div className="flex items-center justify-between">
        <Link
          to={`${
            isEvent === true
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }`}
        >
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 24) + "..." : data.name}
          </h4>

          <div className="flex">
            <Ratings rating={data?.ratings} />
          </div>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.originalPrice === 0
                  ? data.originalPrice
                      .toFixed(0)
                      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
                  : data.discountPrice
                      .toFixed(0)
                      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                đ
              </h5>
              <h4 className={`${styles.price}`}>
                {/* <CurrencyFormat value={3412344} displayType={'text'} decimalSeparator="." prefix={'đ'} renderText={value => <div>{value}</div>} /> */}
                {data.originalPrice
                  ? data.originalPrice
                      .toFixed(0)
                      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") + "đ"
                  : null}
              </h4>
            </div>
          </div>
        </Link>
        <div className="product-button">
              <button title="Thêm vào giỏ hàng" onClick={() => addToCartHandler(data._id)}>
              <i class="fa-solid fa-cart-plus"></i>
              </button>
            </div>
        </div>
        <div className="flex items-center justify-end">
        <h5>{data.shop.addresses}</h5>
        </div>

        {/* site options */}
        <div className='product-like'>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Xóa khỏi yêu thích"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Thêm vào yêu thích"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Xem chi tiết"
          />

          {/* <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => addToCartHandler(data._id)}
            color="#444"
            title="Thêm vào giỏ hàng"
          /> */}
          {open ? <ProductDetailsCart setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
      </div>
    </>
  );
};

export default ProductCard;
