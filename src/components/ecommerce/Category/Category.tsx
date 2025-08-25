import type { TCategory } from "@customTypes/category";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
const { category, categoryImg, categoryTitle } = styles;

const Category = ({ id, name, image }: TCategory) => {
  return (
    <div className={category}>
      <Link to={`/categories/products/:${id}`}>
        <div className={categoryImg}>
          <img src={image} alt={name} />
        </div>
        <h4 className={categoryTitle}>{name}</h4>
      </Link>
    </div>
  );
};

export default Category;