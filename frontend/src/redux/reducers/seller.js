//Load Seller
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSeller: true,
};

export const sellerReducer = createReducer(initialState, {
  LoadSellerRequest: (state) => {
    state.isLoading = true;
  },
  LoadSellerSuccess: (state, action) => {
    state.isSeller = true;
    state.isLoading = false;
    state.seller = action.payload;
  },
  LoadSellerFail: (state, action) => {
    state.isSeller = false;
    state.isLoading = false;
    state.error = action.payload;
  },

  //Update user Address
  UpdateSellerAddressRequest: (state, action) => {
    state.addressLoading = true;
  },
  UpdateSellerAddressSuccess: (state, action) => {
    state.addressLoading = false;
    state.successMessage = action.payload.successMessage;
    state.seller = action.payload.seller;
  },
  UpdateSellerAddressFailed: (state, action) => {
    state.addressLoading = false;
    state.error = action.payload;
  },

  // get all sellers ---admin
  getAllSellersRequest: (state) => {
    state.isLoading = true;
  },
  getAllSellersSuccess: (state, action) => {
    state.isLoading = false;
    state.sellers = action.payload;
  },
  getAllSellerFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
