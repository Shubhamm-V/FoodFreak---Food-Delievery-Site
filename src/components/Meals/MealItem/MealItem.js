import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useContext } from "react";
import CartContex from "../../../store/cart-contex";
const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const cartCtx = useContext(CartContex);
  const addTOCartHandler = amt =>{
      cartCtx.addItem({
        id: props.id,
        name: props.mealName,
        price: props.price,
        amount: amt
      })
  }
  return (
    <li className={classes.meal}>
      <img src = {`images/food${props.foodID}.jpg`}alt = {props.mealName}/>
      <div className={classes.info}>
        <h3>{props.mealName}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div className={classes.info}>
        <MealItemForm onAddToCart={addTOCartHandler}/>
      </div>
    </li>
  );
};
export default MealItem;
