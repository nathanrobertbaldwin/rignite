import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllProductCategoriesThunk } from "../../store/categories";
import { getAllProductsThunk } from "../../store/products";
import { getAllOrdersThunk } from "../../store/orders";
import { getUserReviewsThunk } from "../../store/reviews";
import SeeCartModal from "../CartModal";
import OpenModalButton from "../OpenModalButton";
import Overview from "./Overview";
import Detail from "./Details";
import Review from "./Reviews";
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import PostReviewModal from "./PostReviewModal";
import "./ProductDetails.css";

export default function ProductDetails() {

  const [view, setView] = useState("overview")

  const [activeIndex, setActiveIndex] = useState(0);

  const dispatch = useDispatch();
  let { id } = useParams();
  id = parseInt(id);
  const user = useSelector((state) => state.session.user)
  const products = useSelector((store) => store.products);
  const product = products[id];

  useEffect(async () => {
    // MEGATHUNKADONK
    if (!Object.values(products).length) {
      async function fetchData() {
        await dispatch(getAllProductCategoriesThunk());
        await dispatch(getAllProductsThunk());
        await dispatch(getAllOrdersThunk());
        await dispatch(getUserReviewsThunk());
      }
      fetchData();
    }
  }, [dispatch]);

  const photos = product?.product_photos;

  if (!product) return <></>;


  const handleView = (view) => {
    setView(view);
  };

  const handleNextImg = (offset) => {

    let newIndex = activeIndex + offset;
    if (newIndex < 0) newIndex = photos.length - 1;
    if (newIndex >= photos.length) newIndex = 0;

    setActiveIndex(newIndex);
  };

  return (
    <div id="product_details">

      <div id='product_details_main_content_container'>

      <div className="carousel">
          <button onClick={() => handleNextImg(-1)} className="carousel-button prev">&#8592;</button>
          <button onClick={() => handleNextImg(1)} className="carousel-button next">&#8594;</button>
          <ul>
            {photos.map((image, index) => (
              <li className="slide" key={image.id} style={{ opacity: index === activeIndex ? 1 : 0 }}>
                <img
                  alt={image.id}
                  src={image.url}
                />
              </li>
            ))}
          </ul>
        </div>

        <div id='product_details_product_main_info'>
          <h3>{`${product.product_name}`}</h3>
          <h4>{`$${product.price}`}</h4>
          <p id="product_details_product_description">{product.description}</p>
          <OpenModalButton
          buttonText="Add to cart"
          modalComponent={<SeeCartModal addProduct={product.id}/>}
          />
        </div>

      </div>
      <hr className='hrtest'/>
        <div id="switch-view-container">
          <button onClick={() => handleView("overview")}>Overview</button>
          <button onClick={() => handleView("details")}>Details</button>
          <button onClick={() => handleView("reviews")}>Reviews</button>
        </div>
      <hr className='hrtest2'/>
      {view === "overview" && <Overview product={product} />}
      {view === "details" && <Detail product={product} />}
      {view === "reviews" && <Review product={product} user={user} />}
    </div>
  );
}
