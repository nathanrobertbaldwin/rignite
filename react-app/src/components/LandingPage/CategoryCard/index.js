import { Link } from "react-router-dom";
import "./CategoryCard.css";

export default function CategoryCard({ category }) {
  return (
    <Link id="category_card_container" to={`/category/${category.id}`}>
        <img
          alt="category"
          id="category_image"
          src={category.photo_url}
          title={category.name}
        />
      <div id="category_name">
        <h1>{category.name}</h1>
      </div>
    </Link>
  );
}
