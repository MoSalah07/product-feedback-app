import { configureStore } from "@reduxjs/toolkit";
import sliceProduct from './sliceProduct';

const store = configureStore({
    reducer: {
      product: sliceProduct,
  },
});



export default store;
