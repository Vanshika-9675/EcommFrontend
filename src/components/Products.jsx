import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import { fetchProducts, STATUSES } from '../store/productSlice';

function Products() {
    const { data: products, status } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleAdd = (product) => {
        dispatch(add(product));
    };

    if (status === STATUSES.LOADING) {
        return <h2>LOADING.....</h2>;
    }

    if (status === STATUSES.ERROR) {
        return <h2>Something went wrong...</h2>;
    }

    return (
        <div className="productsWrapper">
            {products.map((product) => (
                <div className="card" key={product._id}>
                    <img src={product.image} alt="" />
                    <h4>{product.title}</h4>
                    <h5>{product.price}</h5>
                    <button onClick={() => handleAdd(product)} className="btn">
                       Add to Cart
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Products;
