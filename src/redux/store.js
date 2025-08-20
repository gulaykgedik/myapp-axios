import productReducer from "./slices/productSlice";   // süslü yok!

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export default store;
