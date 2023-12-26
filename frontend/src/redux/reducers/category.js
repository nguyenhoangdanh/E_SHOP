import {createReducer} from "@reduxjs/toolkit"
const initialState = {
    isLoading: true,
}


//create category
export const categoryReducer = createReducer(initialState, {
    categoryCreateRequest: (state) => {
        state.isLoading = true;
    },
    categoryCreateSuccess: (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.category = action.payload;
    },
    categoryCreateFail: (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
    },
    

//     //get all categorys of shop
    getAllCategoryRequest: (state) => {
        state.isLoading = true;
    },
    getAllCategorySuccess: (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.category = action.payload;
    },
    getAllCategoryFail: (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
    },


//     // get all categorys
//   getAllcategorysRequest: (state) => {
//     state.isLoading = true;
//   },
//   getAllcategorysSuccess: (state, action) => {
//     state.isLoading = false;
//     state.allcategorys = action.payload;
//     // state.categorys = action.payload;
//   },
//   getAllcategorysFailed: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//   },

//     deletecategoryRequest: (state) => {
//         state.isLoading = true;
//     },

//     deletecategorySuccess: (state, action) => {
//         state.isLoading = false;
//         state.message = action.payload;
//     },
//     deletecategoryFail: (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//     },

    clearErrors: (state) => {
        state.error = null;
    }
})