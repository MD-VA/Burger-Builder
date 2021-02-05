import React, {Fragment} from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map((igKey,i) => {
        return (
            <li key={igKey}>
                <span  style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
            </li>
        )
    });
    return (
        <Fragment>
            <h3>Your order</h3>
            <p>A delecious Burger with the folowinng ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.cancel}>Cancel</Button>
            <Button btnType="Success" clicked={props.continue}>Continue</Button>
        </Fragment>
    )
}

export default OrderSummary;