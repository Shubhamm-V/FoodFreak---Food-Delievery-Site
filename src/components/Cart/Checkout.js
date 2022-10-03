import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();
  const [formValid, setFormValid] = useState({
    name: true, 
    street: true,
    postalCode: true,
    city: true,
  });
  const isEmpty = (value) => value.trim() === "";
  const isSixChars = (value) => value.trim().length === 6;
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const isEnteredNameValid = !isEmpty(enteredName);
    const isEnteredStreetValid = !isEmpty(enteredStreet);
    const isEnteredCityValid = !isEmpty(enteredCity);
    const isEnteredPostalCodeValid = isSixChars(enteredPostalCode);

    setFormValid({
      name: isEnteredNameValid,
      street: isEnteredStreetValid,
      postalCode: isEnteredPostalCodeValid,
      city: isEnteredCityValid,
    });

    const isFormValid =
      isEnteredNameValid &&
      isEnteredStreetValid &&
      isEnteredCityValid &&
      isEnteredPostalCodeValid;
    if (!isFormValid) {
      return;
    }

    props.onOrder({
        name: enteredName,
        street: enteredStreet,
        postalCode: enteredPostalCode,
        city: enteredCity
    })

  };
  console.log(formValid.name);
  const nameClass = `${classes.control} ${
    formValid.name ? "" : classes.invalid
  }`;
  const streetClass = `${classes.control} ${
    formValid.street ? "" : classes.invalid
  }`;
  const postalClass = `${classes.control} ${
    formValid.postalCode ? "" : classes.invalid
  }`;
  const cityClass = `${classes.control} ${
    formValid.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClass}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formValid.name && <p className={classes['invalid-message']}>Enter Valid Name </p>}
      </div>
      <div className={streetClass}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formValid.street && <p className={classes['invalid-message']}>Enter Valid street </p>}

      </div>
      <div className={postalClass}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formValid.postalCode && <p className={classes['invalid-message']}>Enter Postal Code of 6 Digits</p>}

      </div>
      <div className={cityClass}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formValid.city && <p className={classes['invalid-message']}>Enter Valid City </p>}

      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
