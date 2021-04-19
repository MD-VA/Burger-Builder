import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuilControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/spinner';
import wihtErrorHandler from '../../components/withErrorHandler/wihtErrorHandler';
// import { Router } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/action';


class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         .....
    //     }
    // }
    state = {
        //?manage with redux
        // ingredients: null,
        // totalPrice : 4,
        //?local UI state
        purchasable: false,
        purchasing: false,
        loading: false
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }
    purchaseCancelHandler = () => {
            this.setState({purchasing: false})
    }  
    purchaseContinueHandler = () => {
            this.props.history.push({
                pathname: '/checkout',
            })
    }

    updatePuschaseState = (ingredients) => {
   
        //!NOTE Object.keys(ingredients) create an array [salad, bacon, cheese, meat]
        const sum = Object.keys(ingredients).map(igKey =>{
            return ingredients[igKey];
        }).reduce((sum, el)=>{
            return sum + el
        },0); 
        
        return sum > 0
        
    }   


    // addIngrediantHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updateCounte = oldCount + 1;
    //     const updatedIngrediant = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngrediant[type] = updateCounte;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;

    //     this.setState({
    //         ingredients: updatedIngrediant,
    //         totalPrice: newPrice
    //     })
    //     this.updatePuschaseState(updatedIngrediant);

    // }

    // removeIngrediantHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <= 0){
    //         return;
    //     }
    //     const updateCounte = oldCount <= 0 ? oldCount : oldCount - 1;
    //     const updatedIngrediant = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngrediant[type] = updateCounte;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldCount <= 0 ? oldPrice : oldPrice - priceAddition;
    //     console.log(newPrice);
    //     this.setState({
    //         ingredients: updatedIngrediant,
    //         totalPrice: newPrice
    //     })
    //     this.updatePuschaseState(updatedIngrediant);

    // }

    componentDidMount() {
        // console.log(this.props);
        // axios.get('https://burger-builder-react-fb3ca-default-rtdb.firebaseio.com/ingredients.json')
        // .then(res => {
        //     this.setState({
        //         ingredients: res.data
        //     });
        //     console.log(res);
        // })
        // .catch(err => {
        //     console.error(err); 
        // })
    }

    render() {
        const disableInfo = {
            ...this.props.ing
        };
        for (const key in disableInfo) {
            disableInfo[key] = disableInfo[key] <=0;     
        };
        let orderSummary = null;

        let burger = this.state.error ? <p>ingredients can't be loaded</p> : <Spinner/>; 

        if (this.props.ing) {
            burger = (
                <Fragment>
                     <Burger ingredients = {this.props.ing}/>
                    <BuilControls 
                    ingredientRemoved={this.props.OnIngredientRemoved} 
                    ingredientAdded = {this.props.OnIngredientAdded} 
                    disabeld={disableInfo}
                    price={this.props.price}
                    purchasable={this.updatePuschaseState(this.props.ing)}
                    ordered= {this.purchaseHandler}
                    />
                </Fragment>
            );
            orderSummary =  <OrderSummary 
            totalPrice={this.props.price}
            continue={this.purchaseContinueHandler} 
            cancel={this.purchaseCancelHandler} 
            ingredients={this.props.ing}/>;
        }
        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }
 

        return (
            <Fragment>
                <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
                   {orderSummary}
                </Modal>
                {burger}
                
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        ing: state.ingredients,
        price:state.totalPrice
    }
}
const mapDispatchToProps = dispatch => {
    return{
        OnIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENTS,ingredientName: ingName}),
        OnIngredientRemoved:(ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENTS,ingredientName: ingName})
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(wihtErrorHandler(BurgerBuilder, axios));
