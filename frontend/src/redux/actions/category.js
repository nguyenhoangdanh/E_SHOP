import axios from "axios";
import { server } from "../../server";

//create category
export const AdminCreateCategory = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "categoryCreateRequest",
    });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${server}/category/create-category`,
      newForm,
      config
    );
    dispatch({
      type: "categoryCreateSuccess",
      payload: data.category,
    });
  } catch (error) {
    dispatch({
      type: "categoryCreateFail",
      payload: error.response.data.message,
    });
  }
};


// get all category
export const getAllCategory = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllCategoryRequest",
    });

    const { data } = await axios.get(`${server}/category/get-all-category`);
    dispatch({
      type: "getAllCategorySuccess",
      payload: data.category,
    });
  } catch (error) {
    dispatch({
      type: "getAllCategoryFailed",
      payload: error.response.data.message,
    });
  }
};