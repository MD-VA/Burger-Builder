import React from 'react';
import BuilControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls =[
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => (
                <BuilControl  
                key={ctrl.label} 
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabeld[ctrl.type]}
                added={() => props.ingredientAdded(ctrl.type)} 
                label={ctrl.label}/>
            )) }
        <button 
        onClick={props.ordered} 
        disabled={!props.purchasable} 
        className={classes.OrderButton}>ORDER NOW</button>
        </div>
    )
}
export default BuildControls;
