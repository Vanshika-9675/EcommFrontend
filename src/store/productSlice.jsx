import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
});

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
    try {
        const response = await fetch('https://ecomm-2.onrender.com/api/v1/product');
        if (!response.ok) {
             throw new Error('Failed to fetch products');
        }
        const data = await response.json();
       
       
        return data;
    } catch (error) {
        throw new Error('Failed to fetch products');
    }
});

const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
        error: null
    },
    reducers: {
        setProducts(state, action) {
            state.data = action.payload;
            state.status = STATUSES.IDLE;
            state.error = null;
        },
        setStatus(state, action) {
            state.status = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    }
});

export const { setProducts, setStatus, setError } = productSlice.actions;
export default productSlice.reducer;
