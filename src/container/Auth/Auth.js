import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/spinner';
import './error.css';

class Auth extends Component {
    state = {
        controls: {
            email : {
                elementType:'input', 
                elementConfig: {
                    type:'email',
                    placeholder:'Email'
                },
                value: '', 
                validation: {
                     required: true,
                     isEmail: true
                },
                valid: false,
                touched: false
             },  
             password : {
                elementType:'input', 
                elementConfig: {
                    type:'password',
                    placeholder:'Password'
                },
                value: '', 
                validation: {
                     required: true,
                     minLength: 6
                },
                valid: false,
                touched: false
             },
        },
        isSignUp: true
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

    inputChangeHandler = (e,controlName) => {
        const updateControles = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: e.target.value,
                valid: this.checkValidation(e.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updateControles});
    }

    submitHandler = (event) =>{
        event.preventDefault(); //!NOTE to prevent the reloading of the page
        const email = this.state.controls.email.value;
        const password = this.state.controls.password.value;
        const isSIGNUP = this.state.isSignUp;
        this.props.onAuth(email , password, isSIGNUP);
    }

    switchAuthModeHandler = () => {
        this.setState((prevState) =>{
            return{isSignUp: !prevState.isSignUp }
        } )
    }

    render() {
        const formEl = [];
        for (let key in this.state.controls) {
            formEl.push({
                id:key,
                config:this.state.controls[key]
            });
        }

        let form = formEl.map(formEl =>(
            <Input
                key={formEl.id}
                elementType={formEl.config.elementType}  
                elementConfig={formEl.config.elementConfig} 
                value={formEl.config.value}
                changed={(event) => this.inputChangeHandler(event,formEl.id)}
                invalid={!formEl.config.valid}
                shouldValidate={formEl.config.validation}
                touched={formEl.config.touched}
            />
        ))
        if (this.props.loading){
            form = <Spinner/>
        }

        let errorMessage = null;

        if (this.props.error){
            errorMessage = (
                <section className='test'>
                    <p className='error'>{this.props.error.message}</p>
                </section>
            )
        }
        
        return (
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={this.submitHandler} >
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button 
                clicked={this.switchAuthModeHandler}
                btnType="Danger">SWITH TO {this.state.isSignUp ? "SIGN-IN" : "SIGN-UP"}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email,password, isSignUp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);