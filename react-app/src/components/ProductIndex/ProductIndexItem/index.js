import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import './ProductIndexItem.css'

export default function ProductIndexItem({product}) {
    const photosData = useSelector((store) => store.photos)
    const photos = Object.values(photosData);
    const productPhoto = photos.filter((photo) => {
        return photo.product_id === product.id;
    })

    return (
        <Link className='product-index-link' to ={`/products/${product.id}`} title={product.product_name}>
            <div id='individual-product-container'>
                <img
                className='all-product-image'
                src={productPhoto[0].url}
                alt="product"
                title={product.product_name}
                />
                <div>
                    <p>{product.product_name}</p>
                    <p>$ {product.price}</p>
                </div>
            </div>
        </Link>
    )
}
