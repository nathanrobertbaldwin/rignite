import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductCategoriesThunk } from "../../store/categories";
import { getAllProductsThunk } from "../../store/products";
import { getAllReviewsThunk } from "../../store/reviews";
import { getAllPhotosThunk } from "../../store/photos";

import CategoryCard from "./CategoryCard";
import "./LandingPage.css";

export default function Landing() {
  const dispatch = useDispatch();
  const categoriesData = useSelector((store) => store.categories);
  const categories = Object.values(categoriesData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(async () => {
    // MEGATHUNKADONK
    if (!Object.values(categoriesData).length){
      await dispatch(getAllProductCategoriesThunk());
      await dispatch(getAllProductsThunk());
      await dispatch(getAllReviewsThunk());
      await dispatch(getAllPhotosThunk()).then(()=> {
        setIsLoaded(true)
      });
    }
  }, [dispatch]);

  if (!isLoaded) return <></>

  return (
    <div id="spots_index">
      {categories.map((category) => {
        return <CategoryCard key={category.id} category={category} />;
      })}
    </div>
  );
}
