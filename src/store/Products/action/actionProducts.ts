// actionProducts.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { TProduct } from "@customTypes/product";

type TResponse = TProduct[];

const actGetProducts = createAsyncThunk(
  "products/actGetProducts",
  async ({ offset, limit }: { offset: number; limit: number }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get<TResponse>(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("An unexpected error");
      }
    }
  }
);

export default actGetProducts;
