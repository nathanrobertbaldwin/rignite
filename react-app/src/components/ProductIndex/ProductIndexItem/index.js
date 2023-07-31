import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductsThunk } from "../../store/products";
import "./ProductIndex.css";

export default function ProductIndexItem() {


    return (
        <div>
             <img className='all-product-image' src="https://upload.wikimedia.org/wikipediacommons/thumb/6/6e/Golde33443.jpg/640px-Golde33443.jpg" alt=""/>
             <div>
                <p>{product.product_name}</p>
               <p>$ {product.price}</p>
            </div>
        </div>
    )
}