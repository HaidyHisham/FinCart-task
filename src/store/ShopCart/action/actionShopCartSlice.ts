
import { createAction } from "@reduxjs/toolkit";
import type { TProduct } from "@customTypes/product";


export const actAddToCart = createAction<TProduct>("cart/actAddToCart");
export const actRemoveFromCart = createAction<number>("cart/actRemoveFromCart"); 
export const actClearCart = createAction("cart/actClearCart");
