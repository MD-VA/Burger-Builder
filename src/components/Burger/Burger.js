import React from 'react';
import classes from './Burger.module.css';
import BurgerIngerdiant from './BurgerIngrediant/BurgerIngrediant';

const Burger = (props) => {


    let transformedIngediant = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_,i) => {
            return <BurgerIngerdiant key={igKey + i} type={igKey}/>
        }); //[,] Array(the number of element  = 2 or 3 or what ever you give it)
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []) ;
    console.log(transformedIngediant);
    if (transformedIngediant.length === 0) {
        transformedIngediant = <p>start creating your SUPER BURGER</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngerdiant type="bread-top"/>
            {transformedIngediant}
            <BurgerIngerdiant type="bread-bottom"/>
        </div>
    )
}

export default Burger;
