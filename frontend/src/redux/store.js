import  {configureStore} from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { sellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";
import { eventReducer } from "./reducers/event";
import { cartReducer } from "./reducers/cart";
import { wishlistReducer } from "./reducers/wishlist";
import { orderReducer } from "./reducers/order";
import { categoryReducer } from "./reducers/category";
import { couponCodeReducer } from "./reducers/coupon"
const Store = configureStore({
    reducer: {
        user: userReducer,
        seller: sellerReducer,
        products: productReducer,
        events: eventReducer,
        cart: cartReducer,
        couponCodes: couponCodeReducer,
        wishlist: wishlistReducer,
        order: orderReducer,
        category: categoryReducer,
    }
});

export default Store;