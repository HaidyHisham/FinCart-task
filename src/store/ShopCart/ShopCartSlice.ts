// store/Cart/cartSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { TProduct } from "@customTypes/product";
import { actAddToCart, actRemoveFromCart, actClearCart } from "./action/actionShopCartSlice";

interface CartState {
  items: TProduct[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {}, // actions are imported from actionCart
  extraReducers: (builder) => {
    builder.addCase(actAddToCart, (state, action) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    });
    builder.addCase(actRemoveFromCart, (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    });
    builder.addCase(actClearCart, (state) => {
      state.items = [];
    });
  },
});

export default cartSlice.reducer;
