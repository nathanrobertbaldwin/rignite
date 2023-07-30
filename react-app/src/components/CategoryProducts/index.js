import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllProductsThunk } from "../../store/products";
import ProductCard from "./ProductCard/ProductCard";

export default function CategoryProducts() {
  const dispatch = useDispatch();
  const { category } = useParams();
  const productsData = useSelector((store) => store.products);
  const products = Object.values(productsData);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getAllProductsThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

  if (!isLoaded) return <></>;

  const categoryProducts = products.filter(
    (product) => product.category === category
  );

  return (
    <div id="spots_index">
      {categoryProducts.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
}
