import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductsThunk } from "../../store/products";
import { getAllPhotosThunk } from "../../store/photos";
import { Link } from 'react-router-dom';
import ProductIndexItem from './ProductIndexItem'
import './ProductIndex.css'


export default function ProductIndex() {
  const dispatch = useDispatch();
  const productsData = useSelector((store) => store.products);
  const products = Object.values(productsData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllPhotosThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

  if (!isLoaded) return <></>;


  return (
    <div id='all-product-container'>
        {products.map((product) => (
          <Link to ={`/products/${product.id}`} title={product.product_name}>
            <ProductIndexItem product={product} key={product.id}/>
          </Link>
        ))}
    </div>
  )
}
