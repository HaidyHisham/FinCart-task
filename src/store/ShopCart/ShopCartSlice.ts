import { createSlice } from "@reduxjs/toolkit";
import type { TProduct } from "@customTypes/product";
import {
  actAddToCart,
  actRemoveFromCart,
  actClearCart,
} from "./action/actionShopCartSlice";

export type CartItem = TProduct & { quantity: number };

interface CartState {
  items: CartItem[];
}

const savedCart = localStorage.getItem("cart");
const initialState: CartState = {
  items: savedCart
    ? JSON.parse(savedCart).map((p: any) => ({
        ...p,
        quantity: Math.max(1, Number(p?.quantity) || 1), // ensure qty always ≥ 1
      }))
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
  
    builder.addCase(actAddToCart, (state, action) => {
      const incoming: TProduct = action.payload;
      const found = state.items.find((i) => i.id === incoming.id);
      if (found) {
        found.quantity += 1;
      } else {
        state.items.push({ ...incoming, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    });

    
    builder.addCase(actRemoveFromCart, (state, action) => {
      const id = action.payload as TProduct["id"];
      const idx = state.items.findIndex((i) => i.id === id);
      if (idx !== -1) {
        const item = state.items[idx];
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items.splice(idx, 1);
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    });

    builder.addCase(actClearCart, (state) => {
      state.items = [];
      localStorage.setItem("cart", JSON.stringify(state.items));
    });
  },
});

export default cartSlice.reducer;
