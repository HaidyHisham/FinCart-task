import { configureStore } from "@reduxjs/toolkit";
import categories from "./Categories/categoriesSlice";
import products from "./Products/ProductsSlice";
import cart from "./ShopCart/ShopCartSlice";
import search from "./search/searchSlice";

export const store = configureStore({
  reducer: { categories, products, cart, search },
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;