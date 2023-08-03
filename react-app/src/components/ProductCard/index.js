import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import EditProductModal from "../EditProductModal";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const sessionUser = useSelector((store) => store.session.user);
  return (
    <>
    <Link to={`/products/${product.id}`} title={product.product_name}>
      <div>
          <div id="product_card_image_container">
            <img
              alt="product"
              id="product_image"
              src={product.product_photos[0].url}
              title={product.product_name}
            />
          </div>
          <div id="product_name">
            <h1>{product.product_name}</h1>
          </div>
          {sessionUser?.is_admin && (
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
    </Link>
    </>
  );
}
