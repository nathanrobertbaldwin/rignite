import { Link } from "react-router-dom";
import "./CategoryCard.css";

export default function CategoryCard({ category }) {
  return (
    <Link id="category_card_container" to={`/category/${category.id}`}>
      <img
        alt="category"
        className="category_image"
        src={category.photo_url}
        title={category.name}
      />
      <h3 id="category_name_h3">{category.name}</h3>
    </Link>
  );
}
