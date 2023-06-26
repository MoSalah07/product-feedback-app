import { createSlice } from '@reduxjs/toolkit';



const sliceProduct = createSlice( {
    name: 'product',

    initialState: [],
    reducers: {
        getFilterData: (state, action) => {
            // console.log(action.payload)
           return {...state, items: action.payload}
        }
    }
} );



export const { getFilterData } = sliceProduct.actions;

export default sliceProduct.reducer;