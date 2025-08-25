import { Row, Col } from "react-bootstrap";
import type { ReactNode } from "react";

type GridListProps<T extends { id: number }> = {
  records: T[];
  renderItem: (record: T) => ReactNode;
};

const GridList = <T extends { id: number }>({
  records,
  renderItem,
}: GridListProps<T>) => {
  console.log(records);

  return (
    <Row>
      {records.length ? (
        records.map((record) => (
          <Col xs={3} key={record.id} className="d-flex justify-content-center mb-5 mt-2">
            {renderItem(record)}
          </Col>
        ))
      ) : (
        <Col xs={12} className="text-center py-4">There are no records.</Col>
      )}
    </Row>
  );
};

export default GridList;
