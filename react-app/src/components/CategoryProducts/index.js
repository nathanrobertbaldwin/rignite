import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllProductCategoriesThunk } from "../../store/categories";
import { getAllProductsThunk } from "../../store/products";
import { getAllOrdersThunk } from "../../store/orders";
import ProductCard from "../ProductCard";
import { getUserReviewsThunk } from "../../store/reviews";
import './CategoryProducts.css';

export default function CategoryProducts({ category }) {
  const dispatch = useDispatch();
  const productsData = useSelector((store) => store.products);
  const products = Object.values(productsData);
  let { id } = useParams();
  id = parseInt(id);

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

  const categoryProducts = products.filter(
    (product) => product.category_id === id
  );

  return (
    <div id="all-category-product-container">
      {categoryProducts?.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
}
