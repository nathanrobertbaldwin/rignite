import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllProductCategoriesThunk } from "../../store/categories";
import { getAllProductsThunk } from "../../store/products";
import { getAllOrdersThunk } from "../../store/orders";
import { getUserReviewsThunk } from "../../store/reviews";
import ProductCard from "../ProductCard";
import "./CategoryProducts.css";
const _ = require("lodash");

export default function CategoryProducts() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.session.user);
  const productsData = useSelector((store) => store.products);
  const products = Object.values(productsData);
  const categoriesData = useSelector((store) => store.categories);
  let { id } = useParams();
  id = parseInt(id);
  const category = categoriesData[id].name;

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

  const categoryProducts = products.filter(
    (product) => product.category_id === id
  );

  return (
    <div id="category_products_index_container">
      <div>
        <h2 id="shop-by-category">{`Shop ${category}`}</h2>
      </div>
      <div id="category_products">
        {categoryProducts?.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
}
