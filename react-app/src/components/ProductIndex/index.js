import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductCategoriesThunk } from "../../store/categories";
import { getAllProductsThunk } from "../../store/products";
import { getAllOrdersThunk } from "../../store/orders";
import { getUserReviewsThunk } from "../../store/reviews";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";

export default function ProductIndex() {
  const dispatch = useDispatch();
  const productsData = useSelector((store) => store.products);
  const products = Object.values(productsData);

  useEffect(() => {
    // MEGATHUNKADONK
    if (!Object.values(productsData).length) {
      async function fetchData() {
        await dispatch(getAllProductCategoriesThunk());
        await dispatch(getAllProductsThunk());
        await dispatch(getAllOrdersThunk());
        await dispatch(getUserReviewsThunk());
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
