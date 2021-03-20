import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuilControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/spinner';
import wihtErrorHandler from '../../components/withErrorHandler/wihtErrorHandler';


const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese: 0.4,
    meat : 1.3,
    bacon : 0.7
}

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         .....
    //     }
    // }
    state = {
        ingredients: null,
        totalPrice : 4,
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
            this.setState({
                loading: true
            })
            // alert(`This burger is served to you by the sexy fucking strip dance club lady's!`)
            const order = {
                ingrediants : this.state.ingredients,
                price : this.state.totalPrice,//! the price should be recalculated in the server 
                customer: {
                    name : 'Batman',
                    adresse :{
                        street: 'Arkham city',
                        zipCode: '065456',
                        country: 'No mans land'
                    },
                    email: 'batman@gmail.com'
                }
            }
            axios.post('/orders.json',order)
            .then(res => {
                console.log(res);
                this.setState({ loading: false, purchasing: false })
            })
            .catch(err => {
                console.error(err); 
                this.setState({ loading: false, purchasing: false })
            })
    }

    updatePuschaseState = (ingredients) => {
   
        //!NOTE Object.keys(ingredients) create an array [salad, bacon, cheese, meat]
        const sum = Object.keys(ingredients).map(igKey =>{
            return ingredients[igKey];
        }).reduce((sum, el)=>{
            return sum + el
        },0); 
        this.setState({
            purchasable: sum > 0
        })
    }   


    addIngrediantHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCounte = oldCount + 1;
        const updatedIngrediant = {
            ...this.state.ingredients
        }
        updatedIngrediant[type] = updateCounte;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            ingredients: updatedIngrediant,
            totalPrice: newPrice
        })
        this.updatePuschaseState(updatedIngrediant);

    }

    removeIngrediantHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updateCounte = oldCount <= 0 ? oldCount : oldCount - 1;
        const updatedIngrediant = {
            ...this.state.ingredients
        }
        updatedIngrediant[type] = updateCounte;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldCount <= 0 ? oldPrice : oldPrice - priceAddition;
        console.log(newPrice);
        this.setState({
            ingredients: updatedIngrediant,
            totalPrice: newPrice
        })
        this.updatePuschaseState(updatedIngrediant);

    }

    componentDidMount() {
        axios.get('https://burger-builder-react-fb3ca-default-rtdb.firebaseio.com/ingredients.json')
        .then(res => {
            this.setState({
                ingredients: res.data
            });
            console.log(res);
        })
        .catch(err => {
            console.error(err); 
        })
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (const key in disableInfo) {
            disableInfo[key] = disableInfo[key] <=0;     
        };
        let orderSummary = null;

        let burger = this.state.error ? <p>ingredients can't be loaded</p> : <Spinner/>; 

        if (this.state.ingredients) {
            burger = (
                <Fragment>
                     <Burger ingredients = {this.state.ingredients}/>
                    <BuilControls 
                    ingredientRemoved={this.removeIngrediantHandler} 
                    ingredientAdded = {this.addIngrediantHandler} 
                    disabeld={disableInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered= {this.purchaseHandler}
                    />
                </Fragment>
            );
            orderSummary =  <OrderSummary 
            totalPrice={this.state.totalPrice}
            continue={this.purchaseContinueHandler} 
            cancel={this.purchaseCancelHandler} 
            ingredients={this.state.ingredients}/>;
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


export default wihtErrorHandler(BurgerBuilder, axios);
