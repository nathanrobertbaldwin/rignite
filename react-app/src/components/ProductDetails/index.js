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
  const reviews = product?.product_reviews;

  if (!product) return <></>;

  const primaryPhoto = photos[0].url;
  const otherPhotos = photos.slice(1);
  const reviewsCount = reviews.length;
  console.log('da product photos', product.product_photos)

  const avgStarRating = reviews.avgStarRating
    ? product.avgStarRating.toFixed(2)
    : "New!";

  const handleView = (view) => {
    setView(view);
  };

  return (
    <div id="product_details">
      {/* <h2>
        {product.address}, {product.state}, {product.country}
      </h2> */}
      <div id='product_details_main_content_container'>
        <div id="product_details_images_container">
          <div id="product_details_main_image">
            <img
              alt="product"
              id="product_details_preview_image"
              src={primaryPhoto}
            />
          </div>
          <div id="product_details_other_images_container">
            {otherPhotos.map((image) => {
              return (
                <img
                  alt=""
                  key={image.id}
                  className="product_details_other_images"
                  src={image.url}
                />
              );
            })}
          </div>
        </div>
        <div id='product_details_product_main_info'>
          <h3>{`${product.product_name}`}</h3>
          <h4>{`$${product.price} / night `}</h4>
          <p id="product_details_product_description">{product.description}</p>
          <OpenModalButton
          buttonText="Add to cart"
          modalComponent={<SeeCartModal addProduct={product.id}/>}
          />
        </div>
      </div>
      <div id="switch-view-container">
        <button onClick={() => handleView("overview")}>Overview</button>
        <button onClick={() => handleView("details")}>Details</button>
        <button onClick={() => handleView("reviews")}>Reviews</button>
      </div>
      {view === "overview" && <Overview product={product} />}
      {view === "details" && <Detail product={product} />}
      {view === "reviews" && <Review product={product} user={user} />}
    </div>
  );
}
