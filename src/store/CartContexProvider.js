import CartContex from "./cart-contex";
import { useReducer } from "react";

const defaultCartObject = { items: [], totalAmount: 0 };
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const findExistingCart = state.items.findIndex((item) => {
      return item.id === action.value.id;
    });
    let updatedItem;
    let updatedItems;
    if (findExistingCart !== -1) {
      const existingCart = state.items[findExistingCart];
      updatedItem = {
        ...existingCart,
        amount: existingCart.amount + action.value.amount,
      };
      updatedItems = [...state.items];
      updatedItems[findExistingCart] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.value);
    }
    const updatedAmount =
      state.totalAmount + action.value.price * action.value.amount;

    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }
  if (action.type === "REMOVE") {
    const findRemoveCartIndex = state.items.findIndex((item) => {
      return item.id === action.value;
    });
    let removeCartItem = state.items[findRemoveCartIndex];
    let updatedTotalAmount = state.totalAmount - removeCartItem.price;
    let updatedItems;
    if (removeCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.value);
    } else {
      const updatedItem = {
        ...removeCartItem,
        amount: removeCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[findRemoveCartIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if(action.type==="CLEAR"){
    return defaultCartObject;
  }
  return defaultCartObject;
};
const CartContexProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    defaultCartObject
  );
  const addItemHandler = (item) => {
    dispatchCartState({ type: "ADD", value: item });
  };
  const removeItemHandler = (idx) => {
    dispatchCartState({ type: "REMOVE", value: idx });
  };
  const onClearHandler = () => {
    dispatchCartState({type:"CLEAR"});
  } 
  const cartContex = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    onClear: onClearHandler
  };
  return (
    <CartContex.Provider value={cartContex}>
      {props.children}
    </CartContex.Provider>
  );
};

export default CartContexProvider;
