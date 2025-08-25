import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actClearCart, actRemoveFromCart } from "@store/ShopCart/action/actionShopCartSlice";
import Button from "react-bootstrap/Button";
import Modal, { type ModalProps } from "react-bootstrap/Modal";

function CartShopeModal(props: ModalProps) {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {items.map((item) => (
              <div className="card mb-3">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img
                      src={item.images?.[0]}
                      className="card-img"
                      alt={item.title}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">
                        <small className="text-muted">{item.price}</small>
                      </p>
                    </div>
                    <Button
                      variant="danger"
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
            ))}
          </>
              )}
              
              {  items.length > 0 &&
                  <Button
                      onClick={(e) => {
                          e.preventDefault();
                          dispatch(actClearCart());
                      }}
                  >
   
                      clear All
                  </Button>
              }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CartShopeModal;
