import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import classes from "./CheckoutSummery.module.css";
const CheckoutSummery = (props) => {
    // console.log(props.ingredients);
    return (
        <div className={classes.checkoutSummery}>
            <h1>We wish you a good meal!!</h1>
            <div style={{width: '100%',margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType='Danger' clicked={props.checkoutCancelled}>Cancel</Button>
            <Button btnType='Success' clicked={props.checkoutContinued}>Continue</Button>
        </div>
    )
}

export default CheckoutSummery;