import IconCart from "../Cart/IconCart.js";
import classes from "./HeaderCartButton.module.css";
import { useContext, useState, useEffect } from "react";
import CartContex from "../../store/cart-contex.js";
const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setbtnHighlighted] = useState(false);
  const carCtx = useContext(CartContex);
  const { items } = carCtx;
  const numberCartItems = items.reduce((initial, current) => {
    return initial + current.amount;
  }, 0);

  let bumpClass = `${classes.button} ${btnIsHighlighted ? classes.bump : ""}`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setbtnHighlighted(true);

    const timer = setTimeout(() => {
      setbtnHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={bumpClass} onClick={props.onOpenCart}>
      <span className={classes.icon}>
        <IconCart />
      </span>
      <span className={classes.yourCart}>Your Cart</span>
      <span className={classes.badge}>{+numberCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
