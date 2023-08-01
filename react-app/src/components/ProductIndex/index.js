import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductCategoriesThunk } from "../../store/categories";
import { getAllProductsThunk } from "../../store/products";
import { getAllReviewsThunk } from "../../store/reviews";
import { getAllPhotosThunk } from "../../store/photos";
import { getAllOrdersThunk } from "../../store/orders";
import { Link } from 'react-router-dom';
import ProductIndexItem  from './ProductIndexItem'
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

export default function ProductIndex() {
  const dispatch = useDispatch();
  const productsData = useSelector((store) => store.products);
  const products = Object.values(productsData);

  useEffect(() => {
    // MEGATHUNKADONK
    if (!Object.values(productsData).length){
      await dispatch(getAllProductCategoriesThunk());
      await dispatch(getAllProductsThunk());
      await dispatch(getAllReviewsThunk());
      await dispatch(getAllPhotosThunk());
      await dispatch(getAllOrdersThunk());
      console.log("STATE RELOADED")
    }
  }, [dispatch]);

  if (!isLoaded) return <></>

    if (!Object.values(productsData).length) {
      async function fetchData() {
        await dispatch(getAllProductCategoriesThunk());
        await dispatch(getAllProductsThunk());
        await dispatch(getAllReviewsThunk());
        await dispatch(getAllPhotosThunk());
      }
      fetchData();
    }
  }, [dispatch]);

  return (
    <div id="all-product-container">
      {products?.map((product) => (
        <Link to={`/products/${product.id}`} title={product.product_name}>
          <ProductCard product={product} key={product.id} />
        </Link>
      ))}
    </div>
  );
}
