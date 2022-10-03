import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import React, { useContext, useState } from "react";
import CartContex from "../../store/cart-contex";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const cartCtx = useContext(CartContex);
  const [formCancel, setFormCancel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const totAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const addCartItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const removeCartItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const onOrderItemsHandler = async (userData) => {
    setIsLoading(true);
    await fetch(
      "https://food-freakks-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsLoading(false);
    setIsSubmitted(true);
    cartCtx.onClear();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={addCartItemHandler.bind(null, item)}
          onRemove={removeCartItemHandler.bind(null, item.id)}
          foodID = {item.id.substr(1)}
        />
      ))}
    </ul>
  );
  const onOrderHandler = () => {
    setFormCancel(true);
  };

  const cartButtons = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={onOrderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totAmount}</span>
      </div>
      {formCancel && (
        <Checkout onCancel={props.onCloseCart} onOrder={onOrderItemsHandler} />
      )}
      {!formCancel && cartButtons}
    </React.Fragment>
  );

  const LoadingContent = <p>Submitting your order...</p>;
  const successOrderContent = (
    <React.Fragment>
      <p>Order Placed Successfully</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onCloseCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {!isLoading && !isSubmitted && cartModalContent}
      {isLoading && LoadingContent}
      {!isLoading && isSubmitted && successOrderContent}
    </Modal>
  );
};

export default Cart;
