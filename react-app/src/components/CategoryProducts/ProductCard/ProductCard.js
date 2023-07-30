import { Link } from "react-router-dom";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  return (
    <Link id="product_card_container" to={`/product/${product.id}`}>
      <div id="product_card_image_container">
        <img
          alt="product"
          id="product_image"
          src={product.photo_url}
          title={product.name}
        />
      </div>
      <div id="product_name">
        <h3>{product.name}</h3>
      </div>
    </Link>
  );
}
