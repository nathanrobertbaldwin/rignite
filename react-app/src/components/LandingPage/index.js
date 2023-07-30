import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductsThunk } from "../../store/products";
import "./LandingPage.css";

export default function Landing() {
  const dispatch = useDispatch();
  const productsData = useSelector((store) => store.products);
  const products = Object.values(productsData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getAllProductsThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

  if (!isLoaded) return <></>;

  // categories = {loop through products and grab unique categories};

  return (
    // <>{JSON.stringify(products)}</>
    <>
      <h1>Shop by Category</h1>
      <div id="catagories">
        <div id="KB">
          <img
            className="cateImg"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/640px-Golde33443.jpg"
            alt=""
          />
          <p>KeyBoards →</p>
        </div>
        <div id="Sp">
          <img
            className="cateImg"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/640px-Golde33443.jpg"
            alt=""
          />
          <p>Speakers →</p>
        </div>
        <div id="HP">
          <img
            className="cateImg"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/640px-Golde33443.jpg"
            alt=""
          />
          <p>Headphones →</p>
        </div>
        <div id="MP">
          <img
            className="cateImg"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/640px-Golde33443.jpg"
            alt=""
          />
          <p>Mousepads →</p>
        </div>
        <div id="Mi">
          <img
            className="cateImg"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/640px-Golde33443.jpg"
            alt=""
          />
          <p>Mice →</p>
        </div>
      </div>
    </>
  );
}
