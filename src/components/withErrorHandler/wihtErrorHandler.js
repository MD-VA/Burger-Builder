import React , {Fragment}from 'react';
import { Component } from 'react';
import Modal from '../../components//UI/Modal/Modal';

const wihtErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        
        state = {
            error : null
        }

        componentWillMount(){
            axios.interceptors.request.use(config => {
            // Do something before request is sent
            this.setState({error: null});
            return config;
            });

            axios.interceptors.response.use(res => res,error => {
            // Do something with response error
            this.setState({error : error})
            return Promise.reject(error);
            });
        }
        errorConfirmed = () => {
            this.setState({error: null})
        }
        render () {
            return(
                <Fragment>
                    <Modal 
                    show={this.state.error} 
                    modalClosed={this.errorConfirmed}>
                        <h2 style={{color:'red'}}>{this.state.error ? this.state.error.message : null}</h2>
                    </Modal>
                    <WrappedComponent {...this.props}/>
    
                </Fragment>
            )
        }
        
    }      
        
}

export default wihtErrorHandler;