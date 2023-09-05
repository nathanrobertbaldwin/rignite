import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getAllProductCategoriesThunk } from "../../store/categories";
import { getAllProductsThunk } from "../../store/products";
import { getAllOrdersThunk } from "../../store/orders";
import { getUserReviewsThunk } from "../../store/reviews";
import EditProductModal from "../EditProductModal";
import SeeCartModal from "../CartModal";
import OpenModalButton from "../OpenModalButton";
import Overview from "./Overview";
import Detail from "./Details";
import Review from "./Reviews";
import "./ProductDetails.css";
import LoginFormModal from "../LoginFormModal";

const _ = require("lodash");

export default function ProductDetails() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const categoriesData = useSelector((store) => store.categories);
  const productsData = useSelector((store) => store.products);
  
  const [view, setView] = useState("overview");
  const [activeIndex, setActiveIndex] = useState(0);
  
  let { id } = useParams();
  id = parseInt(id);
  const product = productsData[id];

  useEffect(() => {
    async function fetchData() {
      if (_.isEmpty(categoriesData))
        await dispatch(getAllProductCategoriesThunk());
      if (_.isEmpty(productsData)) await dispatch(getAllProductsThunk());
      if (!_.isEmpty(user)) {
        await dispatch(getAllOrdersThunk());
        await dispatch(getUserReviewsThunk());
      }
    }
    fetchData();
  }, []);

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
      <h3 onClick={() => history.goBack()} id="breadcrumb">
        {"< Go Back"}
      </h3>
      <div id="product_details_main_content_container">
        <div className="carousel">
          <button
            onClick={() => handleNextImg(-1)}
            className="carousel-button prev"
          >
            &#8592;
          </button>
          <button
            onClick={() => handleNextImg(1)}
            className="carousel-button next"
          >
            &#8594;
          </button>
          <ul>
            {photos.map((image, index) => (
              <li
                className="slide"
                key={image.id}
                style={{ opacity: index === activeIndex ? 1 : 0 }}
              >
                <img alt={image.id} src={image.url} />
              </li>
            ))}
          </ul>
        </div>
        <div id="product_details_product_main_info">
          <h3>{`${product.product_name}`}</h3>
          <h4>{`$${product.price}`}</h4>
          <div id="product_details_product_description">
            <p>{product.description}</p>
          </div>
          <OpenModalButton
            buttonText="Add to cart"
            modalComponent={
              user ? (
                <SeeCartModal addProduct={product.id} />
              ) : (
                <LoginFormModal />
              )
            }
          />
          {user?.is_admin && (
            <div id="manage_product_button_container">
              <li className="nav_links">
                <OpenModalButton
                  className="modal_button"
                  buttonText="Manage Product"
                  modalComponent={<EditProductModal product={product} />}
                />
              </li>
            </div>
          )}
        </div>
      </div>
      <hr className="hrtest" />
      <div id="switch-view-container">
        <button onClick={() => handleView("overview")}>Overview</button>
        <button onClick={() => handleView("details")}>Details</button>
        <button onClick={() => handleView("reviews")}>Reviews</button>
      </div>
      <hr className="hrtest2" />
      {view === "overview" && <Overview product={product} />}
      {view === "details" && <Detail product={product} />}
      {view === "reviews" && <Review product={product} user={user} />}
    </div>
  );
}
