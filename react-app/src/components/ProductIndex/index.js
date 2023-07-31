import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductCategoriesThunk } from "../../store/categories";
import { getAllProductsThunk } from "../../store/products";
import { getAllReviewsThunk } from "../../store/reviews";
import { getAllPhotosThunk } from "../../store/photos";
import { Link } from 'react-router-dom';
import ProductIndexItem  from './ProductIndexItem'


export default function ProductIndex() {
  const dispatch = useDispatch();
  const productsData = useSelector((store) => store.products);
  const products = Object.values(productsData);
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(async () => {
    // MEGATHUNKADONK
    if (!Object.values(productsData).length){
      await dispatch(getAllProductCategoriesThunk());
      await dispatch(getAllProductsThunk());
      await dispatch(getAllReviewsThunk());
      await dispatch(getAllPhotosThunk()).then(()=> {
        setIsLoaded(true)
      });
      console.log("STATE RELOADED")
    }
  }, [dispatch]);

  console.log("RERENDER")

  if (!isLoaded) return <></>
  
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
