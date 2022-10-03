import { Fragment } from "react";
import classes from './Header.module.css';
import mealsImg from '../../assets/meals.jpg';
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) =>{
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>FoodFreak</h1>
                <HeaderCartButton onOpenCart = {props.onOpenCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src = {mealsImg} alt="Very delicious food"/>
            </div>
        </Fragment>
    )
}

export default Header;