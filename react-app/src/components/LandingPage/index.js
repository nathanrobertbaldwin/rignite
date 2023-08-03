import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductCategoriesThunk } from "../../store/categories";
import { getAllProductsThunk } from "../../store/products";
import { getAllOrdersThunk } from "../../store/orders";
import { getUserReviewsThunk } from "../../store/reviews";

import CategoryCard from "./CategoryCard";
import "./LandingPage.css";

export default function Landing() {
  const dispatch = useDispatch();
  const categoriesData = useSelector((store) => store.categories);
  const categories = Object.values(categoriesData);

  useEffect(() => {
    // MEGATHUNKADONK
    if (!Object.values(categoriesData).length){
      async function fetchData (){
      await dispatch(getAllProductCategoriesThunk());
      await dispatch(getAllProductsThunk());
      await dispatch(getAllOrdersThunk());
      await dispatch(getUserReviewsThunk());
      }
      fetchData()

    }
  }, [dispatch]);

  return (
    <div id="categories_index_container">
      <div>
        <h2 id='shop-by-category'>Shop by Category</h2>
      </div>
      <div id='categories_index'>
        {categories?.map((category) => {
          return <CategoryCard key={category.id} category={category} />;
        })}
      </div>
    </div>
  );
}
