
import {createReducer} from "@reduxjs/toolkit"
const initialState = {
    isLoading: true,
}

//create couponCodes
export const couponCodeReducer = createReducer(initialState, {
    couponCodeCreateRequest: (state) => {
        state.isLoading = true;
    },
    couponCodeCreateSuccess: (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.couponCodes = action.payload;
    },
    couponCodeCreateFail: (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
    },
    

    //get all couponCodes of shop
    getAllCouponCodesShopRequest: (state) => {
        state.isLoading = true;
    },
    getAllCouponCodesShopSuccess: (state, action) => {
        state.isLoading = false
        state.couponCodes = action.payload;
    },
    getAllCouponCodesShopFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },

    deletecouponCodeRequest: (state) => {
        state.isLoading = true;
    },

    deletecouponCodeSuccess: (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
    },
    deletecouponCodeFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },

    clearErrors: (state) => {
        state.error = null;
    }
})


