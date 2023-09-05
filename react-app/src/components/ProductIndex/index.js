import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductCategoriesThunk } from "../../store/categories";
import { getAllProductsThunk } from "../../store/products";
import { getAllOrdersThunk } from "../../store/orders";
import { getUserReviewsThunk } from "../../store/reviews";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import './ProductIndex.css'
const _ = require("lodash");

export default function ProductIndex() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.session.user);
  const categoriesData = useSelector((store) => store.categories)
  const productsData = useSelector((store) => store.products);
  const products = Object.values(productsData);

  useEffect(() => {
    async function fetchData() {
      if (_.isEmpty(categoriesData))
        await dispatch(getAllProductCategoriesThunk());
      if (_.isEmpty(productsData)) await dispatch(getAllProductsThunk());
      if (!_.isEmpty(user)) {
        await dispatch(getAllOrdersThunk());
        await dispatch(getUserReviewsThunk());
      }
    }
    fetchData();
  }, []);

  return (
    <div id="all_products_container">
      <div>
        <h2 id='shop-by-category'>Shop All Products</h2>
      </div>
      <div id="all_products">
        {products?.map((product) => (
          <Link to={`/products/${product.id}`} title={product.product_name}>
            <ProductCard product={product} key={product.id} />
          </Link>
        ))}
      </div>
    </div>
  );
}
