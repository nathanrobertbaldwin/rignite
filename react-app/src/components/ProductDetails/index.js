import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { getAllProductCategoriesThunk } from "../../store/categories";
import { getAllProductsThunk } from "../../store/products";
import { getAllOrdersThunk } from "../../store/orders";
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import PostReviewModal from "./PostReviewModal";
import "./ProductDetails.css";

export default function ProductDetails() {
  const dispatch = useDispatch();
  let { id } = useParams();
  id = parseInt(id);
  const user = useSelector((store) => store.user);
  const products = useSelector((store) => store.products);
  const product = products[id];

  useEffect(async () => {
    // MEGATHUNKADONK
    if (!Object.values(products).length) {
      async function fetchData() {
        await dispatch(getAllProductCategoriesThunk());
        await dispatch(getAllProductsThunk());
        await dispatch(getAllOrdersThunk());
      }
      fetchData();
    }
  }, [dispatch]);

  const photos = product?.product_photos;
  const reviews = product?.product_reviews;

  if (!photos) return <></>;

  const primaryPhoto = photos[0].url;
  const otherPhotos = photos.slice(1);
  const reviewsCount = reviews.length;

  const avgStarRating = reviews.avgStarRating
    ? product.avgStarRating.toFixed(2)
    : "New!";

  return (
    <div id="product_details">
      <h2>
        {product.address}, {product.state}, {product.country}
      </h2>
      <div id="product_details_images_container">
        <img
          alt="product"
          id="product_details_preview_image"
          src={primaryPhoto}
        />
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
      <div id="product_details_info_container">
        <h3>{`${product.name}`}</h3>
        <div id="product_details_purchase_button_container">
          <p id="product_details_product_description">{product.description}</p>
          <div id="product_details_purchase_card">
            <div id="product_details_purchase_card_header_container">
              <h4>{`$${product.price} / night `}</h4>
              <h5>
                {reviewsCount === 0 ? (
                  "New!"
                ) : (
                  <div id="product_details_purchase_card_review_info">
                    <FaStar id="review_stars" />
                    <p id="reviews_stars_container">
                      {`${avgStarRating} `}
                      {reviewsCount === 0
                        ? ""
                        : reviewsCount === 1
                        ? ` ${reviewsCount} Review`
                        : ` ${reviewsCount} Reviews`}
                    </p>
                  </div>
                )}
              </h5>
            </div>
            {user ? (
              <div id="product_details_purchase_button_container">
                <button className="button_small">Purchase This product!</button>
              </div>
            ) : (
              // <OpenModalButton
              //   className="orange_modal_button"
              //   buttonText="Login to Create purchase"
              //   modalComponent={<LoginFormModal />}
              // />
              <p>Login to create a purchase modal and button</p>
            )}
          </div>
        </div>
      </div>
      <div id="reviews_title_post_review_container">
        <div id="review_title">
          {reviewsCount === 0 ? (
            <h3>New!</h3>
          ) : (
            <h3>
              <FaStar id="review_stars" />
              {` ${avgStarRating} `}
              <span>&#183;</span>
              {reviewsCount === 1
                ? ` ${reviewsCount} Review`
                : ` ${reviewsCount} Reviews`}
            </h3>
          )}
        </div>
        {/* {postYourReview}
        {loginButton} */}
      </div>
      <div id="reviews_container">
        {reviewsCount === 0 ? (
          <div>
            <p></p>
            <h4>Be the first to review this product!</h4>
          </div>
        ) : (
          // <Reviews product={product} />
          <p>Reviews will go here</p>
        )}
      </div>
    </div>
  );
}
