import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProducts } from "@store/Products/ProductsSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "react-bootstrap";
import { actAddToCart } from "@store/ShopCart/action/actionShopCartSlice";

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
          <div className="row row-cols-1 row-cols-md-3">
            {records.length ? (
              records.map((record) => (
                <div className="col mb-4" key={record.id}>
                  <div className="card">
                    <img
                      src={record.images[0]}
                      className="card-img-top"
                      alt={record.title}
                      style={{ height: "300px", objectFit: "contain" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{record.title}</h5>
                      <p className="card-text">
                        {record.description.length > 120
                          ? record.description.slice(0, 120) + "…"
                          : record.description}
                      </p>
                      <Button
                        className="btn btn-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(actAddToCart(record));
                        }}
                      >
                        Add to cart ${record.price}
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col mb-4">
                <div className="text-center py-4">There are no records.</div>
              </div>
            )}
          </div>
        </InfiniteScroll>
      )}
    </>
  );
};

export default Products;
