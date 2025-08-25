import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProducts } from "@store/Products/ProductsSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "react-bootstrap";
import { actAddToCart } from "@store/ShopCart/action/actionShopCartSlice";
import { FaShoppingCart } from "react-icons/fa";
import styles from "@styles/products.module.css";
import type { TProduct } from "@customTypes/product"; 

const { card, cardTitle, cardText, priceTag } = styles;
const LIMIT = 10;


type ProductCardProps = {
  record: TProduct;                   
  onAdd: (record: TProduct) => void;    
};

const ProductCard: React.FC<ProductCardProps> = React.memo(({ record, onAdd }) => {
   console.log(" Rendering ProductCard:", record.title);
  const imgSrc = record.images?.[0] ?? ""; 
  return (
    <div className="col ">
      <div className={`card ${card} h-100`}>
<img
  src={imgSrc}
  className="card-img-top w-100 object-fit-cover img-hover-zoom"
  alt={record.title}
  style={{ height: "192px", objectFit: "cover" }} 
/>
        <div className="card-body d-flex flex-column">
          <h5 className={`card-title ${cardTitle}`}>{record.title}</h5>
          <p className={`card-text flex-grow-1 ${cardText}`}>
            {record.description.length > 120
              ? record.description.slice(0, 120) + "…"
              : record.description}
          </p>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className={priceTag}>${record.price}</span>
            <Button variant="primary" size="sm" className="shadow-sm px-3 py-2 rounded" onClick={() => onAdd(record)}>
              <FaShoppingCart /> Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

const imageStyle: React.CSSProperties = { height: "220px", objectFit: "contain", padding: "12px" };

const Products = () => {
  const dispatch = useAppDispatch();

 
  const { loading, error, records } = useAppSelector((s) => s.products) as {
    loading: string;
    error: string | null;
    records: TProduct[];
  };

  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    dispatch(actGetProducts({ offset: 0, limit: LIMIT }));
  }, [dispatch]);

  const handleAddToCart = useCallback((record: TProduct) => {
    dispatch(actAddToCart(record));    
  }, [dispatch]);

  const fetchMoreData = useCallback(async () => {
    const newOffset = offset + LIMIT;
    setOffset(newOffset);
    const resultAction = await dispatch(actGetProducts({ offset: newOffset, limit: LIMIT }));
    if (actGetProducts.fulfilled.match(resultAction) && resultAction.payload.length < LIMIT) {
      setHasMore(false);
    }
  }, [dispatch, offset]);

  const productCards = useMemo(
    () => records.map((record) => (
      <ProductCard key={record.id} record={record} onAdd={handleAddToCart} />
    )),
    [records, handleAddToCart]
  );

  const loaderEl = useMemo(() => <h4 className="text-center py-4">Loading more products...</h4>, []);
  const endMsgEl = useMemo(() => (
    <p className="text-center py-4"><b>You have seen all products</b></p>
  ), []);

  const isInitialLoading = loading === "pending" && records.length === 0;

  return isInitialLoading ? (
    <div className="text-center py-4">Loading...</div>
  ) : error ? (
    <div className="text-center py-4 text-danger">{error}</div>
  ) : (
    <InfiniteScroll dataLength={records.length} next={fetchMoreData} hasMore={hasMore}
      loader={loaderEl} endMessage={endMsgEl} style={{ overflow: "hidden" }} >
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        {productCards}
      </div>
    </InfiniteScroll>
  );
};

export default Products;
