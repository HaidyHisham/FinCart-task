import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actClearCart,
  actRemoveFromCart,
} from "@store/ShopCart/action/actionShopCartSlice";
import Button from "react-bootstrap/Button";
import Modal, { type ModalProps } from "react-bootstrap/Modal";

function CartShopeModal(props: ModalProps) {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  // 👇 Calculate total price
  const total = items.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Your Cart
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {items.map((item) => (
              <div className="card mb-3" key={item.id}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={item.images?.[0]}
                      className="card-img"
                      alt={item.title}
                      style={{ objectFit: "contain", height: "180px" }}
                    />
                  </div>
                  <div className="col-md-8 d-flex flex-column justify-content-between">
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">
                        <strong>${item.price}</strong>
                      </p>
                    </div>
                    <div className="p-3">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(actRemoveFromCart(item.id));
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* ✅ Summary Section */}
            <div className="border-top pt-3 mt-3">
              <h5 className="d-flex justify-content-between">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </h5>
            </div>

            <div className="mt-3 d-flex justify-content-between">
              <Button
                variant="outline-danger"
                onClick={() => dispatch(actClearCart())}
              >
                Clear All
              </Button>
              <Button variant="success">Checkout</Button>
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CartShopeModal;
