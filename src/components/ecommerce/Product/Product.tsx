import type { TProduct } from "@customTypes/product";
import { Button, Badge } from "react-bootstrap";
import styles from "./styles.module.css";

const { product, productImg } = styles;

const egp = new Intl.NumberFormat("en-EG", {
  style: "currency",
  currency: "EGP",
});

const placeholder = "/placeholder.png"; // add a small placeholder in /public

const Product = ({ title, price, description, category, images }: TProduct) => {
  // pick first valid image or fall back to the category image, then to placeholder
  const imgSrc =
    (Array.isArray(images) && images.find(Boolean)) ||
    category?.image ||
    placeholder;

  return (
    <div className={product}>
      <div className={productImg}>
        <img
          src={imgSrc}
          alt={title}
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = placeholder;
          }}
        />
      </div>

      <h2 className="h6 mb-1">{title}</h2>

      {category?.name && (
        <div className="mb-2">
          <Badge bg="secondary">{category.name}</Badge>
        </div>
      )}

      <div className="fw-semibold mb-3">{egp.format(price)}</div>

      {/* optional short description */}
      <p className="text-muted small">
        {description.length > 120 ? description.slice(0, 120) + "…" : description}
      </p>

      <Button variant="info" style={{ color: "white" }}>
        Add to cart
      </Button>
    </div>
  );
};

export default Product;
