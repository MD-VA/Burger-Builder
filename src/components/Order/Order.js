import React from 'react';
import classes from './Order.module.css';

const Order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients){
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        )
    }

    const ingredientsOutput = ingredients.map(ing => {
        return(
            <span
            style={{
                textTransform:'capitalize',
                display:'inline-block',
                margin :'0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }} 
            key={ing.Name}>
                {ing.name}: {ing.amount}
            </span>
        )
    })
    // const ingredients = Object.keys(props.ingredients).map(ing => {
    //     return (
    //         <p>{ing} = {props.ingredients[ing]}</p>
    //     )
    // })


  
    return (
        <div className={classes.Order}>
            <p>Ingredients {ingredientsOutput}</p>
            <p>Price: <strong>{props.price.toFixed(2)}$</strong></p>
            <button onClick={props.delete} style={{backgroundColor:'red',color:'white'}}>delete</button>
        </div> 
    )
}
export default Order;