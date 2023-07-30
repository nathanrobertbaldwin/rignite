import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductsThunk } from "../../store/products";
import "./ProductIndex.css";

export default function ProductIndex() {
  const dispatch = useDispatch();
  const productsData = useSelector((store) => store.products);
  const products = Object.values(productsData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getAllProductsThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

  if (!isLoaded) return <></>;


  return (
    <div id='all-product-container'>
        {products.map((product) => (
            <div>
                <img className='all-product-image' src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/640px-Golde33443.jpg" alt=""/>
                <div>
                    <p>{product.product_name}</p>
                    <p>$ {product.price}</p>
                </div>
            </div>
        ))}
    </div>
  )
}
