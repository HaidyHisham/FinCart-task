
import { createSlice } from "@reduxjs/toolkit";
import type { TProduct } from "@customTypes/product";
import {
  actAddToCart,
  actRemoveFromCart,
  actClearCart,
} from "./action/actionShopCartSlice";

interface CartState {
  items: TProduct[];
}


const savedCart = localStorage.getItem("cart");
const initialState: CartState = {
  items: savedCart ? JSON.parse(savedCart) : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder.addCase(actAddToCart, (state, action) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    });

    builder.addCase(actRemoveFromCart, (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
     
      localStorage.setItem("cart", JSON.stringify(state.items));
    });

    builder.addCase(actClearCart, (state) => {
      state.items = [];
     
      localStorage.setItem("cart", JSON.stringify(state.items));
    });
  },
});

export default cartSlice.reducer;
