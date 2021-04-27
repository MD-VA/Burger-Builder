import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios';
import withErrorHandler from '../../components/withErrorHandler/wihtErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/spinner';

class Orders extends Component {
    
    componentDidMount() {
       this.props.onFetchOrders();
    }

  

    render() {

        const deleteOrders = (id) => {
            axios.delete(`/orders/${id}.json`)
            .then(res => {
                console.log(res,'was deleted')
                this.props.onFetchOrders();
            })
            .catch(err => {
                console.error(err);
                // alert('there has been an error');
            })
        }

        let orders = <Spinner/>
        if (!this.props.loading){
            orders = (
            <div>
                {this.props.orders.map(order => (
                    <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price}
                    delete={() => deleteOrders(order.id)}
                    />
                ))}
            </div>
            )
        }
        return orders
    }
}

const mapStateToProps = state => {
    return{
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onFetchOrders:() => dispatch(actions.fetchOrders())
    };
}

export default connect(mapStateToProps ,mapDispatchToProps)(withErrorHandler(Orders, axios)) ;