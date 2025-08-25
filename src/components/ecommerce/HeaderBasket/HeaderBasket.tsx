import Logo from "@assets/svg/cart.svg?react";
import styles from "./styles.module.css";
import CartShopeModal from "@components/common/modal/modal";
import { useState } from "react";
import { useAppSelector } from "@store/hooks";
const { basketContainer, basketQuantity } = styles;
const HeaderBasket = () => {
  const [modalShow, setModalShow] = useState(false);
const { items } = useAppSelector((state) => state.cart);

  return (
    <>
      <div className={basketContainer} onClick={() => setModalShow(true)}>
        <Logo title="basket icon" />
        <div className={basketQuantity}> { items.length}</div>
      </div>
      <CartShopeModal show={modalShow} onHide={() => setModalShow(false)}  />
    </>
  );
};

export default HeaderBasket;
