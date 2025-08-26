import { useEffect, useState, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProducts } from "@store/Products/ProductsSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { Alert, Spinner } from "react-bootstrap";
import { actAddToCart } from "@store/ShopCart/action/actionShopCartSlice";
import { useDebounce } from "@components/common/useDebounce";
import ProductsGrid from "@components/common/ProductGrid";
import type { TProduct } from "@customTypes/product";

const LIMIT = 10;

const Products = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector((s) => s.products) as {
    loading: string;
    error: string | null;
    records: TProduct[];
  };

  const search = useAppSelector((state) => state.search.query);
  const debouncedSearch = useDebounce(search, 400);

  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Initial fetch
  useEffect(() => {
    dispatch(actGetProducts({ offset: 0, limit: LIMIT }));
  }, [dispatch]);

  const handleAddToCart = useCallback(
    (record: TProduct) => {
      dispatch(actAddToCart(record));
    },
    [dispatch]
  );

  const fetchMoreData = async () => {
    const newOffset = offset + LIMIT;
    setOffset(newOffset);
    const resultAction = await dispatch(
      actGetProducts({ offset: newOffset, limit: LIMIT })
    );
    if (
      actGetProducts.fulfilled.match(resultAction) &&
      resultAction.payload.length < LIMIT
    ) {
      setHasMore(false);
    }
  };

  const filteredRecords = useMemo(() => {
    if (debouncedSearch.length >= 3) {
      return records.filter((r) =>
        r.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }
    return records;
  }, [records, debouncedSearch]);

  const isInitialLoading = loading === "pending" && records.length === 0;

  if (isInitialLoading) {
    return (
      <div className="text-center py-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4 text-danger">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={filteredRecords.length}
      next={fetchMoreData}
      hasMore={hasMore && debouncedSearch.length < 3}
      loader={<h4 className="text-center py-4">Loading more products...</h4>}
      endMessage={
        <p className="text-center py-4">
          <b>You have seen all products</b>
        </p>
      }
      style={{ overflow: "hidden" }}
    >
      <ProductsGrid records={filteredRecords} onAdd={handleAddToCart} />
    </InfiniteScroll>
  );
};

export default Products;
