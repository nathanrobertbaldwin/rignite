import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductCategoriesThunk } from "../../store/categories";
import CategoryCard from "./CategoryCard";
import "./LandingPage.css";

export default function Landing() {
  const dispatch = useDispatch();
  const categoriesData = useSelector((store) => store.categories);
  const categories = Object.values(categoriesData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getAllProductCategoriesThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

  if (!isLoaded) return <></>;

  return (
    <div id="spots_index">
      {categories.map((category) => {
        return <CategoryCard key={category.id} category={category} />;
      })}
    </div>
  );
}
