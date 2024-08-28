const intialState = {
    products: [],
    loading: false,
    error: null,
};

// const productSlice = createSlice({
//     name: 'product',
//     initialState,
//     reducers: {
//         fetchProductsRequest: (state) => {
//             state.loading = true;
//         },
//         fetchProductsSuccess: (state, action) => {
//             state.loading = false;
//             state.products = action.payload;
//         },
//         fetchProductsFailure: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         },
//         addProduct: (state, action) => {
//             state.products.push(action.payload);
//         },
//         removeProduct: (state, action) => {
//             state.products = state.products.filter(
//                 (product) => product.id !== action.payload.id,
//             );
//         },
//     },
// });

// export const {
//     fetchProductsRequest,
//     fetchProductsSuccess,
//     fetchProductsFailure,
//     addProduct,
//     removeProduct,
// } = productSlice.actions;

// export default productSlice.reducer;
