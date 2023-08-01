import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const photosData = useSelector((store) => store.photos);
  const photos = Object.values(photosData);
  const productPhotos = photos.filter((photo) => {
    return photo.product_id === product.id;
  });

  return (
    <>
    <Link id="product_card_container" to={`/products/${product.id}`}>
      <div id="product_card_image_container">
        <img
          alt="product"
          id="product_image"
          src={productPhotos[0].url}
          title={product.product_name}
        />
      </div>
      <div id="product_name">
        <h3>{product.product_name}</h3>
      </div>
      </Link>
    </>
  );
}
