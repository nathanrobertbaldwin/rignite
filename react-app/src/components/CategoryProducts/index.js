import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllProductsThunk } from "../../store/products";
import { getAllPhotosThunk } from "../../store/photos";
import ProductCard from "./ProductCard/ProductCard";

export default function CategoryProducts({ category }) {
  const dispatch = useDispatch();
  const { id } = useParams();
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

  const categoryProducts = products.filter(
    (product) => product.category_id == id
  );

  return (
    <div id="spots_index">
      {categoryProducts.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
}
