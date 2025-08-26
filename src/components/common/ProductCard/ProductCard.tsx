import { Carousel, Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import styles from "@styles/products.module.css";
import type { TProduct } from "@customTypes/product";

const { card, cardTitle, cardText, priceTag } = styles;

type ProductCardProps = {
  record: TProduct;
  onAdd: (record: TProduct) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ record, onAdd }) => {
  return (
    <div className="col">
      <div className={`card ${card} h-100`}>
        <Carousel interval={null}>
          {record.images?.map((img, i) => (
            <Carousel.Item key={i}>
              <img
                src={img}
                className="d-block w-100"
                alt={`${record.title}-${i}`}
                style={{ height: "192px", objectFit: "cover" }}
                onError={(e) =>
                  ((e.currentTarget as HTMLImageElement).src = "/placeholder.png")
                }
              />
            </Carousel.Item>
          ))}
        </Carousel>

        <div className="card-body d-flex flex-column">
          <h5 className={`card-title ${cardTitle}`}>{record.title}</h5>
          <p className={`card-text flex-grow-1 ${cardText}`}>
            {record.description.length > 120
              ? record.description.slice(0, 120) + "…"
              : record.description}
          </p>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className={priceTag}>${record.price}</span>
            <Button
              variant="primary"
              size="sm"
              className="shadow-sm px-3 py-2 rounded"
              onClick={() => onAdd(record)}
            >
              <FaShoppingCart /> Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
