import axios from "axios";
import { server } from "../../server";

//create couponCode
export const createcouponCode = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "couponCodeCreateRequest",
    });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${server}/coupon/create-coupon-code`,
      newForm,
      config
    );
    dispatch({
      type: "couponCodeCreateSuccess",
      payload: data.couponCodes,
    });
  } catch (error) {
    dispatch({
      type: "couponCodeCreateFail",
      payload: error.response.data.message,
    });
  }
};

//get All couponCode of shop
export const getAllCouponCodesShop = (id) => async(dispatch) => {
  try {
    dispatch({
      type: "getAllCouponCodesShopRequest"
    });

    const {data} = await axios.get(`${server}/coupon/get-coupon/${id}`,{withCredentials: true});

    dispatch({
      type: "getAllCouponCodesShopSuccess",
      payload: data.couponCodes,
    })
  } catch (error) {
    dispatch({
      type: "getAllCouponCodesShopFail",
      payload: error.response.data.message,
    });
  }
}

// //delete couponCode of shop
export const deletecouponCode = (id) => async(dispatch) => {
  try {
    dispatch({
      type: "deletecouponCodeRequest"
    });

    const {data} = await axios.delete(`${server}/coupon/delete-shop-couponcode/${id}`,
    {withCredentials: true
    });

    dispatch({
      type: "deletecouponCodeSuccess",
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: "deletecouponCodeFail",
      payload: error.response.data.message,
    });
  }
}
