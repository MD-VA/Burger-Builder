import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios';
import Spinner from '../../../components/UI/Spinner/spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../components/withErrorHandler/wihtErrorHandler';
import * as actions from '../../../store/actions/index';


class ContactData extends Component {
    state ={
        orderForm: {
            name : {
               elementType:'input', 
               elementConfig: {
                   type:'text',
                   placeholder:'your name'
               },
               value: '', 
               validation: {
                    required: true
               },
               valid: false,
               touched: false
            },
            street: {
                elementType:'input', 
                elementConfig: {
                    type:'text',
                    placeholder:'street'
                },
                value: '',
                validation: {
                    required: true
               },
                valid: false,
                touched: false
             },                
            zipCode: {
                elementType:'input', 
                elementConfig: {
                    type:'text',
                    placeholder:'zip Code',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
               },
                valid: false,
                touched: false
             },
            country: {
                elementType:'input', 
                elementConfig: {
                    type:'text',
                    placeholder:'Country'
                },
                value: '',
                validation: {
                    required: true
               },
                valid: false,
                touched: false
             },
            email: {
                elementType:'input', 
                elementConfig: {
                    type:'email',
                    placeholder:'your email'
                },
                value: '',
                validation: {
                    required: true
               },
                valid: false,
                touched: false
             },
            deliveryMethod: {
                elementType:'select', 
                elementConfig: {
                    options: [
                        {value: 'express',displayValue:'Express'},
                        {value: 'normal', displayValue: 'Normal'}
                    ]
                },
                value: 'express',
                valid:true
             },
        },
        formIsValid: null,
       
    }

    checkValidation = (value,rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }
         if (rules.required){
             isValid = value.trim() !== '' && isValid ;//!trim is to remove any white spaces
         }
         if (rules.minLength){//!if the the object exit we verify the lenght of the zip code that should be as a standard 6
             isValid = value.length >= rules.minLength && isValid;
         } 
         if (rules.maxLength){
             isValid = value.length <= rules.maxLength && isValid;
         }
         return isValid;
    }

    contactChange = (event,InputName) => {
        const changes = {...this.state.orderForm};
        const updatedChanges = {...changes[InputName]};

        updatedChanges.value = event.target.value; 
        let formIsValid = true;
        if (InputName !== 'deliveryMethod') {
            updatedChanges.valid = this.checkValidation(updatedChanges.value,updatedChanges.validation); 
            updatedChanges.touched = true;
        }
        for (let i in changes){
            formIsValid = changes[i].valid && formIsValid;
        }
        console.log(formIsValid);
        
        changes[InputName] = updatedChanges;
        // console.log(changes);
        // console.log(updatedChanges);

        this.setState({orderForm: changes, formIsValid: formIsValid})
    }
    orderHandler = (event) =>{
        event.preventDefault();
        //  this.setState({
        //         loading: true
        //     })
            // alert(`This burger is served to you by the sexy fucking strip dance club lady's!`)

            const formData = {};
            for (let formElement in this.state.orderForm){
                formData[formElement] = this.state.orderForm[formElement].value;
            }
            const order = {
                ingredients : this.props.ing,
                price : this.props.price,//! the price should be recalculated in the server 
                orderForm: formData,
                userId : this.props.userId
            }
            this.props.onOrderBurger(order, this.props.token)

    }
    render() {
        const formEl = [];
        for (let key in this.state.orderForm) {
            formEl.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }
        const formOut = formEl.map(el => {
            return(
                    <Input key={el.id} 
                     elementType={el.config.elementType}  
                     elementConfig={el.config.elementConfig} 
                     value={el.config.value}
                     changed={(event) => this.contactChange(event,el.id)}
                     invalid={!el.config.valid}
                     shouldValidate={el.config.validation}
                     touched={el.config.touched}
                     />
            )
        })
        let form = (
                <form onSubmit={this.orderHandler} >
                    {formOut}
                    {/* <Input inputtype='input' onChange={(event) => this.contactChange(event)} type='text' name='postalCode' placeholder='Postal code'/> NOTE the input that i coded with the change fucntion*/}
                    <Button 
                    btnType='Success'
                    disabled={!this.state.formIsValid} 
                    >Order</Button>
                </form>
        );
        if(this.props.loading){
            form = <Spinner/>
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        ing: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
 const mapDispatchToProps = dispatch => {
     return{
        onOrderBurger: (orders, token) => dispatch( actions.purshaseBurger(orders, token))
     };
 }
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios) );