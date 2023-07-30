import { Link } from "react-router-dom";
import "./CategoryCard.css";

export default function CategoryCard({ category }) {
  return (
    <Link id="category_card_container" to={`/category/${category.name}`}>
      <div id="category_card_image_container">
        <img
          alt="category"
          id="category_image"
          src={category.photo_url}
          title={category.name}
        />
      </div>
      <div id="category_name">
        <h3>{category.name}</h3>
      </div>
    </Link>
  );
}
