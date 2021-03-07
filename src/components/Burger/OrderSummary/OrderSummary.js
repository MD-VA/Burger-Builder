import React, {Fragment, Component} from 'react';
import Button from '../../UI/Button/Button';



class OrderSummary extends Component {
   //NOTE this could be functionnal component doesn't have to be a class
    componentDidUpdate(){
        console.log(`[OrderSummery] will update`)
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map((igKey,i) => {
            return (
                <li key={igKey}>
                    <span  style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
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
            <p><strong>Total price: {this.props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={this.props.cancel}>Cancel</Button>
            <Button btnType="Success" clicked={this.props.continue}>Continue</Button>
        </Fragment> 
        )
    }
}



export default OrderSummary;