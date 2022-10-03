import React, { Fragment, useState } from "react";
import "./App.css";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartContexProvider from "./store/CartContexProvider";

const App = () => {
  const [cartShownState, setCartShownState] = useState(false);
  const showCardHandler = () => {
    setCartShownState(true);
  };

  const hideCardHandler = () => {
    setCartShownState(false);
  };
  return (
    <CartContexProvider>
      {cartShownState && (
        <Cart onCloseCart={hideCardHandler} />
      )}
      <Header onOpenCart={showCardHandler} />
      <main>
        <Meals />
      </main>
    </CartContexProvider>
  );
};

export default App;
