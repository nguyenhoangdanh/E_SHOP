import axios from "axios";
import { server } from "../../server";

// get all sellers --- admin
export const getAllSellers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllSellersRequest",
    });

    const { data } = await axios.get(`${server}/shop/admin-all-sellers`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllSellersSuccess",
      payload: data.sellers,
    });
  } catch (error) {
    dispatch({
      type: "getAllSellerFailed",
    //   payload: error.response.data.message,
    });
  }
};


export const updateSellerAddress =
  (name,phoneNumber,description,province, district,ward, address) => async (dispatch) => {
    try {
      dispatch({
        type: "UpdateSellerAddressRequest",
      });
      const { data } = await axios.put(
        `${server}/shop/update-seller-info`,
        {
          name, 
          phoneNumber,
          description, 
          province,
          district,
          ward,
          address,
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        }
      );
      dispatch({
        type: "UpdateSellerAddressSuccess",
        payload: {
          successMessage: "Seller address updated successfully!",
          seller: data.seller,
        },
      });
    } catch (error) {
      dispatch({
        type: "UpdateSellerAddressFailed",
        payload: error.response.data.message,
      });
    }
  };
