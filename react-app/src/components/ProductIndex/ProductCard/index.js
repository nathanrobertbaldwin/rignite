import { useSelector } from "react-redux";
import OpenModalButton from "../../OpenModalButton";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const sessionUser = useSelector((store) => store.session.user);
  const photosData = useSelector((store) => store.photos);
  const photos = Object.values(photosData);
  const productPhotos = photos.filter((photo) => {
    return photo.product_id === product.id;
  });
  return (
    <div id="product_card_container">
      <img
        className="all-product-image"
        src={productPhotos[0].url}
        alt="product"
        title={product.product_name}
      />
      <div>
        <p>{product.product_name}</p>
        <p>$ {product.price}</p>
      </div>
      {sessionUser.is_admin && (
        <div id="manage_product_button_container">
          <li className="nav_links">
            <OpenModalButton
              className="modal_button"
              buttonText="Manage Spot"
              modalComponent={<ManageProductModal />}
            />
          </li>
        </div>
      )}
    </div>
  );
}
