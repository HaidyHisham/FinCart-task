import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProducts } from "@store/Products/ProductsSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "react-bootstrap";
import { actAddToCart } from "@store/ShopCart/action/actionShopCartSlice";
import styles from "@styles/products.module.css";

const { card, cardTitle, cardText, priceTag } = styles;

const LIMIT = 10;

const Products = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector((state) => state.products);

  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Initial fetch
  useEffect(() => {
    dispatch(actGetProducts({ offset: 0, limit: LIMIT }));
  }, [dispatch]);

  // Load more
  const fetchMoreData = async () => {
    const newOffset = offset + LIMIT;
    setOffset(newOffset);

    const resultAction = await dispatch(
      actGetProducts({ offset: newOffset, limit: LIMIT })
    );

    // If API returned fewer than LIMIT, stop infinite scroll
    if (
      actGetProducts.fulfilled.match(resultAction) &&
      resultAction.payload.length < LIMIT
    ) {
      setHasMore(false);
    }
  };

  return (
    <>
      {loading === "pending" && records.length === 0 ? (
        <div className="text-center py-4">Loading...</div>
      ) : error ? (
        <div className="text-center py-4 text-danger">{error}</div>
      ) : (
        <InfiniteScroll
          dataLength={records.length} // tracks current items
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <h4 className="text-center py-4">Loading more products...</h4>
          }
          endMessage={
            <p className="text-center py-4">
              <b>You have seen all products </b>
            </p>
          }
        >
         <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
  {records.map((record) => (
    <div className="col" key={record.id}>
   <div className={`card h-100 ${card}`}>
        <img
          src={record.images[0]}
          className="card-img-top"
          alt={record.title}
          style={{ height: "220px", objectFit: "contain", padding: "12px" }}
        />
        <div className="card-body d-flex flex-column">
        <h5 className={`card-title ${cardTitle}`}>{record.title}</h5>
  <p className={`card-text flex-grow-1 ${cardText}`}>
            {record.description.length > 120
              ? record.description.slice(0, 120) + "…"
              : record.description}
          </p>
          <div className="d-flex justify-content-between align-items-center mt-2">
        <span className={priceTag}>${record.price}</span>
            <Button
              variant="primary"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                dispatch(actAddToCart(record));
              }}
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

        </InfiniteScroll>
      )}
    </>
  );
};

export default Products;
