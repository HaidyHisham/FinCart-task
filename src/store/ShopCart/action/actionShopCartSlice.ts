// store/Cart/actionCart.ts
import { createAction } from "@reduxjs/toolkit";
import type { TProduct } from "@customTypes/product";

// Actions
export const actAddToCart = createAction<TProduct>("cart/actAddToCart");
export const actRemoveFromCart = createAction<number>("cart/actRemoveFromCart"); // by id
export const actClearCart = createAction("cart/actClearCart");
