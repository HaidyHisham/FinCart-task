import ProductCard from "@components/common/ProductCard/ProductCard";
import type { TProduct } from "@customTypes/product";

type ProductsGridProps = {
  records: TProduct[];
  onAdd: (record: TProduct) => void;
};

const ProductsGrid: React.FC<ProductsGridProps> = ({ records, onAdd }) => {
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
      {records.length > 0 ? (
        records.map((r) => (
          <ProductCard key={r.id} record={r} onAdd={onAdd} />
        ))
      ) : (
        <div className="col text-center py-4">No products found.</div>
      )}
    </div>
  );
};

export default ProductsGrid;
